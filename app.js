"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = appTraits(people);
         
      break;
    default:
      app(people); // restart app
      break;
  }
  console.log(searchResults);  
  return searchResults; 
  appTraits(searchResults);
}


function appTraits(people){
  let searchTypeTraits = prompt("Which trait(s) of the person would you like to search for? Enter 'gender', 'date of birth', 'height', 'weight', 'eye color', or 'occupation'").toLowerCase();
  let searchResultTraits;

  switch(searchTypeTraits) {
    case 'gender':
      searchResultTraits = searchByGender(people);
      break;
    case 'date of birth':
      searchResultTraits = searchByDob(people);
      break;
    case 'height':
      searchResultTraits = searchByHeight(people);
      break;
    case 'weight':
      searchResultTraits = searchByWeight(people);
      break;
    case 'eye color':
      searchResultTraits = searchByEyeColor(people);
      break;
    case 'occupation':
      searchResultTraits = searchByOccupation(people);
      break;
    default:
      appTraits(people);
  }
  return searchResultTraits;

}
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
mainMenu(people);


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid).toLowerCase();
  let eyeColorArray = [];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.eyeColor === eyeColor){
         
      return true;
      }
    else{
      return false;
      }
  })
  eyeColorArray.push(foundPerson);
return eyeColorArray;
}


function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid).toLowerCase();
let genderArray = [];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.gender === gender){
      return true;
      }
    else{
      return false;
      }
  })
  genderArray.push(foundPerson);
return genderArray;
}

function searchByDob(people){
  let dob = promptFor("What is the person's D.O.B.?", autoValid).toLowerCase();
  let dobArray = [];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.dob === dob){
      return true;
      }
    else{
      return false;
      }
  })
  dobArray.push(foundPerson);
return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's height in inches?", autoValid).toLowerCase();
  let heightArray=[];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.height === height){
      return true;
      }
    else{
      return false;
      }
  })
  heightArray.push(foundPerson)
return heightArray;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight in lbs?", autoValid).toLowerCase();
  let weightArray = [];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.weight === weight){
      return true;
      }
    else{
      return false;
      }
  })
  weightArray.push(foundPerson)
return weightArray;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid).toLowerCase();
let occupationArray = [];
  let foundPerson = people.filter(function(potentialMatch){
    if ( potentialMatch.occupation === occupation){
      return true;
      }
    else{
      return false;
      }
  })
  occupationArray.push(foundPerson);
return occupationArray;
}

//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// function traits(input){
//   if (input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eye color" || input.toLowerCase() == "occupation")
// }

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion