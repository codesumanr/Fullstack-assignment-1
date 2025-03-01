const mongoose = require("mongoose");

const db = require("../../db");

const ProjectSchema = new mongoose.Schema(
    {
        name: String,
        summary: String,
        technology: String,
        status: String,
        timespan: String
    }
);

const Project = mongoose.model("Project", ProjectSchema);

async function initializeProject(){
    const projectData = [
        
            {
                name: "MY HTML Learning App",
                summary: "A comprehensive HTML learning app that offers interactive tutorials, examples, and hands-on exercises to help users master HTML fundamentals.",
                technology: "HTML, CSS, JavaScript",
                
            },
            {
                name: "Librarydatabase",
                summary: "A robust library database system designed to efficiently manage book inventories, track loans, and streamline catalog searches for libraries.",
                technology: "ASP.NET Core, C#, Entity Framework, SQL Server",
                
        }
    ];
    await Project.insertMany(projectData);
}


async function getProject(){
    await db.connect();
    return await Project.find({});
}




async function addProject(name,summary,technology){
    await db.connect();
    let newProject = new Project({
        name: name,
        summary: summary,
        technology: technology,
       
    });

    return await newProject.save();
}


module.exports = {
    initializeProject,
    getProject,
    addProject,
    
};