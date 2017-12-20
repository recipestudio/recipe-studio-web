const APIurl = 'http://api.recipe.studio/';
const ingredients = {};

function showPreload() { $('.preloader-wrapper').show(); }
function hidePreload() { $('.preloader-wrapper').hide(); }

$(document).ready(() => {
    $('.sidenav').sidenav();
})