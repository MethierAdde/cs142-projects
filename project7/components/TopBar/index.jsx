import React, { version } from "react";
import { AppBar, Grid, Toolbar, Typography,IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:this.props.info,
      login:this.props.login,
      username:this.props.username,
      version:"",
    }
    let response = axios.get("http://localhost:3000/test/info");
      response.then((response)=>{
        this.setState({version:response.data.__v});
      }).catch((response)=>{
        console.log(response.status,response.statusText);
      });
  }
  componentDidUpdate() {
    if (this.state.info !== this.props.info) {
      this.setState({ info: this.props.info });
      console.log(this.state.info);
    }
    if (this.state.username !== this.props.username){
      this.setState({username:this.props.username});
    }
    if (this.state.login !== this.props.login){
      this.setState({login:this.props.login});
    }
  }
  handlelogout = ()=>{
    axios.post("http://localhost:3000/admin/logout",{}).then(response =>{
      console.log("log out succeed!")
      this.props.changeLogstate(false,undefined);
      this.setState({login:false});
      window.location.href = `#/`;
  }).catch(error =>{
      console.log("Log out failed!");
  })
  }
  handlenewphoto = () =>{
    
  }


  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <div className="cs142-topbar-text">
            <Typography variant="h5" color="inherit">
              PhotoApp of Methier
            </Typography>
            <Typography variant="h5" id = "topbar-info">{this.state.info}</Typography>
            {
              this.state.login?
              <Typography variant="h5" color="inherit">
                <span>Hi,{this.state.username}!</span>
                <IconButton onClick={this.handlelogout}>logout</IconButton>
                <IconButton onClick={this.handlenewphoto}>+Photo</IconButton>
              </Typography>
              :
              <Typography variant="h5" color="inherit">
                <span>You haven't logged in!</span>
                <IconButton>
                  <Link to = "/login-register">login</Link>
                </IconButton>
              </Typography>
            }
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
