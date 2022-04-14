let likedMeals = [];
export const clearSearchTerms = _ => {
    document.getElementById(`searchText`).value = "";
    setSearchFocus()
};

export const cleanText = searchString => {
    const regex = / {2,}/g;
    const searchTerm = searchString.replaceAll(regex, " ").trim();
    return searchTerm;
}

export const clearList = _ => {
    const list = document.getElementById(`foodsContainer`);
    let child = list.lastElementChild;
    while(child) {
        list.removeChild(child);
        child = list.lastElementChild
    }
} 

export const setSearchFocus = _ => {
    document.getElementById(`searchText`).focus()
}

// ADD LIKE Button
export const likeMeal = event => {
   const myBtn = event.target,
        targetList = myBtn.closest(`li`);
    let myLikedItems = localStorage.getItem(`likedItems`) ? localStorage.getItem(`likedItems`).split(`,`) : []; 

    if(myBtn.classList.contains(`far`)) {
        myBtn.classList.toggle(`hide`)
        myBtn.nextElementSibling.classList.toggle(`hide`);
        targetList.classList.toggle(`Favorites`);
        likedMeals.push(targetList.id)
    } else if(myBtn.classList.contains(`fas`)) {
        myBtn.classList.toggle(`hide`);
        myBtn.closest(`li`).classList.toggle(`Favorites`)
        myBtn.previousElementSibling.classList.toggle(`hide`);
        likedMeals = likedMeals.filter(item => item != targetList.id);
    }

    localStorage.setItem(`likedItems`, [...myLikedItems, likedMeals])
};

export function clearContent () {
    const parent = document.querySelector(`.content`);
    let child = parent.lastElementChild;
    while(child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}