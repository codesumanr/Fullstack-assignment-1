const adminModel = require("./model");

const loginForm = (req, res) => {
  res.render("admin/login");
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const authenticated = await adminModel.authenticateAdmin(username, password);
    if (authenticated) {
      req.session.loggedIn = true;
      req.session.user = username;
      res.redirect("/admin");
    } else {
      res.render("admin/login", { error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};

const registerForm = (req, res) => {
  res.render("admin/register");
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const success = await adminModel.addAdmin(username, password);
    if (success) {
      res.redirect("/admin/login");
    } else {
      res.render("admin/register", { error: "Registration failed or user exists" });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

const adminPage = (req, res) => {
  if (req.session.loggedIn) {
    res.render("admin/admin", { username: req.session.user });
  } else {
    res.redirect("/admin/login");
  }
};

module.exports = {
  loginForm,
  login,
  logout,
  registerForm,
  register,
  adminPage
};
