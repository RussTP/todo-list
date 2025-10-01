import "./styles.css";
import Controller from "./controller.js";
import { Display } from "./dom.js";
import  ProjectList  from "./projectList.js";

const projectList = new ProjectList();
const display = new Display(projectList);
const controller = new Controller(display, projectList);
display.controller = controller;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
    console.log("storage successs");
  // Yippee! We can use localStorage awesomeness
} else {
    console.log("fail sauce");
  // Too bad, no localStorage for us
}



document.addEventListener("DOMContentLoaded", () => {
    display.displayProjects(projectList.projects);
    display.displayProjectNav(projectList.projects);
    display.projectNavToggle();
    display.addProject();
    display.completeProjectNavToggle();
    display.sideNavMobile();


});




