import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:window.cs142models.userModel(this.props.match.params.userId),
    }
    let newID = this.props.match.params.userId;
    let newuser = window.cs142models.userModel(newID);
    this.props.changeinfo("Info of " + newuser.first_name 
        + " " + newuser.last_name);
  }
  //负责更新页面的
  componentDidUpdate(){
    let newID = this.props.match.params.userId;
    if(newID !== this.state.user._id){
      let newuser = window.cs142models.userModel(newID);
      this.setState({user:newuser});
      this.props.changeinfo("Info of " + newuser.first_name 
        + " " + newuser.last_name);
    }
  }

  render() {
    return (
      <Grid xs = {12} item>
        <Typography variant="h5">
          {this.state.user.first_name} {this.state.user.last_name}<br />
          </Typography>
        <Typography>
          <span>Location:</span> {this.state.user.location}<br />
          <span>Occupation:</span> {this.state.user.occupation}<br />
          <span>Description:</span> {this.state.user.description}<br />
        </Typography>
        <Divider />
        <Link to = {`/photos/${this.state.user._id}`}>See photos</Link>
      </Grid>
    );
  }
}

export default UserDetail;
