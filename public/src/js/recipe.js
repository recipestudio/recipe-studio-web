

function loadRecipe(rid) {

    showPreload();
    $.getJSON(APIurl + 'recipe/' + rid)
    .then((data) => {
        let recipe = data;

        // build recipe details
        $('.recipe-name').text(recipe.name);
        $('.recipe-author').text(recipe.author.displayName);
        $('.recipe-directions').text(recipe.directions);

        let d = new Date( recipe.created );
        $('.recipe-date').text( d.toGMTString() );

        let ingredientContainer = $('.recipe-ingredients');
        recipe.ingredients.forEach((ingredient) => {
            let newLi = $('<li></li>')
            .text(ingredient.data.name + 
                ', ' + ingredient.quantity + 
                ' ' + ingredient.units)
            .appendTo(ingredientContainer);
        });

        hidePreload();
        $('.container').show();
    });
}

$(document).ready(() => {

    let recipeId = $('.recipe-id').data('recipe-id');
    if (recipeId && recipeId != '') {
        loadRecipe(recipeId);
    } else {
        console.error('No recipe ID was set during render', recipeId);
    }

});