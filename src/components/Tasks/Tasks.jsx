import React, { useState } from "react";
import s from "./Tasks.module.css";
import add from "../../assets/images/plus.svg";
import editIcon from "../../assets/images/tasks/edit-title-icon.svg";
import Task from "./Task";
import { useTranslation } from "react-i18next";

export default function Tasks(props) {
  const [isEditing, setEdit] = useState(false);
  const [editInput, changeEditInput] = useState("");

  const [isVisible, setVisible] = useState(false);
  const [inputText, changeInputText] = useState("");
  const [inputPlaceholderEmpty, setPlaceholder] = useState(false);

  const taskId = props.appReducer.tasks.length + 1;

  function changeInput(e) {
    if (inputText === "") {
      setPlaceholder(false);
    }
    changeInputText(e.target.value);
    console.log(e.target.value);
  }

  function closeAddForm() {
    setVisible(false);
    setPlaceholder(false);
    changeInputText("");
  }

  function createList(id, listId, text) {
    if (inputText !== "") {
      props.addTask(id, listId, text);
      changeInputText("");
      setVisible(false);
    } else {
      setPlaceholder(true);
    }
  }

  function changeEdit(e) {
    changeEditInput(e.target.value);
    console.log(e.target.value);
  }

  function doEdit(title) {
    setEdit(true);
    changeEditInput(title);
  }

  function editTitle(id, name, oldText) {
    if (oldText !== name) {
      props.updateTitle(id, name);
    }
    setEdit(false);
  }
  const { t } = useTranslation();
  return props.path !== undefined ? (
    <div>
      <div>
        <div>
          {props.appReducer.lists
            .filter((id) => id.id == Number(props.path))
            .map((title) => {
              return !isEditing ? (
                <div className={s.taskTitle}>
                  <h2 className={`${s.title} ${s["h" + title.colorId]}`}>
                    {title.name}
                  </h2>
                  <img src={editIcon} onClick={() => doEdit(title.name)} />
                </div>
              ) : (
                <div className={`${s.taskTitle} ${s.editTitle}`}>
                  <input value={editInput} onChange={changeEdit} />
                  <div className={s.titleBtns}>
                    <div
                      className={`${s.btn} ${s.confirm}`}
                      onClick={() => editTitle(title.id, editInput, title.name)}
                    >
                      {t("tasks.updateTitle.confirm")}
                    </div>
                    <div
                      className={`${s.btn} ${s.close}`}
                      onClick={() => setEdit(false)}
                    >
                      {t("tasks.updateTitle.cancel")}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={s.tasks}>
          {props.appReducer.tasks
            .filter((id) => id.listId == Number(props.path))
            .map((task) => {
              return (
                <Task
                  task={task}
                  deleteTask={props.deleteTask}
                  doTask={props.doTask}
                />
              );
            })}
        </div>
      </div>
      <div className={s.addTask}>
        <div className={`${s.form} ${isVisible ? s.visible : ""}`}>
          <input
            className={inputPlaceholderEmpty === false ? "" : s.warn}
            placeholder={
              inputPlaceholderEmpty === false
                ? t("tasks.addForm.placeholder")
                : t("tasks.addForm.placeholderWarn")
            }
            value={inputText}
            onChange={changeInput}
          />
          <div className={s.btns}>
            <div
              className={`${s.btn} ${s.add}`}
              onClick={() => createList(taskId, Number(props.path), inputText)}
            >
              {t("tasks.addForm.add")}
            </div>
            <div className={`${s.btn} ${s.close}`} onClick={closeAddForm}>
              {t("tasks.addForm.close")}
            </div>
          </div>
        </div>
        {!isVisible ? (
          <div className={s.add} onClick={() => setVisible(true)}>
            <img src={add} />
            {t("tasks.addTask")}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <div className={s.allTasks}>
      <div>
        <div>
          {!isEditing ? (
            <div className={s.taskTitle}>
              <h2 className={`${s.title} ${s["h" + props.task.colorId]}`}>
                {props.task.name}
              </h2>
              <img src={editIcon} onClick={() => doEdit(props.task.name)} />
            </div>
          ) : (
            <div className={s.taskTitle}>
              <input value={editInput} onChange={changeEdit} />
              <div
                className={`${s.btn} ${s.confirm}`}
                onClick={() => editTitle(props.task.id, editInput)}
              >
                {t("tasks.updateTitle.confirm")}
              </div>
              <div
                className={`${s.btn} ${s.close}`}
                onClick={() => setEdit(false)}
              >
                {t("tasks.updateTitle.cancel")}
              </div>
            </div>
          )}
        </div>
        <div className={s.tasks}>
          {props.appReducer.tasks
            .filter((id) => id.listId == props.task.id)
            .map((task) => {
              return (
                <Task
                  task={task}
                  deleteTask={props.deleteTask}
                  doTask={props.doTask}
                />
              );
            })}
        </div>
      </div>
      <div className={s.addTask}>
        <div className={`${s.form} ${isVisible ? s.visible : ""}`}>
          <input
            className={inputPlaceholderEmpty === false ? "" : s.warn}
            placeholder={
              inputPlaceholderEmpty === false
                ? t("tasks.addForm.placeholder")
                : t("tasks.addForm.placeholderWarn")
            }
            value={inputText}
            onChange={changeInput}
          />
          <div className={s.btns}>
            <div
              className={`${s.btn} ${s.add}`}
              onClick={() => createList(taskId, props.task.id, inputText)}
            >
              {t("tasks.addForm.add")}
            </div>
            <div className={`${s.btn} ${s.close}`} onClick={closeAddForm}>
              {t("tasks.addForm.close")}
            </div>
          </div>
        </div>
        {!isVisible ? (
          <div className={s.add} onClick={() => setVisible(true)}>
            <img src={add} />
            {t("tasks.addTask")}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
