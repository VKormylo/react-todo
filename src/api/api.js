import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export const appAPI = {
  getLists() {
    return instance.get("/lists");
  },
  getTasks() {
    return instance.get("/tasks");
  },
  getColors() {
    return instance.get("/colors");
  },
  addList(name, colorId, id) {
    return instance.post("/addlist", { name: name, colorId: colorId, id: id });
  },
  deleteList(id) {
    return instance.put("/deletelist", { id });
  },
  addTask(id, listId, text, done = false) {
    return instance.post("/addtask", { id, listId, text, done });
  },
  deleteTask(id) {
    return instance.put("/deletetask", { id });
  },
  doTask(id) {
    return instance.put("/dotask", { id });
  },
  updateTitle(id, name) {
    return instance.put("/updatetitle", { id, name });
  },
};

export const languageAPI = {
  getLanguage() {
    return instance.get("/language");
  },
  changeLanguage(language) {
    return instance.post("/language", {language});
  },
};
