function loadUserDetails(userId) {
  showPreload();
  $.getJSON(APIurl + "user/" + userId)
    // load user details
    .then(user => {
      $(".user-name").text(user.displayName);
    })
    // load recipes
    .then(() => {
      loadUserRecipes(userId);
    })
    // hide preload and show results
    .then(() => {
      hidePreload();
      $(".container").show();
    });
}

function loadUserRecipes(userId) {
  $.getJSON(APIurl + "recipe/all?user=" + userId).then(recipes => {
    // build recipes and append to page
    recipes.forEach(recipe => {
      buildRecipeCard(recipe, ".recipe-container");
    });
  });
}

$(document).ready(() => {
  // load user profile here

  let uid = $(".user-id").data("user-id");
  loadUserDetails(uid);
});
