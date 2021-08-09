import React from "react";
import s from "./Sidebar.module.css";
import all from "../../assets/images/all-icon.svg";
import close from "../../assets/images/cancel.svg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function List(props) {
  const { t } = useTranslation();
  
  function deleteList(id) {
    props.deleteList(id);
    window.location = "/list"
  }

  return (
    <ul className={s.list}>
      <NavLink exact to="/list" activeClassName={s.active}>
        <li className={s.allTasks}>
          <img src={all} />
          <span>{t("sidebar.allTasks")}</span>
        </li>
      </NavLink>
      {props.appReducer.lists.map((list) => {
        return (
          <NavLink
            to={`/list/${list.id}`}
            activeClassName={s.active}
            key={list.id}
          >
            <li className={s.link}>
              <div className={s.left}>
                <div
                  // style={{ backgroundColor: `${list.colorHex}` }}
                  className={`${s.circle} ${s["h" + list.colorId]}`}
                ></div>
                <div className={s.name}>{list.name}</div>
              </div>
              <img src={close} onClick={() => deleteList(list.id)} />
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
}
