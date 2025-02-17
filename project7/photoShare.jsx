// 有个非常矛盾的地方是，未登录时不允许获取userlist，但是还要求渲染userlist组件，所以这里改了

import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch,Redirect } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister"

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:"",
      userIsLoggedIn:false,
      usernow:undefined,
    }
  }
  changeinfo = (newinfo)=>{
    this.setState({info:newinfo});
  }
  changeLogstate = (newLogState,newuser) =>{
    this.setState({userIsLoggedIn:newLogState});
    this.setState({usernow:newuser});
    if(this.state.userIsLoggedIn){
      this.setState({info:"Homepage"});
    }
    else{
      this.setState({info:""});
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar info = {this.state.info} login = {this.state.userIsLoggedIn}
               username = {this.state.usernow?.first_name} changeLogstate ={this.changeLogstate}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                {
                  this.state.userIsLoggedIn?
                  <UserList />
                  :<></>
                }
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                {
                  this.state.userIsLoggedIn ?
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} changeinfo={this.changeinfo}/>}
                  />
                  :
                  <Redirect path="/users/:id" to="/login-register" />
                }
                {
                  this.state.userIsLoggedIn ?
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} changeinfo={this.changeinfo}/>}
                  />
                  :
                  <Redirect path="/users/:id" to="/login-register" />
                }
                  <Route path = '/login-register' render={(props)=> <LoginRegister {...props} changeLogstate = {this.changeLogstate}/>}/>
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
