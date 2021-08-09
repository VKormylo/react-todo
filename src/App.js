import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";
import { Route } from "react-router-dom";
import {
  addList,
  addTask,
  deleteList,
  deleteTask,
  doTask,
  getColors,
  getLists,
  getTasks,
  updateTitle,
} from "./redux/app-reducer";
import { connect } from "react-redux";
import Tasks from "./components/Tasks/Tasks";
import TasksPage from "./components/Tasks/TasksPage";
import { changeLanguage, getLanguage } from "./redux/language-reducer";
import { withTranslation } from "react-i18next";
import { compose } from "redux";

// function App() {
//   return (
//     <div className="App">
//       <Sidebar />
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLists();
    this.props.getColors();
    this.props.getTasks();
    this.props.getLanguage();
  }

  render() {
    const { t } = this.props;
    return (
      <div className="App">
        <Sidebar {...this.props} />
        <div className="app-content">
          {this.props.appReducer.lists.length ? (
            <Route
              path={`/list`}
              render={() => <TasksPage {...this.props} />}
            />
          ) : (
            <Route
              path="/"
              render={() => <div className="empty">{t("tasks.empty")}</div>}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
  languageReducer: state.languageReducer,
});

export const AppContainer = compose(
  withTranslation(),
  connect(mapStateToProps, {
    getLists,
    getColors,
    getTasks,
    addList,
    deleteList,
    addTask,
    deleteTask,
    doTask,
    updateTitle,
    getLanguage,
    changeLanguage,
  })
)(App);
