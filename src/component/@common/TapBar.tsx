import { Text } from "doodlin-design-system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../style/ItemHistory/index.scss";
import main from "../../asset/house.svg";
import history from "../../asset/history.svg";
import list from "../../asset/list.svg";
import calendar from "../../asset/calendar.svg";

function TapBar() {
  const { pathname } = useLocation();
  return (
    <div className="TapBar">
      <Link to="/">
        <Text className={`tab main ${pathname === "/" ? "current" : ""}`}>
          <img src={main} alt="" />
        </Text>
      </Link>
      <Link to="/calendar">
        <Text
          className={`tab calendar ${
            pathname === "/calendar" ? "current" : ""
          }`}
        >
          <img src={calendar} alt="" />
        </Text>
      </Link>
      <Link to="/list">
        <Text className={`tab list ${pathname === "/list" ? "current" : ""}`}>
          <img src={list} alt="" />
        </Text>
      </Link>
      <Link to="/history">
        <Text
          className={`tab history ${pathname === "/history" ? "current" : ""}`}
        >
          <img src={history} alt="" />
        </Text>
      </Link>
    </div>
  );
}

export default TapBar;
