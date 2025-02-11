import React from "react";
import { List,ListItem, Typography, Divider, Grid, Paper } from "@mui/material";

import "./styles.css";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:window.cs142models.userModel(this.props.match.params.userId),
    }
    let newID = this.props.match.params.userId;
    let newuser = window.cs142models.userModel(newID);
    this.props.changeinfo("Photos of " + newuser.first_name 
        + " " + newuser.last_name);
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
