import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
    }
    let response = fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`);
    response.then((response)=>{
      this.setState({user:response.data});
      this.props.changeinfo("Photos of " + response.data.first_name 
        + " " + response.data.last_name);
    }).catch((response)=>{
      console.log(response.status,response.statusText);
    });
  }
  //负责更新页面的
  componentDidUpdate(){
    let newID = this.props.match.params.userId;
    if(newID !== this.state.user._id){
      let response = fetchModel(`http://localhost:3000/user/${newID}`);
      response.then((response)=>{
        this.setState({user:response.data});
        this.props.changeinfo("Photos of " + response.data.first_name 
          + " " + response.data.last_name);
      }).catch((response)=>{
        console.log(response.status,response.statusText);
      });
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
