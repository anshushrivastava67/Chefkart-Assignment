// API endpoint
const apiUrl = 'https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/1';

// Function to fetch dish data from API
async function fetchDishData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    populateDishInfo(data);
  } catch (error) {
    console.error('Error fetching dish data:', error);
  }
}

// Function to populate dish information in the HTML
function populateDishInfo(dishData) {
  const timeElement = document.querySelector('.time');
  timeElement.innerHTML = `<i class="fa fa-clock-o"></i> ${dishData.timeToPrepare}`;

  const ingredientsGroupsContainer = document.getElementById('ingredients-groups');

  // Create ingredients groups
  const createIngredientsGroup = (title, ingredients) => {
    const ingredientsGroup = document.createElement('div');
    ingredientsGroup.classList.add('ingredients-group');

    const ingredientsGroupTitle = document.createElement('h3');
    ingredientsGroupTitle.classList.add('ingredients-group-title');
    ingredientsGroupTitle.textContent = title;
    ingredientsGroup.appendChild(ingredientsGroupTitle);

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('ingredients-list');

    ingredients.forEach(ingredient => {
      const ingredientItem = document.createElement('li');
      ingredientItem.classList.add('ingredient-item');
      ingredientItem.textContent = ingredient.name;

      const ingredientValue = document.createElement('span');
      ingredientValue.classList.add('ingredient-value');
      ingredientValue.textContent = ingredient.quantity;
      ingredientItem.appendChild(ingredientValue);

      ingredientsList.appendChild(ingredientItem);
    });

    ingredientsGroup.appendChild(ingredientsList);
    ingredientsGroupsContainer.appendChild(ingredientsGroup);
  };

  // Populate ingredients groups
  createIngredientsGroup('Vegetables', dishData.ingredients.vegetables);
  createIngredientsGroup('Spices', dishData.ingredients.spices);
}

// Call the fetchDishData function on page load
fetchDishData();