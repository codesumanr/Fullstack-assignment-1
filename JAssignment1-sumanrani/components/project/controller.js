const projectModel = require("./model");

// List all projects
const listProjects = async (req, res) => {
  try {
    const projects = await projectModel.getProject(); // your model's function returns an array of projects
    res.render("projects/list", { projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Error retrieving projects.");
  }
};

// Get project details by id (if implemented in your model)
const projectDetails = async (req, res) => {
  try {
    // For now, we return a placeholder since getProjectById isn't defined in your model.
    res.send("Project details page not implemented yet.");
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).send("Error retrieving project details.");
  }
};

module.exports = {
  listProjects,
  projectDetails
};
