//Load Categories Base On Type Of Food
export const loadCategories = async _ => {
    const flag = `categories.php`;
    const myData = await getDataFromApi(flag);
    if(myData)createCategoriesList(myData.categories, `strCategory`);
}

// Load Categories Based On Area

export const loadAreaCategories = async _ => {
    const flag = `list.php?a=list`;
    const myData = await getDataFromApi(flag);
    if(myData)createCategoriesList(myData.meals, `strArea`);
} 

//Get Recipes By Their First Letter

export const loadRecipesByFirstLetter = async firstLetter => {
    const flag = `search.php?f=${firstLetter}`;
    const data = await getDataFromApi(flag);
    if(data) displayMeal(data);;
}

//Get Recipes By Name

export const loadRecipesByName = async name => {
    const flag = `search.php?s=${name}`;
    const data = await getDataFromApi(flag);
    if(data) displayMeal(data);
}

export const loadRandomRecipes = async _ => {
    for(let i = 0; i < 15; i++) {
        const random = await getDataFromApi(`random.php`);
        displayMeal(random);
    }
}

export const loadCategoriesMeals =  (catBtn, textContent) => {
    if(catBtn.classList.contains(`category`)) {
         loadFoodTypeMeals(textContent)
    } else {
        loadFoodArea(textContent)
    }
} 

const loadFoodTypeMeals =  text => {
    const meals = document.querySelectorAll(`#foodsContainer li`);
    hideItems(meals, text)
}

const loadFoodArea = text => {
    const meals = document.querySelectorAll(`#foodsContainer li`);
    hideItems(meals, text) 
}

const hideItems = (items, text) => {
    items
    .forEach(item => {
        item.classList.contains(text) ? item.classList.remove(`hide`) : item.classList.add(`hide`);
    })
};

const getDataFromApi = async flag => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${flag}`);
        if(!response.ok) throw Error(`Please Load The App`)
        const dataJson = await response.json();
        return dataJson;
    } catch(err) {
       console.error(err)
    }
}

const createCategoriesList = (data, type )=> {
    data.forEach(category => {
        const name = category[type];
        const item = createNewElement(`li`, `cat-button category`, ``, name);
        const categoriesList = document.getElementById(`categoriesList`);
        categoriesList.appendChild(item);
    })
};

const createNewElement = (tagName, className, id, textContent) => {
    const element = document.createElement(tagName);
    element.className = className;
    element.id = id;
    element.textContent = textContent;
    element.setAttribute(`role`, `button`)
    return element;
};

const displayMeal = (data) => {
    const durations = [30, 40, 50, 60, 90, 120],
    rates = [1, 2, 3, 4, 4.5, 4.9];
    if(data.meals) {data.meals.forEach(meal => {
        const { strMeal:title, strCategory: category, strArea:area, strMealThumb: img, idMeal: id} = meal;
        const checkFav = localStorage.getItem(`likedItems`) && localStorage.getItem(`likedItems`).includes(id)
        const mealLi = `
        <li class="food ${area} ${category} All ${checkFav ? `Favorites` : ''}" id=${id}>
                        <button class="like" id="like" aria-label="Like Food">
                            <i class="far fa-heart ${checkFav ? `hide` : ``}"></i>
                            <i class="fas fa-heart ${checkFav ? `` : `hide`}"></i>
                        </button>
                        <div class="food-img" id="foodImg">
                            <img src="${img}" alt="${title}" />
                        </div>
                        <h4 class="food-name" id="foodName">${title}</h4>
                        <div class="rate-duration">
                        <div class="duration">${durations[Math.floor(Math.random() * durations.length)]} min</div>
                        <div class="food-rate" id="foodRate">
                            <i class="fas fa-star"></i>
                            <span class="rate" id="rate">${rates[Math.floor(Math.random() * rates.length)]}</span>
                        </div>
                        </div>
        </li>
        `;
        const foodsList = document.getElementById(`foodsContainer`);
        if(mealLi) foodsList.insertAdjacentHTML(`beforeend`, mealLi);
    })}
};

export const createAboutMeals = async id => {
    const flag = `lookup.php?i=${id}`;
    const data = await getDataFromApi(flag);
    const { strMeal: title, strCategory: category, strInstructions: instructions, strArea: area } = data.meals[0];
    const myIngs = createLis(data.meals[0], `strIngredient`)
    const myMeasures = createLis(data.meals[0], `strMeasure`)
    const aboutMeals = document.getElementById(`aboutMeal`);
    const infos = `
           <div class="content">
           <p class="meal-name" >${title}</p>
           <p class="meal-category">${category}</p>
           <p class="meal-area">${area}</p>
           <p class="ins title">Instructions: </p>
           <p class="mealInstructions">${instructions}</p>
           <p class="meal-ings title">Ingredients: </p>
           <ul class="ings">
           </ul>
           <p class="measures title">Measures</p>
           <ul class="measures-list">
           </ul>
           </div>
    `;
    addContent(infos)
    addLis(myIngs, document.querySelector(`.ings`));
    addLis(myMeasures, document.querySelector(`.measures-list`));
};


function createLis(obj, key) {
    const lis = []
    for(let i = 1; i <= 20; i++) {
        if(obj[`${key}${i}`] != null && obj[`${key}${i}`] != `` && obj[`${key}${i}`] != ` `) {
            const li = `<li>${obj[`${key}${i}`]}</li>`;
            lis.push(li) 
        }
    }
    return lis;
}

function addLis (lisArray, targetList) {
    lisArray.forEach(li => {
        targetList.insertAdjacentHTML(`afterBegin`, li)
    })
}

function addContent (infos) {
    document.querySelector(`.content`).insertAdjacentHTML(`afterbegin`, infos);
}