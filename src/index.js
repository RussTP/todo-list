import "./styles.css";
import Controller from "./controller.js";
import { Display } from "./dom.js";

const display = new Display();
const controller = new Controller(display);
display.controller = controller;

const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
    display.projectForm();
})




