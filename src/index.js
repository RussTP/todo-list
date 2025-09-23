import "./styles.css";
import Controller from "./controller.js";
import { Display } from "./dom.js";
import  ProjectList  from "./projectList.js";

const projectList = new ProjectList();
const display = new Display();
const controller = new Controller(display);
display.controller = controller;




const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
    display.projectForm();
})

document.addEventListener("DOMContentLoaded", () => {
    
    display.displayProjects(projectList.projects);
    display.displayProjectNav(projectList.projects);
    display.projectNavToggle();
});





