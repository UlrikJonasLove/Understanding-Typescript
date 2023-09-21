function sendAnalytics(data: any) { // if no any, will cause an error for implicit any( noImplicitAny: true )
  console.log(data);
}

sendAnalytics("the data")