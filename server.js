const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

let database = {
  lists: [
    // { id: 1, name: "Frontend", colorId: 1 },
    // { id: 2, name: "Backend", colorId: 2 },
    // { id: 3, name: "Food", colorId: 3 },
  ],
  tasks: [
    // { id: 1, listId: 2, text: "Learn JavaScript", done: false },
    // { id: 2, listId: 2, text: "Learn React", done: false },
    // { id: 3, listId: 2, text: "Learn Redux", done: false },
  ],
  colors: [
    { id: 1, hex: "#C9D1D3" },
    { id: 2, hex: "#42B883" },
    { id: 3, hex: "#64C4ED" },
    { id: 4, hex: "#FFBBCC" },
    { id: 5, hex: "#B6E6BD" },
    { id: 6, hex: "#C355F5" },
    { id: 7, hex: "#110133" },
    { id: 8, hex: "#FF6464" },
  ],
  language: "ua"
};

app.get("/lists", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let lists = database.lists;
  res.status(200).send({
    lists,
  });
  console.log("sent");
});

app.get("/tasks", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let tasks = database.tasks;
  res.status(200).send({
    tasks,
  });
  console.log("sent");
});

app.get("/colors", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let colors = database.colors;
  res.status(200).send({
    colors,
  });
  console.log("sent");
});

app.post("/addlist", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let newList = req.body;
  database.lists.push(newList);
  let lists = database.lists;
  res.status(200).send({
    lists,
  });
  console.log("sent");
});

app.post("/addtask", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let newTask = req.body;
  database.tasks.push(newTask);
  let tasks = database.tasks;
  res.status(200).send({
    tasks,
  });
  console.log("sent");
});

app.put("/deletelist", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let removeListID = req.body.id;
  database.lists = database.lists.filter((id) => id.id !== removeListID);
  database.tasks = database.tasks.filter((id) => id.listId !== removeListID);
  console.log(database.lists);
  console.log(database.tasks);
  let lists = database.lists;
  let tasks = database.tasks;
  res.status(200).send({
    lists,
    tasks
  });
  console.log("sent");
});

app.put("/deletetask", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let removeTaskID = req.body.id;
  database.tasks = database.tasks.filter((id) => id.id !== removeTaskID);
  console.log(database.tasks);
  let tasks = database.tasks;
  res.status(200).send({
    tasks,
  });
  console.log("sent");
});

app.put("/dotask", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let taskID = req.body.id;
  let updatedTasks = database.tasks.map((task) => {
    if (task.id == taskID) {
      return { ...task, done: true };
    }
    return task;
  });
  console.log(database.tasks);
  let tasks = database.tasks = updatedTasks;
  res.status(200).send({
    tasks,
  });
  console.log("sent");
});

app.put("/updatetitle", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let {id, name} = req.body;
  let updatedLists = database.lists.map((list) => {
    if (list.id == id) {
      return { ...list, name: name };
    }
    return list;
  });
  let lists = database.lists = updatedLists;
  res.status(200).send({
    lists,
  });
  console.log("sent");
});

app.get("/language", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  let lng = database.language;
  console.log(lng);
  res.status(200).send({
    lng,
  });
});

app.post("/language", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  const { language } = req.body;
  let lng = (database.language = language);
  console.log(lng);
  res.status(200).send({
    lng,
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
