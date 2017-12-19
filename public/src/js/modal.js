const APIurl = 'http://api.recipe.studio/';

var ingredients = {};

function buildAutocompleteData() {
    let ingredientsAutocomplete = {};

    $.get( APIurl + 'ingredient/all' )
    .then(data => {
        data.forEach(i => {
            if (!ingredients[i.name]) {
                ingredients[i.name] = i._id;
            }

            if (!ingredientsAutocomplete[i.name]) {
                ingredientsAutocomplete[i.name] = null;
            }
        });

        $('#ingredients-selector').autocomplete({
            data: ingredientsAutocomplete
        });
    });

    $('#ingredients-selector').blur(() => {
        let newVal = $('#ingredients-selector').val();
        if (ingredients[ newVal ]) {
            $('#ingredient-id').val(ingredients[ newVal ]);
        } else {
            console.error('No ingredient ID found for: ' + newVal);
        }
    });
}

$(document).ready(() => {
    // init modals
    $('.modal').modal();

    // add ingredient handler
    $('#add-ingredient-btn').click(() => {
        // get ingredient properties
        let iname = $('#ingredients-selector').val(),
            iid = $('#ingredient-id').val(),
            iqty =  $('#ingredient-quantity').val(),
            iunits = $('#ingredient-units').val();

        if (iid == '' || !iid) {
            console.info("we'll create a new ingredient here.");
            // create new ingredient
            $.ajax({
                url: APIurl + 'ingredient/new',
                type: 'POST',
                data: { name: iname },
                success: () => { buildAutocompleteData(); },
                error: (res) => { console.error(res); }
            });
        }

        // build new elements
        let newLi = $('<li></li>')
            .addClass('collection-item')
            .attr('data-id', iid)
            .attr('data-qty', iqty )
            .attr('data-units', iunits )
            .text( iname + ', ' + iqty + ' ' + iunits);

        let closeBtn = $('<a></a>')
            .addClass('btn-flat waves-effect remove-ingredient right')
            .click((e) => { $(e.currentTarget).parent().remove(); })
            .append( $('<i>close</i>').addClass('material-icons') );
        
        // add elements to DOM
        newLi.append( closeBtn );
        $('ul.ingredients-container').append( newLi );
    });

    // save recipe handler
    $('#new-recipe-save').click(() => {
        let recipe_name = $('#name').val(),
            recipe_directions = $('#directions').val(),
            recipe_description = $('#description').val(),
            recipe_author = 'eBsgGdpjjuXDVEghGwLRVSoJzqm2';
        
        let recipe_ingredients = [];
        $('ul.ingredients-container').children().toArray().forEach(li => {
            if ($(li).hasClass('collection-header')) { return; }

            let ingredient_id = $(li).data('id'),
                ingredient_qty = $(li).data('qty'),
                ingredient_units = $(li).data('units');
            
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
            author: recipe_author
        };

        console.log('sending data: ', recipe_obj);

        $.ajax({
            type: 'POST',
            url: APIurl + 'recipe/new',
            data: JSON.stringify(recipe_obj),
            contentType: 'application/json',
            success: handleSaveSuccess,
            error: handleSaveError
        });
    });

    // new recipe fab handler
    $('#new-recipe-btn').click(() => {
        // build autocomplete input
        buildAutocompleteData();
    });
});

function handleSaveSuccess(result) {
    console.info(result);
}

function handleSaveError(result) {
    console.error(result);
}