import React, { useMemo } from "react";
import "./style/App.scss";
import { useRecoilValue } from "recoil";
import { authState } from "./context/authContext";
import { Switch, Route } from "react-router-dom";
import Login from "./component/Login";
import Main from "./component/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  const isAuth = useRecoilValue(authState);

  const routes = useMemo(() => {
    if (isAuth) {
      return (
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      );
    } else {
      <Switch>
        <Route path="/" component={Login} />
      </Switch>;
    }
  }, [isAuth]);

  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
