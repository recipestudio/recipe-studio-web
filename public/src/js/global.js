const APIurl = 'http://localhost:5000/';
const ingredients = {};

function showPreload() { $('.preloader-wrapper').show(); }
function hidePreload() { $('.preloader-wrapper').hide(); }

$(document).ready(() => {
    $('.sidenav').sidenav();
});