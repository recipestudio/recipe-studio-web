// Initialize Firebase
const firebase_config = {
    apiKey: "AIzaSyA5wXCfRee2qTsnZZFilun2LyjDpKGoTkY",
    authDomain: "recipe-studio.firebaseapp.com",
    databaseURL: "https://recipe-studio.firebaseio.com",
    projectId: "recipe-studio",
    storageBucket: "recipe-studio.appspot.com",
    messagingSenderId: "925652181315"
}; firebase.initializeApp(firebase_config);

var isLoggedIn = false;

// log in user
function login(email, password) {
    showPreload();

    // log in user
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
        console.info('Logged in successfully!');
        window.location = '/';
    })
    .catch((error) => {
        console.error(error.code, error.message);
        hidePreload();
        if (error.code == 'auth/wrong-password' || error.code == 'auth/invalid-email') {
            M.toast({html: 'Incorrect email or password, try again'});
        }
    });
}

// log out user
function logout() {
    firebase.auth().signOut()
    .then(() => {
        console.info('Sign-out successful.');
        window.location = '/logout';
    }).catch((error) => {
        console.error(error.code, error.message);
    });
}

// update UI when user logs in/out
function updateUserDetailsUI(user) {
    if (isLoggedIn) {
        // Update greeting text
        $('.user-greeting .username').text(user.displayName);
        $('.user-greeting').show();

        // login/out button
        $('.signin-btn').hide();
        $('.account-btn').show();
        $('.signout-btn').show();

        // new recipe btn
        $('#new-recipe-btn').show();

    } else {
        // Hide greeting text
        $('.user-greeting').hide();

        // login/out button
        $('.signin-btn').show();
        $('.account-btn').hide();
        $('.signout-btn').hide();

        // new/edit recipe-btn
        $('#new-recipe-btn').hide();
        $('#edit-recipe-btn').hide();
    }
}

$(document).ready(() => {
    // listen for authentication changes
    firebase.auth().onAuthStateChanged((user) => {
        isLoggedIn = (user ? true : false);
        updateUserDetailsUI( isLoggedIn ? user : null );
    });

    // check authentication and initialize account UI 
    updateUserDetailsUI(isLoggedIn ? firebase.auth().user : null);

    let loginFormBtn = $('.login-form-btn');
    if (loginFormBtn.length > 0) {
        loginFormBtn.click(() => {
            let userEmail = $('#user-email').val();
            let userPass = $('#user-pass').val();

            login(userEmail, userPass);
        });
    }
});