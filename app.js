fetch('https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/')
      .then(response => response.json())
      .then(data => {
        const popularDishesContainer = document.getElementById('popular-dishes-container');
        const dishesContainer = document.getElementById('dishes-container');

        const createDishElement = (dish) => {
          const dishContainer = document.createElement('div');
          dishContainer.classList.add('dish-details');

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');

          const imageElement = document.createElement('img');
          imageElement.src = dish.image;
          imageElement.alt = 'Dish Image';
          imageElement.classList.add('dish-image');
          imageContainer.appendChild(imageElement);

          const detailsContainer = document.createElement('div');
          detailsContainer.classList.add('details-container');

          const nameElement = document.createElement('h2');
          nameElement.classList.add('dish-name');
          nameElement.textContent = dish.name;
          detailsContainer.appendChild(nameElement);

          const ratingContainer = document.createElement('div');
          ratingContainer.classList.add('rating-container');
          const ratingElement = document.createElement('span');
          ratingElement.classList.add('rating');
          ratingElement.textContent = dish.rating;
          ratingContainer.appendChild(ratingElement);
          detailsContainer.appendChild(ratingContainer);

          const ingredientsElement = document.createElement('div');
          ingredientsElement.classList.add('ingredients');

          const iconContainer = document.createElement('div');
          iconContainer.classList.add('icon-container');

          // Create a Set to store unique equipment names
          const uniqueEquipments = new Set(dish.equipments);

          // Loop through unique equipment names
          uniqueEquipments.forEach(equipment => {
            const iconElement = document.createElement('div');
            iconElement.classList.add('icon-container');

            const icon = document.createElement('img');
            icon.src = 'Group 508.png'; // Use the same image file
            icon.classList.add('icon');

            const label = document.createElement('span');
            label.textContent = equipment;

            iconElement.appendChild(icon);

            iconContainer.appendChild(iconElement);
          });

          ingredientsElement.appendChild(iconContainer);

          const equipmentsText = document.createTextNode(' ' + dish.equipments.join(', '));
          ingredientsElement.appendChild(equipmentsText);

          detailsContainer.appendChild(ingredientsElement);


          const descriptionElement = document.createElement('p');
          descriptionElement.classList.add('description');
          descriptionElement.textContent = dish.description;
          detailsContainer.appendChild(descriptionElement);

          const buttonElement = document.createElement('button');
          buttonElement.textContent = 'Add';
          buttonElement.classList.add('add-btn');

          buttonElement.addEventListener('click', () => {
            // Redirect to the local file based on the dish information
            const filePath = `${dish.id}.html`;
            window.location.href = filePath;
          });
          detailsContainer.appendChild(buttonElement);

          dishContainer.appendChild(imageContainer);
          dishContainer.appendChild(detailsContainer);

          return dishContainer;
        };

        // Populate popular dishes
        data.popularDishes.forEach(dish => {
          const dishElement = document.createElement('div');
          dishElement.classList.add('popular-dish');

          const imageElement = document.createElement('img');
          imageElement.src = dish.image;
          imageElement.alt = `${dish.name} Image`;
          imageElement.classList.add('popular-dish-image');
          dishElement.appendChild(imageElement);

          const nameElement = document.createElement('span');
          nameElement.textContent = dish.name;
          nameElement.classList.add('popular-dish-name');
          dishElement.appendChild(nameElement);

          popularDishesContainer.appendChild(dishElement);
        });

        // Populate dishes
        data.dishes.forEach(dish => {
          const dishElement = createDishElement(dish);
          dishesContainer.appendChild(dishElement);
          const hrElement = document.createElement('hr');
          dishesContainer.appendChild(hrElement);
        });
      })
      .catch(error => console.error('Error fetching data:', error));