import React, { useMemo } from "react";
import "./style/App.scss";
import { useRecoilValue } from "recoil";
import { authState } from "./context/authContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./component/Login";
import Main from "./component/Main";
import { BrowserRouter } from "react-router-dom";
import Calendar from "./component/Calendar";
import History from "./component/ItemHistory";
import List from "./component/ItemList";
import TapBar from "./component/@common/TapBar";

function App() {
  const isAuth = useRecoilValue(authState);

  const routes = useMemo(() => {
    if (isAuth) {
      return [
        <Route exact path="/" component={Main} key={"/"} />,
        <Route path="/calendar" component={Calendar} key={"/calendar"} />,
        <Route path="/history" component={History} key={"/history"} />,
        <Route path="/list" component={List} key={"/list"} />,
      ];
    } else {
      return [<Route path="/" component={Login} key={"/"} />];
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {routes}
          <Redirect to="/" />
        </Switch>
        {isAuth && <TapBar />}
      </div>
    </BrowserRouter>
  );
}

export default App;
