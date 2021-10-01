import './App.css';
import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configureStore";
import PostList from "../pages/PostList";
import Header from "./Header";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import {Grid} from "../elements";
function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
