function buildIngredientAutocompleteData() {
  let ingredientsAutocomplete = {};

  $.get(APIurl + "ingredient/all").then(data => {
    data.forEach(i => {
      if (!ingredients[i.name]) {
        ingredients[i.name] = i._id;
      }

      if (!ingredientsAutocomplete[i.name]) {
        ingredientsAutocomplete[i.name] = null;
      }
    });

    $("#ingredients-selector").autocomplete({
      data: ingredientsAutocomplete
    });
  });

  $("#ingredients-selector").blur(() => {
    let newVal = $("#ingredients-selector").val();
    if (ingredients[newVal]) {
      $("#ingredient-id").val(ingredients[newVal]);
    } else {
      console.error("No ingredient ID found for: " + newVal);
    }
  });
}

// image uploading function
function uploadImage(img) {
  console.log("starting upload");

  let requestData = new FormData();
  requestData.append("image", img);
  requestData.append("type", "file");

  // show preloader
  $(".file.progress").show();

  $.ajax({
    url: "https://api.imgur.com/3/image",
    type: "POST",
    data: requestData,
    contentType: false,
    processData: false,
    headers: {
      Authorization: "Client-ID eaefba0e049bc17"
    }
  })
    .then(result => {
      // hide preloader
      $(".file.progress").hide();
      $(".recipe-image-uploader").hide();

      let recipeImage = "https://i.imgur.com/" + result.data.id + ".png";
      $(".recipe-image img").attr("src", recipeImage);
      $(".recipe-image").show();
    })
    .catch(err => console.error(err));
}

// add ingredient to recipe
function addIngredient() {
  // get ingredient properties
  let iname = $("#ingredients-selector").val(),
    iid = $("#ingredient-id").val(),
    iqty = $("#ingredient-quantity").val(),
    iunits = $("#ingredient-units").val();

  if (iid == "" || !iid) {
    // create new ingredient
    $.ajax({
      url: APIurl + "ingredient/new",
      type: "POST",
      data: { name: iname },
      success: data => {
        buildIngredientAutocompleteData();
        let iid = data._id;
        appendIngredientToCollection(iid, iname, iqty, iunits);
      },
      error: res => {
        console.error(res);
      }
    });
  } else {
    appendIngredientToCollection(iid, iname, iqty, iunits);
  }
}

function appendIngredientToCollection(id, name, qty, units) {
  // build new elements
  let newLi = $("<li></li>")
    .addClass("collection-item")
    .attr("data-id", id)
    .attr("data-qty", qty)
    .attr("data-units", units)
    .text(name + ", " + qty + " " + units);

  let closeBtn = $("<a></a>")
    .addClass("btn-flat waves-effect remove-ingredient right")
    .click(e => {
      $(e.currentTarget)
        .parent()
        .remove();
    })
    .append($("<i>close</i>").addClass("material-icons"));

  // add elements to DOM
  newLi.append(closeBtn);
  $("ul.ingredients-container").append(newLi);

  // clear ingredient fields
  $("#ingredients-selector").val("");
  $("#ingredient-id").val("");
  $("#ingredient-quantity").val("");
  $("#ingredient-units").val("");
}

// save new recipe
function saveNewRecipe() {
  let recipe_name = $("#name").val(),
    recipe_directions = $("#directions").val(),
    recipe_description = $("#description").val(),
    recipe_author = "eBsgGdpjjuXDVEghGwLRVSoJzqm2";

  if ($(".recipe-image img").attr("src")) {
    recipe_image = $(".recipe-image img").attr("src");
  }

  let recipe_ingredients = [];
  $("ul.ingredients-container")
    .children()
    .toArray()
    .forEach(li => {
      if ($(li).hasClass("collection-header")) {
        return;
      }

      let ingredient_id = $(li).data("id"),
        ingredient_qty = $(li).data("qty"),
        ingredient_units = $(li).data("units");

      recipe_ingredients.push({
        ingredient: ingredient_id,
        quantity: ingredient_qty,
        units: ingredient_units
      });
    });

  let recipe_obj = {
    name: recipe_name,
    directions: recipe_directions,
    ingredients: recipe_ingredients,
    author: recipe_author,
    description: recipe_description,
    image: recipe_image
  };

  $.ajax({
    type: "POST",
    url: APIurl + "recipe/new",
    data: JSON.stringify(recipe_obj),
    contentType: "application/json",
    success: handleSaveSuccess,
    error: handleSaveError
  });
}

$(document).ready(() => {
  // add ingredient handler
  $("#add-ingredient-btn").click(addIngredient);

  // save recipe handler
  $("#new-recipe-save").click(saveNewRecipe);

  // upload image handler
  $("#upload").click(() => {
    // check if file is uploaded
    let filesUploaded = $("#image").prop("files");
    if (filesUploaded.length > 0) {
      uploadImage(filesUploaded[0]);
    } else {
      console.error("no files chosen");
      swal("No file was selected!");
    }
  });

  // build ingredient autocomplete
  buildIngredientAutocompleteData();
});

function handleSaveSuccess(result) {
  let rid = result._id;
  redirect("/recipes/" + rid);
}

function handleSaveError(result) {
  console.error(result);
}
