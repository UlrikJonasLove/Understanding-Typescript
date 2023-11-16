// validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(Validatable: Validatable) {
  let isValid = true;
  if (Validatable.required) {
    isValid = isValid && Validatable.value.toString().trim().length !== 0;
  } // with one = it includes null and undefined, with two == it doesn't
  if (Validatable.minLength != null && typeof Validatable.value === "string") {
    isValid = isValid && Validatable.value.length >= Validatable.minLength;
  }
  if (Validatable.maxLength != null && typeof Validatable.value === "string") {
    isValid = isValid && Validatable.value.length <= Validatable.maxLength;
  }
  if (Validatable.min != null && typeof Validatable.value === "number") {
    isValid = isValid && Validatable.value >= Validatable.min;
  }
  if (Validatable.max != null && typeof Validatable.value === "number") {
    isValid = isValid && Validatable.value <= Validatable.max;
  }
  return isValid;
}
