const APIurl = "http://localhost:5000/";
const ingredients = {};

function showPreload() {
  $(".preloader-wrapper").show();
}
function hidePreload() {
  $(".preloader-wrapper").hide();
}

// build recipe card
// construct a recipe card element and append to DOM
function buildRecipeCard(recipe, container) {
  // put cards here
  let recipeContainer = $(container);

  recipe.image = recipe.image || "http://via.placeholder.com/400x400";
  recipe.description = recipe.description || "recipe.description";
  let recipeImg = $("<div></div>")
    .addClass("card-image-overflow waves-effect waves-block waves-light")
    .append(
      $("<img />")
        .addClass("activator")
        .attr("src", recipe.image)
    );

  // card title
  let recipeTitle = $("<span></span>")
    .addClass("card-title activator grey-text text-darken-4")
    .html(recipe.name + '<i class="material-icons right">more_vert</i>');

  // completed card content
  let recipeContent = $("<div></div>")
    .addClass("card-content")
    .append(recipeTitle);

  // card action
  let recipeLink = $("<div></div>")
    .addClass("card-action")
    .append(
      $("<a></a>")
        .attr("href", "recipes/" + recipe._id)
        .text("Open recipe")
    );

  // card summary
  let recipeSummary = $("<p></p>").text(recipe.description);

  // card reveal content
  let recipeReveal = $("<div></div>")
    .addClass("card-reveal")
    .append(
      $("<span></span>")
        .addClass("card-title activator grey-text text-darken-4")
        .html(recipe.name + '<i class="material-icons right">close</i>')
    )
    .append(recipeSummary);

  // completed card
  let recipeCard = $("<div></div>")
    .addClass("card sticky-action")
    .append(recipeImg)
    .append(recipeContent)
    .append(recipeLink)
    .append(recipeReveal);

  // create col for layout
  $("<div></div>")
    .addClass("col s12 l6")
    .append(recipeCard)

    // add to the container
    .appendTo(recipeContainer);
}

$(document).ready(() => {
  // init components
  $(".sidenav").sidenav();

  $("#new-recipe-btn, #edit-recipe-btn")
    .parent()
    .floatingActionButton({
      direction: "top",
      hoverEnabled: true,
      toolbarEnabled: false
    });
});
