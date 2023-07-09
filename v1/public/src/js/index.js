// make AJAX request to API for recipes and add to page
function getRecipes() {
  showPreload();

  $.getJSON(APIurl + "recipe/all").then(recipes => {
    // build recipes and append to page
    recipes.forEach(recipe => {
      buildRecipeCard(recipe, ".recipe-container");
    });

    hidePreload();
    $(".recipe-container").show();
  });
}

$(document).ready(() => {
  getRecipes();
});
