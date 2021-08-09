import { appAPI } from "../api/api";

const SET_LISTS = "SET_LISTS";
const SET_TASKS = "SET_TASKS";
const SET_COLORS = "SET_COLORS";

let initialState = {
  lists: [],
  tasks: [],
  colors: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: [...action.lists] };
    case SET_TASKS:
      return { ...state, tasks: [...action.tasks] };
    case SET_COLORS:
      return { ...state, colors: [...action.colors] };
    default:
      return state;
  }
};

export const setLists = (lists) => ({ type: SET_LISTS, lists });
export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const setColors = (colors) => ({ type: SET_COLORS, colors });

export const getLists = () => async (dispatch) => {
  const response = await appAPI.getLists();
  dispatch(setLists(response.data.lists));
  console.log(response.data.lists);
};

export const getTasks = () => async (dispatch) => {
  const response = await appAPI.getTasks();
  dispatch(setTasks(response.data.tasks));
  console.log(response.data.tasks);
};

export const getColors = () => async (dispatch) => {
  const response = await appAPI.getColors();
  dispatch(setColors(response.data.colors));
  console.log(response.data.colors);
};

export const addList = (name, hex, id) => async (dispatch) => {
  const response = await appAPI.addList(name, hex, id);
  dispatch(setLists(response.data.lists));
  console.log(response.data.lists);
};

export const addTask = (id, listId, text, done) => async (dispatch) => {
  const response = await appAPI.addTask(id, listId, text, done);
  dispatch(setTasks(response.data.tasks));
  console.log(response.data.tasks);
};

export const deleteList = (id) => async (dispatch) => {
  const response = await appAPI.deleteList(id);
  dispatch(setLists(response.data.lists));
  dispatch(setTasks(response.data.tasks));
  console.log(response.data.lists);
};

export const deleteTask = (id) => async (dispatch) => {
  const response = await appAPI.deleteTask(id);
  dispatch(setTasks(response.data.tasks));
  console.log(response.data.tasks);
};

export const doTask = (id) => async (dispatch) => {
  const response = await appAPI.doTask(id);
  dispatch(setTasks(response.data.tasks));
  console.log(response.data.tasks);
};

export const updateTitle = (id, name) => async (dispatch) => {
  const response = await appAPI.updateTitle(id, name);
  dispatch(setLists(response.data.lists));
  console.log(response.data.lists);
};

export default appReducer;
