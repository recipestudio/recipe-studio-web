// Initialize Firebase
const firebase_config = {
  apiKey: "AIzaSyA5wXCfRee2qTsnZZFilun2LyjDpKGoTkY",
  authDomain: "recipe-studio.firebaseapp.com",
  databaseURL: "https://recipe-studio.firebaseio.com",
  projectId: "recipe-studio",
  storageBucket: "recipe-studio.appspot.com",
  messagingSenderId: "925652181315"
};
firebase.initializeApp(firebase_config);

var isLoggedIn = false;

// log in user
function login(email, password) {
  showPreload();

  // log in user
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      if (!result.emailVerified) {
        redirect("/verify");
      } else {
        console.info("Logged in successfully!");
        redirect("/");
      }
    })
    .catch(error => {
      console.error(error.code, error.message);
      hidePreload();
      if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/invalid-email"
      ) {
        M.toast({ html: "Incorrect email or password, try again" });
      }
    });
}

// log out user
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.info("Sign-out successful.");
      window.location = "/";
    })
    .catch(error => {
      console.error(error.code, error.message);
    });
}

// create new account
function createAccount(userDetails) {
  return new Promise((resolve, reject) => {
    if (
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.displayName
    ) {
      console.error("User details missing");
      reject("User details missing");
    } else if (
      !checkPasswords(userDetails.password, userDetails.confirmPassword)
    ) {
      reject("Passwords don't match");
    } else {
      let newUser = {
        email: userDetails.email,
        password: userDetails.password,
        name: userDetails.displayName
      };
      console.log("creating user...", newUser);

      // create user, send verification
      $.ajax({
        url: APIurl + "user/new",
        type: "POST",
        data: newUser
      })
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    }
  });
}

// check passwords are the same
function checkPasswords(p1, p2) {
  if (p1 === p2) {
    $(".conf-pass.helper-text").hide();
    $('input[type = "password"]').removeClass("invalid");
    return true;
  } else {
    $(".conf-pass.helper-text").show();
    $('input[type = "password"]').addClass("invalid");
    return false;
  }
}

// update UI when user logs in/out
function updateUserDetailsUI(user) {
  if (isLoggedIn) {
    // Update greeting text
    /* $(".user-greeting .username").text(user.displayName);
    $(".user-greeting").show(); */

    // login/out button
    $(".login-btn").hide();
    $(".signup-btn").hide();
    $(".signout-btn").show();
    $(".account-btn")
      .show()
      .children()
      .attr("href", "/user/" + user.uid + "/settings");

    // new recipe btn
    $("#new-recipe-btn")
      .parent()
      .show();
  } else {
    // Hide greeting text
    $(".user-greeting").hide();

    // login/out button
    $(".login-btn").show();
    $(".signup-btn").show();
    $(".signout-btn").hide();
    $(".account-btn")
      .hide()
      .children()
      .attr("href", "/");

    // new/edit recipe-btn
    $("#new-recipe-btn")
      .parent()
      .hide();
    $("#edit-recipe-btn")
      .parent()
      .hide();
  }
}

function verifyEmail() {
  if (isLoggedIn) {
    firebase.auth().currentUser.sendEmailVerification();
  } else {
    console.error("User not logged in");
    M.Toast({
      html: "Looks like you're not logged in. Log in to verify your account."
    });
  }
}

$(document).ready(() => {
  // listen for authentication changes
  firebase.auth().onAuthStateChanged(user => {
    isLoggedIn = user ? true : false;
    updateUserDetailsUI(isLoggedIn ? user : null);
  });

  // check authentication and initialize account UI
  updateUserDetailsUI(isLoggedIn ? firebase.auth().user : null);

  // login click event
  let loginFormBtn = $(".login-form-btn");
  if (loginFormBtn.length > 0) {
    loginFormBtn.click(() => {
      let userEmail = $("#user-email").val();
      let userPass = $("#user-pass").val();

      login(userEmail, userPass);
    });
  }

  // listen for form changes to validate signup
  let signUpInputs = $(".signup input");
  if (signUpInputs.length > 0) {
    signUpInputs.blur(() => {
      let p1 = $("#password").val(),
        p2 = $("#password-confirm").val(),
        i = $(".invalid").length;
      if (checkPasswords(p1, p2) && i == 0) {
        $(".signup-form-btn").removeClass("disabled");
      } else {
        $(".signup-form-btn").addClass("disabled");
      }
    });
  }

  // signup click event
  let signUpBtn = $(".signup-form-btn");
  if (signUpBtn.length > 0) {
    signUpBtn.click(() => {
      let newUser = {
        email: $("#email").val(),
        password: $("#password").val(),
        confirmPassword: $("#password-confirm").val(),
        displayName: $("#username").val()
      };

      createAccount(newUser)
        .then(() => {
          redirect("/verify");
        })
        .catch(err => {
          M.toast({
            html:
              "There was a problem creating your account. Please try again later."
          });
        });
    });
  }

  // verifyEmail handler
  $("#verifyEmail").click(() => {
    verifyEmail();
  });

  if (window.location.href.includes("/verify")) {
    if (isLoggedIn) {
      if (firebase.auth().currentUser.emailVerified) {
        redirect("/");
      } else {
        console.log("a");
      }
    } else {
      console.log("b");
    }
  }
});
