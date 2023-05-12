// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  if(!localStorage.getItem("recipes")){
    return [];
  }
  return recipes;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let main = document.getElementsByTagName("main")[0];
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for(let i = 0; i < recipes.length; i++){
    let recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipes[i];
    main.appendChild(recipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {


  // B2. Get a reference to the <form> element
  const recipeForm = document.querySelector("form");

  // B3. Add an event listener for the 'submit' event, which fires when the
  //     submit button is clicked
  recipeForm.addEventListener("submit", function(Event) {

    // B4. Create a new FormData object from the <form> element reference above
    const formData = new FormData(recipeForm);

    // B5. Create an empty object and then extract the keys and corresponding
    //     values from the FormData object and insert them into recipeObject
    const recipeObject = {};
    for (const [key, value] of formData.entries()) {
      recipeObject[key] = value;
    }

    // B6. Create a new <recipe-card> element
    const newRecipe = document.createElement("recipe-card");

    // B7. Add the recipeObject data to <recipe-card> using element.data
    newRecipe.data = recipeObject;

    // B8. Append this new <recipe-card> to <main>
    const main = document.querySelector("main");
    main.appendChild(newRecipe);

    // B9. Get the recipes array from localStorage, add this new recipe to it, and
    //     then save the recipes array back to localStorage
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    recipes.push(recipeObject);
    localStorage.setItem("recipes", JSON.stringify(recipes));


  });


  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clearButton = document.querySelector("button[class = 'danger']");
  // B11. TODO - Add a click event listener to clear local storage button
  clearButton.addEventListener("click", function(Event) {
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
  localStorage.clear();
  // B13. TODO - Delete the contents of <main>
  const main = document.querySelector("main");
  main.innerHTML = "";
  });


}
