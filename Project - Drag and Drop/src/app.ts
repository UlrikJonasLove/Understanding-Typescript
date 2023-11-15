 // drag and drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
 
 // Project type
 enum ProjectStatus { Active, Finished }
 class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
 }
 
 // Project state management
 type Listener<T> = (items: T[]) => void;

 class State<T> {
  protected listeners:Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
 }

 class ProjectState extends State<Project>{
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance() {
    if(this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
      );
    this.projects.push(newProject);
    this.updateListeners();
  };

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if(project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
    
  }

  private updateListeners() {
    for(const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  
  }
 }

 const projectState = ProjectState.getInstance();

// validation
interface Validatable {
   value: string | number;
   required?: boolean;
   minLength?: number;
   maxLength?: number;
   min?: number;
   max?: number;
}

function validate(Validatable: Validatable) {
    let isValid = true;
    if(Validatable.required) {
        isValid = isValid && Validatable.value.toString().trim().length !== 0;
    } // with one = it includes null and undefined, with two == it doesn't
    if(Validatable.minLength != null && typeof Validatable.value === "string") {
        isValid = isValid && Validatable.value.length >= Validatable.minLength;
    }
    if(Validatable.maxLength != null && typeof Validatable.value === "string") {
        isValid = isValid && Validatable.value.length <= Validatable.maxLength;
    }
    if(Validatable.min != null && typeof Validatable.value === "number") {
        isValid = isValid && Validatable.value >= Validatable.min;
    }
    if(Validatable.max != null && typeof Validatable.value === "number") {
        isValid = isValid && Validatable.value <= Validatable.max;
    }
    return isValid;
}

// autobind decorator for the submitHandler
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) { // _ tells typescript that we don't care about the first and second argument
   const originalMethod = descriptor.value;
   const adjDescriptor: PropertyDescriptor = {
         configurable: true,
         get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
         }
      };
      return adjDescriptor;
   }  
   
// component generic base class 
// this can only be inherited from, not instantiated
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
  
    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
  
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
          this.element.id = newElementId;
        }
  
        this.attach(insertAtStart);
    }
  
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// project item class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    return this.project.people === 1 ? "1 person" : `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent): void {
    
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned"
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// project list class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if(event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); // default is to not allow dropping, so need to prevent the default
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

    configure(): void {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if(this.type === "active") {
          return prj.status === ProjectStatus.Active
        }
        
        return prj.status === ProjectStatus.Finished
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = ""; // re-renders the list to prevent duplicates
    for(const prjItems of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItems);
    }
  }
}

// project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input")
    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
    this.configure();
  }
  
  configure() {
   this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void { // tuple or void, tuple is just an array
   const enteredTitle = this.titleInputElement.value;
   const enteredDescription = this.descriptionInputElement.value;
   const enteredPeople = this.peopleInputElement.value;

   const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
   };
    const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
    };
  const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
  };
   if(!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("invalid input, please try again")
      return;
  } else {
   return [enteredTitle, enteredDescription, +enteredPeople]; // + converts string to number
  }
}

private clearInputs() { 
   this.titleInputElement.value = "";
   this.descriptionInputElement.value = "";
   this.peopleInputElement.value = "";
}

  @autobind
  private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if(Array.isArray(userInput)) {
         const [title, desc, people] = userInput;
         projectState.addProject(title, desc, people);
         this.clearInputs();
      }
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");