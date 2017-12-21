function loadRecipe(rid) {
  showPreload();

  $.getJSON(APIurl + "recipe/" + rid)
    .then(data => {
      let recipe = data;

      // build recipe details
      $(".recipe-image").attr(
        "src",
        recipe.image || "http://via.placeholder.com/400x400"
      );
      $(".recipe-name").text(recipe.name);
      $(".recipe-author").text(recipe.author.displayName);
      $(".recipe-author-id").attr("data-author-id", recipe.author.uid);
      $(".recipe-author-link").attr("href", "/user/" + recipe.author.uid);
      $(".recipe-description").text(recipe.description);
      $(".recipe-directions").text(recipe.directions);

      let d = new Date(recipe.created);
      let d_string = d.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      $(".recipe-date").text(d_string);

      let ingredientContainer = $(".recipe-ingredients");
      recipe.ingredients.forEach(ingredient => {
        let newLi = $("<li></li>")
          .html(
            "<b>" +
              ingredient.data.name +
              "</b>" +
              ", " +
              ingredient.quantity +
              " " +
              ingredient.units
          )
          .appendTo(ingredientContainer);
      });

      hidePreload();
      $(".container").show();
    })
    .then(() => {
      // show edit button if author is logged in
      if (isLoggedIn) {
        let authorId = $(".recipe-author-id").data("author-id");
        let userId = firebase.auth().currentUser.uid;

        if (userId == authorId) {
          $("#edit-recipe-btn").show();
        } else {
          $("#edit-recipe-btn").hide();
        }
      }
    });
}

$(document).ready(() => {
  let recipeId = $(".recipe-id").data("recipe-id");
  if (recipeId && recipeId != "") {
    loadRecipe(recipeId);
  } else {
    console.error("No recipe ID was set during render", recipeId);
  }
});
