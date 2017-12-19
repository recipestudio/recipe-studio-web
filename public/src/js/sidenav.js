$(document).ready(() => {
    $('.sidenav').sidenav();

    let newAction = $('<li></li>');
    newAction.append( $('<a href="/account">Account</a>') );
    newAction.appendTo( $('.sidenav-actions') );
});