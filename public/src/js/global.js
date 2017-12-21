const APIurl = 'https://api.recipe.studio/';
const ingredients = {};

function showPreload() { $('.preloader-wrapper').show(); }
function hidePreload() { $('.preloader-wrapper').hide(); }

$(document).ready(() => {
    // init components
    $('.sidenav').sidenav();

    $('#new-recipe-btn, #edit-recipe-btn').parent().floatingActionButton({
        direction: 'top',
        hoverEnabled: true,
        toolbarEnabled: false
    });
});