import React, { useState } from "react";
import s from "./Tasks.module.css";
import add from "../../assets/images/plus.svg";
import editIcon from "../../assets/images/tasks/edit-title-icon.svg";
import Task from "./Task";
import Tasks from "./Tasks";

export default function TasksPage(props) {
  console.log(props);
  const path = window.location.pathname.split("list/")[1];

  return (
    <div className={s.tasksInner}>
      {path === undefined ? (
        props.appReducer.lists.map((task) => {
          return <Tasks {...props} task={task} path={path} />;
        })
      ) : (
        <Tasks {...props} path={path} />
      )}
    </div>
  );
}
