//总共四个组件在PhotoShare中,userList,detail,photos和topbar，其中detail和photos不渲染时会被卸载

import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:"Homepage",
    }
  }
  changeinfo = (newinfo)=>{
    this.setState({info:newinfo});
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar info = {this.state.info}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} changeinfo={this.changeinfo}/>}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} changeinfo={this.changeinfo}/>}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
