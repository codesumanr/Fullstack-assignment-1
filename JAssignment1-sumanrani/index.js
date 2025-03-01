const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "Session_ID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
  })
);

app.use("/admin", require("./components/admin/routes"));
app.use("/projects", require("./components/project/routes"));

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.render("admin/admin", { username: req.session.user });
  } else {
    res.redirect("/admin/login");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
