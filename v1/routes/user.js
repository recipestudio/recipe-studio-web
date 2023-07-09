var express = require("express");
var router = express.Router();

/* GET user page. */
router.get("/", (req, res) => {
  res.status(404).send({ message: "No user ID specified" });
});

// GET user profile page
router.get("/:id", (req, res) => {
  let uid = req.params.id;
  res.render("user/profile", { userId: uid });
});

// GET user settings page
router.get("/:id/settings", (req, res) => {
  let uid = req.params.id;
  res.render("user/settings", { userId: uid });
});

module.exports = router;
