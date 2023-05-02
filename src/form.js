// import Jar from './Jar.js';
const formId = "BudgetForm"; // form id
const calcButton = document.querySelector("#calc");
let form = document.querySelector(`#${formId}`); // select the form
let formElements = form.elements;


/** 
 * this function gets the values in the form 
 * and returns them as an object
 * It loops through all the elements of the form
 * and saves their names and values as key:value pairs
 * When the user clicks the calculate button, 
 * the data is saved as JSON to localStorage
 * (help from https://www.telerik.com/blogs/save-for-later-feature-in-forms-using-localstorage)
*/
const getBudgetData = () => {
  let data = { [formId]: {} }; 
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formId][element.name] = element.value;
    }
  }
  return data;
};
// store the form in localStorage
calcButton.onclick = (e) => {
  e.preventDefault()
  data = getBudgetData()
  localStorage.setItem(formId, JSON.stringify(data[formId]))
  // updateJars()
  const confirmMessage = "Form was saved."
  console.log(confirmMessage)
}

/**
 * A function to retrieve the form data and put it in the form
 */
const fillFormWithSavedData = () => {
  if (localStorage.key(formId)) {
    const savedData = JSON.parse(localStorage.getItem(formId))
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name]
      }
    }
    const confirmMessage = "Form was filled."
    console.log(confirmMessage)
  }
}
fillFormWithSavedData() // repopulate the form data
