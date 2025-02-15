import React from "react";
import { List,ListItem, Typography, Divider, Grid, Paper } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

import "./styles.css";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      photos:[],
    }
    let response = axios.get(`http://localhost:3000/user/${this.props.match.params.userId}`);
    response.then((response)=>{
      this.setState({user:response.data});
      this.props.changeinfo("Photos of " + response.data.first_name 
        + " " + response.data.last_name);
      let photosResponse = axios.get(`http://localhost:3000/photosOfUser/${this.state.user._id}`);
      photosResponse.then((response1)=>{
        this.setState({photos:response1.data});
      }).catch((response1)=>{
        console.log(response1.status,response1.statusText);
      })
    }).catch((response)=>{
      console.log(response.status,response.statusText);
    });
    
  }

  render() {
    return (
      <List>
        {this.state.photos?.map((photo)=>{
          return <Grid key = {photo._id}>
            <Paper className="cs142-photo-item">
              <img src = {`../../images/${photo.file_name}`} />
              <br/>
              <Typography variant="h6">Comments:</Typography>
              <Divider/>
              {photo.comments?.map((cmt) => {
                return <div key={cmt._id}>
                  <p>{cmt.user.first_name} {cmt.date_time} <br/>{cmt.comment}</p> 
                  <Divider/>
                  </div>
              })}
            </Paper>
          </Grid>
        })}
      </List>
    );
  }
}

export default UserPhotos;
