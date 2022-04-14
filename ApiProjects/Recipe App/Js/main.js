import { clearSearchTerms, cleanText, clearList, setSearchFocus, likeMeal, clearContent } from "./domFunctions.js";
import { loadCategories, loadAreaCategories, loadRandomRecipes, loadRecipesByFirstLetter, loadRecipesByName, loadCategoriesMeals, createAboutMeals } from "./dataFunctions.js";
const initApp = _ => {
    setSearchFocus()
    loadCategories();
    loadAreaCategories();
    loadRandomRecipes();
    const form = document.getElementById(`searchForm`);
    form.addEventListener(`submit`, submitSearch);
    const searchText = document.getElementById(`searchText`);
    searchText.addEventListener(`keyup`, e => {
        clearList();
        if(!e.target.value.length) loadRandomRecipes();
        if(e.target.value.length == 1) loadRecipesByFirstLetter(e.target.value);
        if(e.target.value.length > 1) loadRecipesByName(e.target.value);
    });
    const categoriesList = document.getElementById(`categoriesList`);
    categoriesList.addEventListener(`click`, (e) => {
        const myBtn = e.target;
        loadCategoriesMeals(myBtn, myBtn.textContent)
    });
    const mealsList = document.getElementById(`foodsContainer`);
    mealsList.addEventListener(`click`, e => likeMeal(e));
    const meals = document.getElementById(`foodsContainer`);
    meals.addEventListener(`click`, e => {
        if(e.target.tagName != `button` && e.target.tagName != `i`) {
            showMealInfos()
            const targetID = e.target.closest(`li`).id
            createAboutMeals(targetID);
        }
    });
    const hideMeals = document.getElementById(`close`);
    hideMeals.addEventListener(`click`, () => {
        clearContent();
        showMealInfos()
    })
};

document.addEventListener(`DOMContentLoaded`, initApp);

const submitSearch = event => {
    event.preventDefault();
    const searchString = document.getElementById(`searchText`).value;
    const searchTerm = cleanText(searchString); 
    loadRecipesByName(searchTerm);
    clearSearchTerms();
};


function showMealInfos () {
    const aboutMeals = document.getElementById(`aboutMeal`);
    aboutMeals.classList.toggle(`hide`)
}
