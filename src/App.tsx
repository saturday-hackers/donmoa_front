import React, { useMemo } from "react";
import "./style/App.scss";
import { useRecoilValue } from "recoil";
import { authState } from "./context/authContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./component/Login";
import Main from "./component/Main";
import { BrowserRouter } from "react-router-dom";
import Calendar from "./component/Calendar";
import History from "./component/History";
import List from "./component/List";

function App() {
  const isAuth = useRecoilValue(authState);

  const routes = useMemo(() => {
    if (isAuth) {
      return [
        <Route exact path="/" component={Main} />,
        <Route path="/calendar" component={Calendar} />,
        <Route path="/history" component={History} />,
        <Route path="/list" component={List} />,
      ];
    } else {
      return [<Route path="/" component={Login} />];
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Switch>
        {routes}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
