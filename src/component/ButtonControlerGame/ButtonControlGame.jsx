import * as React from "react";
import S from "./ButtonControlGame.module.scss";

import { resetTimeGame } from "../../store/reducers/PlayerReducer";
import { useDispatch } from "react-redux";
import { ReactComponent as FullScreen } from "../../img/fullscreen.svg";
import { ReactComponent as Restart } from "../../img/restar.svg";
import { openFullWindow } from "../../store/reducers/OpenChickeReducer";

const ButtonControlGame = (props) => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(openFullWindow());
    if (!document.fullscreenElement) {
      document.documentElement.webkitRequestFullScreen();
      document.documentElement.mozRequestFullScreen();
    } else {
      document.exitFullscreen();
    }
  };

  function get_name_browser() {
    // получаем данные userAgent
    var ua = navigator.userAgent;
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    if (ua.search(/Chrome/) > 0) return "Google Chrome";
    if (ua.search(/Firefox/) > 0) return "Firefox";
    if (ua.search(/Opera/) > 0) return "Opera";
    if (ua.search(/Safari/) > 0) return "Safari";
    if (ua.search(/MSIE/) > 0) return "Internet Explorer";
    // условий может быть и больше.
    // сейчас сделаны проверки только
    // для популярных браузеров
    return "Не определен";
  }
  var browser = get_name_browser();
  return (
    <div>
      <div
        className={`${S.full} ${browser === "Safari" && S.hidden}`}
        style={{ position: "relative", zIndex: "100000", color: "red" }}
        onClick={() => {
          toggle();
        }}
      >
        <FullScreen />
      </div>
      {!props.onliFull && (
        <div
          style={{ position: "relative", zIndex: "100000" }}
          className={S.full}
          onClick={() => {
            props.restart();
            dispatch(resetTimeGame());
            props.changeOwner();
          }}
        >
          <Restart />
        </div>
      )}{" "}
      {/*<div style={{ position: "relative", zIndex: "99999" }}>*/}
      {/*  <input*/}
      {/*    value={spawn}*/}
      {/*    onInput={(e) => {*/}
      {/*      setSpawn((prevState) => e.target.value);*/}
      {/*    }}*/}
      {/*    type="text"*/}
      {/*    placeholder={"скорость движения"}*/}
      {/*  />*/}
      {/*  {" скорость движения сек"}*/}
      {/*  <input*/}
      {/*    value={move}*/}
      {/*    onInput={(e) => {*/}
      {/*      setMove((prevState) => e.target.value);*/}
      {/*    }}*/}
      {/*    type="text"*/}
      {/*    placeholder={"скорость появления "}*/}
      {/*  />*/}
      {/*  {"скорость появления сек "}*/}
      {/*  <div*/}
      {/*    onClick={() => {*/}
      {/*      props.typeGame(spawn * 1000, move * 1000);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    go*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default ButtonControlGame;
