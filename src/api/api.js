import * as axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

export const appAPI = {
  getLists() {
    return axios.get("/lists");
  },
  getTasks() {
    return axios.get("/tasks");
  },
  getColors() {
    return axios.get("/colors");
  },
  addList(name, colorId, id) {
    return axios.post("/addlist", { name: name, colorId: colorId, id: id });
  },
  deleteList(id) {
    return axios.put("/deletelist", { id });
  },
  addTask(id, listId, text, done = false) {
    return axios.post("/addtask", { id, listId, text, done });
  },
  deleteTask(id) {
    return axios.put("/deletetask", { id });
  },
  doTask(id) {
    return axios.put("/dotask", { id });
  },
  updateTitle(id, name) {
    return axios.put("/updatetitle", { id, name });
  },
};

export const languageAPI = {
  getLanguage() {
    return axios.get("/language");
  },
  changeLanguage(language) {
    return axios.post("/language", {language});
  },
};
