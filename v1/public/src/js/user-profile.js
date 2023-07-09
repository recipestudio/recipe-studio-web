function loadUserDetails(userId) {
  showPreload();
  $.getJSON(APIurl + "user/" + userId)
    // load user details
    .then(user => {
      $(".user-name").text(user.displayName);
      let d = new Date(user.creationTime);
      let d_string = d.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      $(".user-created").text(d_string);
    })
    // load recipes
    .then(() => {
      loadUserRecipes(userId);
    })
    // hide preload and show results
    .then(() => {
      hidePreload();
      $(".container").show();
    })
    .catch(err => {
      console.error(err);
    });
}

function loadUserRecipes(userId) {
  $.getJSON(APIurl + "recipe/search?user=" + userId)
    .then(recipes => {
      // build recipes and append to page
      recipes.forEach(recipe => {
        buildRecipeCard(recipe, ".recipe-container");
      });

      hidePreload();
      $(".recipe-container").show();
    })
    .catch(err => {
      console.error(err);
    });
}

$(document).ready(() => {
  // load user profile here

  let uid = $(".user-id").data("user-id");
  loadUserDetails(uid);
});
