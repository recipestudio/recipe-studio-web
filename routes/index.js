var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

// GET terms page
router.get("/terms", (req, res) => {
  console.log("hi");
  res.render("terms");
});

// GET login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.render("logout");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/verify", (req, res) => {
  res.render("verify");
});

module.exports = router;
