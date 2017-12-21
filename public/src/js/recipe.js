// load recipe details with AJAX
function loadRecipe(rid) {
    showPreload();

    $.getJSON(APIurl + 'recipe/' + rid)
    .then((data) => {
        let recipe = data;

        // build recipe details
        $('.recipe-image').attr('src', (recipe.image || 'http://via.placeholder.com/400x400'));
        $('.recipe-name').text(recipe.name);
        $('.recipe-author').text(recipe.author.displayName);
        $('.recipe-author-id').attr('data-author-id', recipe.author.uid);
        $('.recipe-author-link').attr('href', '/user/' + recipe.author.uid);
        $('.recipe-description').text(recipe.description);
        $('.recipe-directions').text(recipe.directions);

        let d = new Date( recipe.created );
        let d_string = d.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });
        $('.recipe-date').text( d_string );

        let ingredientContainer = $('.recipe-ingredients');
        recipe.ingredients.forEach((ingredient) => {
            let newLi = $('<li></li>')
            .html('<b>' + ingredient.data.name + '</b>' +
                ', ' + ingredient.quantity + 
                ' ' + ingredient.units)
            .appendTo(ingredientContainer);
        });

        hidePreload();
        $('.container').show();
    })
    .then(() => {
        // show edit button if author is logged in
        if (isLoggedIn) {
            let authorId = $('.recipe-author-id').data('author-id');
            let userId = firebase.auth().currentUser.uid;
            
            if (userId == authorId) {
                $('#edit-recipe-btn').parent().show();
            } else {
                $('#edit-recipe-btn').parent().hide();
            }
        }
    });
}

// delete recipe confirmation & ajax
function deleteRecipe(e) {
    let recipeId = $('.recipe-id').data('recipe-id');

    // confirmation modal
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            // Delete recipe AJAX call
            $.ajax({
                url: APIurl + 'recipe/' + recipeId,
                type: 'DELETE',
                dataType: 'json'
            })
            .then(res => {
                // success
                swal("Your recipe has been deleted!", {
                    icon: "success",
                });
            })
            .then(() => {
                window.setTimeout(() => {
                    showPreload();
                    window.setTimeout(() => { window.location = '/'; }, 1000);
                }, 1000);
            })
            .catch(err => {
                console.error(err);
            });
        }
    });
}

$(document).ready(() => {
    // load recipe data using embedded ID
    let recipeId = $('.recipe-id').data('recipe-id');
    if (recipeId && recipeId != '') {
        loadRecipe(recipeId);
    } else {
        console.error('No recipe ID was set during render', recipeId);
    }

    // delete recipe handler
    $('#delete-recipe-btn').click(deleteRecipe);

});