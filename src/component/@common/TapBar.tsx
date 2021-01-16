import { Text } from "doodlin-design-system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../style/ItemHistory/index.scss";

function TapBar() {
  const { pathname } = useLocation();
  return (
    <div className="TapBar">
      <Link to="/">
        <Text className={`tab main ${pathname === "/" ? "current" : ""}`}>
          메인
        </Text>
      </Link>
      <Link to="/calendar">
        <Text
          className={`tab calendar ${
            pathname === "/calendar" ? "current" : ""
          }`}
        >
          달력
        </Text>
      </Link>
      <Link to="/list">
        <Text className={`tab list ${pathname === "/list" ? "current" : ""}`}>
          목록
        </Text>
      </Link>
      <Link to="/history">
        <Text
          className={`tab history ${pathname === "/history" ? "current" : ""}`}
        >
          변화
        </Text>
      </Link>
    </div>
  );
}

export default TapBar;
