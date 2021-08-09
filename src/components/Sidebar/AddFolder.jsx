import React, { useEffect, useState } from "react";
import s from "./Sidebar.module.css";
import add from "../../assets/images/plus.svg";
import close from "../../assets/images/delete.svg";
import { useTranslation } from "react-i18next";

export default function AddFolder(props) {
  console.log(props);
  const [isVisible, setVisible] = useState(false);
  const [selectedColorID, selectColor] = useState(1);
  const [inputText, changeInputText] = useState("");
  const [inputPlaceholderEmpty, setPlaceholder] = useState(false);

  const selectedHex = props.appReducer.colors.filter(
    (id) => id.id === selectedColorID
  );
  console.log(selectedHex.hex);

  const listId = props.appReducer.lists.length + 1;

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

  function createList(name, colorId, id) {
    if (inputText !== "") {
      props.addList(name, colorId, id);
      changeInputText("");
      setVisible(false);
      selectColor(1);
    } else {
      setPlaceholder(true);
    }
  }

  const { t } = useTranslation();

  return (
    <div className={s.addFolder}>
      <div className={s.add} onClick={() => setVisible(true)}>
        <img src={add} />
        {t("sidebar.addFolder")}
      </div>
      <div className={`${s.form} ${isVisible ? s.show : ""}`}>
        <input
          className={inputPlaceholderEmpty === false ? "" : s.warn}
          placeholder={
            inputPlaceholderEmpty === false
              ? t("sidebar.addForm.placeholder")
              : t("sidebar.addForm.placeholderWarn")
          }
          value={inputText}
          onChange={changeInput}
        />
        <div className={s.colors}>
          {props.appReducer.colors.map((color) => {
            return (
              <div
                key={color.id}
                style={{ backgroundColor: `${color.hex}` }}
                className={`${s.color} ${
                  selectedColorID == color.id ? s.selected : ""
                }`}
                onClick={() => selectColor(color.id)}
              ></div>
            );
          })}
        </div>
        <div
          className={s.btn}
          onClick={() => {
            createList(inputText, selectedColorID, listId);
            window.location = `/list/${listId}`;
          }}
        >
          {t("sidebar.addForm.btn")}
        </div>
        <img src={close} onClick={closeAddForm} />
      </div>
    </div>
  );
}
