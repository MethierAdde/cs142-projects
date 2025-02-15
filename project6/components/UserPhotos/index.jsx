import React from "react";
import { List,ListItem, Typography, Divider, Grid, Paper } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
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

  render() {
    return (
      <List>
        {window.cs142models.photoOfUserModel(this.state.user._id)?.map((photo)=>{
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
