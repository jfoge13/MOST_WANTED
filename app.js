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
  mainMenu(searchResults, people);
}


function appTraits(people){
  let searchTypeTraits = promptFor("Which trait(s) of the person would you like to search for? Please enter 'gender', 'date of birth', 'height', 'weight', 'eye color', and/or 'occupation' with spaces in between trait options. Thank you!", traitsType).toLowerCase();
  let newArray = people;
  if (searchTypeTraits.includes("gender")){
    newArray = searchByGender(newArray);
  }
  if(searchTypeTraits.includes("date of birth")){
    newArray = searchByDob(newArray);
  }
  if(searchTypeTraits.includes("height")){
     newArray = searchByHeight(newArray);
  }
  if(searchTypeTraits.includes("weight")){
     newArray = searchByWeight(newArray);
  }
  if(searchTypeTraits.includes("eye color")){
     newArray = searchByEyeColor(newArray);
  }
  if(searchTypeTraits.includes("occupation")){
     newArray = searchByOccupation(newArray);
  }  

  if (newArray.length > 1) {
        let chooseName = prompt("Here are the people we found: " + nameDisplay(newArray) + "are one of these people the one you're lookling for? (yes or no)", yesNo);
        if (chooseName === true);
        searchByName(people);
      
  }
newArray.sort();
console.log(newArray);
return newArray;
}

//   switch(searchTypeTraits) {
//     case 'gender':
//       searchResultTraits = searchByGender(people);
//       break;
//     case 'date of birth':
//       searchResultTraits = searchByDob(people);
//       break;
//     case 'height':
//       searchResultTraits = searchByHeight(people);
//       break;
//     case 'weight':
//       searchResultTraits = searchByWeight(people);
//       break;
//     case 'eye color':
//       searchResultTraits = searchByEyeColor(people);
//       break;
//     case 'occupation':
//       searchResultTraits = searchByOccupation(people);
//       break;
//   }
//   return searchResultTraits;
// }
  
// Call the mainMenu function ONLY after you find the SINGLE person you are looking for
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

//* Here we pass in the entire person object that we found in our search, 
//as well as the entire original dataset of people. 
//We need people in order to find descendants and other information that the user may want.

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      alert ("Gender: " + person[0].gender  + " \n" + "Date of birth: " + person[0].dob + "\n" + "Height (inches): " + person[0].height + "\n" + "Weight(lbs): "+ person[0].weight + "\n" + "Eye Color: "+ person[0].eyeColor + "\n" + "Occupation: "+ person[0].occupation);
    break;
    case "family":
    //   let spouse = spouseFinder(person, people)
    //   alert(spouse.firstName + " " +spouse.lastName)
    // alert(spouseFinder(person, people));
    let parents = parentsFinder(person, people)
    alert(parents[0].firstName + " " + parents[0].lastName + "\n" + parents[1].firstName + " " + parents[1].lastName);
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

// function to compare objects in arrays to find spouse
function spouseFinder(someArray, people){
  let personsSpouse =[];
  for(let i = 0; i < people.length; i++ ){
    
    if (someArray[0].currentSpouse === people[i].id){
      personsSpouse = people[i];
    
    }
    
  } return personsSpouse;
}



// Parents finder


function parentsFinder(someArray, people){
  let personsParents =[];
  let parentIDArray = someArray[0].parents;
  
  for(let i = 0; i < people.length; i++ ){
      if ( parentIDArray[0] === people[i].id){               
      personsParents.push(people[i]);
    } if
      (parentIDArray[1]===people[i].id){

      personsParents.push(people[i])

    }
    
    
    }
    return personsParents;
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
  let eyeColor = promptFor("What is the person's eye color? (blue, brown, hazel, green, black)", autoValid).toLowerCase();
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.eyeColor === eyeColor){
        return true;
      }
      else{
        return false;
      }
  })
  
return foundPerson  ;
}


function searchByGender(people){
  let gender = promptFor("What is the person's gender? (male, female)", autoValid).toLowerCase();
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.gender === gender){
        return true;
      }
      else{
        return false;
      }
  })
  
return foundPerson;
}

function searchByDob(people){
  let dob = promptFor("What is the person's D.O.B.? (dd/mm/yy)", autoValid).toLowerCase();
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.dob === dob){
        return true;
      }
      else{
        return false;
      }
  })
  
return foundPerson;
}

function searchByHeight(people){
  let height = Number(promptFor("What is the person's height in inches? (number)", autoValid));
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.height === height){
        return true;
      }
      else{
        return false;
      }
  })
  
return foundPerson;
}

function searchByWeight(people){
  let weight = Number(promptFor("What is the person's weight in lbs? (number)", autoValid));
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.weight === weight){
        return true;
      }
      else{
        return false;
      }
  })
 
return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid).toLowerCase();
  let foundPerson = people.filter(function(potentialMatch){
      if ( potentialMatch.occupation === occupation){
        return true;
      }
      else{
        return false;
      }
  })
 
return foundPerson;
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

//This function validates user input for initialization of trait search function

function traitsType(input){
  if(input.includes("gender")){
    return true;
  } else if(input.includes("date of birth")){
    return true;
  } else if(input.includes("height")){
    return true;
  } else if(input.includes("weight")){
    return true;
  } else if(input.includes("eye color")){
    return true;
  } else if(input.includes("occupation")){
    return true;
  } else{
    return false;
  }
}

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



function nameDisplay(listofpeople){
 let fullName = "";
  for (let i=0; i < listofpeople.length; i++){
    fullName += listofpeople[i].firstName + " " + listofpeople[i].lastName + ", "

    
  }
  return fullName;
}