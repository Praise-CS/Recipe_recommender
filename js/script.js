
const mealInput = document.getElementById("meal");
const ingredientInput = document.getElementById("ingredient");
const dietSelect = document.getElementById("diet");
const searchBtn = document.getElementById("searchBtn");
const recipesContainer = document.getElementById("recipes-container");
// Event listener for search button
searchBtn.addEventListener("click", async () => 
    {
  const meal = mealInput.value.trim();
  const ingredient = ingredientInput.value.trim();
  const diet = dietSelect.value;

  recipesContainer.innerHTML = "<p>Loading recipes...</p>";

  // Fetch recipes from server API
  try 
  {
    const query = new URLSearchParams({ meal, ingredient, diet });
    const response = await fetch(`/api/search?${query}`);
    const data = await response.json();
// Display recipes
    if (!data.results || data.results.length === 0) 
        {
      recipesContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }
// Generate HTML for recipes
    recipesContainer.innerHTML = data.results
      .map(
        (recipe) => `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
      </div>
    `
      )
      .join("");
  } 
  catch (err) 
  {
    console.error(err);
    recipesContainer.innerHTML = "<p>Error fetching recipes. Try again later.</p>";
  }
});
