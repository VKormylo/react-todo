import React from "react";
import deleteIcon from "../../assets/images/cancel.svg";
import defaultIcon from "../../assets/images/tasks/task-default-icon.svg";
import doneIcon from "../../assets/images/tasks/task-done-icon.svg";
import s from "./Tasks.module.css";

export default function Task(props) {
  return (
    <div className={s.task}>
      <div className={s.left}>
        <img className={s.doTask} src={props.task.done ? doneIcon : defaultIcon} onClick={() => props.doTask(props.task.id)} />
        <div className={s.taskText}>{props.task.text}</div>
      </div>
      <img className={s.deleteImg} src={deleteIcon} onClick={() => props.deleteTask(props.task.id)} />
    </div>
  );
}
