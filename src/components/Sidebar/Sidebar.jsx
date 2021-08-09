import React, { useState } from "react";
import s from "./Sidebar.module.css";
import logo from "../../assets/images/logo.svg";
import List from "./List";
import AddFolder from "./AddFolder";
import enFlag from "../../assets/images/flags/en-flag.svg";
import ruFlag from "../../assets/images/flags/ru-flag.svg";
import uaFlag from "../../assets/images/flags/ua-flag.svg";

export default function Sidebar(props) {
  const [isVisible, setVisible] = useState(false);
  console.log(isVisible);
  return (
    <div className={s.sidebarInner}>
      <div className={`${s.sidebar} ${isVisible ? s.visible : ""}`}>
        <div>
          <div className={s.logo}>
            <img src={logo} />
          </div>
          <List {...props} />
          <AddFolder {...props} />
        </div>
        <div className={s.flags}>
          <div
            className={
              props.languageReducer.language === "en" ? s.activeLanguage : ""
            }
            onClick={() => props.changeLanguage("en")}
          >
            <img src={enFlag} />
          </div>
          <div
            className={
              props.languageReducer.language === "ru" ? s.activeLanguage : ""
            }
            onClick={() => props.changeLanguage("ru")}
          >
            <img src={ruFlag} />
          </div>
          <div
            className={
              props.languageReducer.language === "ua" ? s.activeLanguage : ""
            }
            onClick={() => props.changeLanguage("ua")}
          >
            <img src={uaFlag} />
          </div>
        </div>
      </div>
        <div className={s.burgerMenu}>
          <label for="check">
            <input
              type="checkbox"
              id="check"
              onClick={() => setVisible(!isVisible)}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
    </div>
  );
}
