import React from "react";
import {
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import "./styles.css";

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:window.cs142models.userListModel(),
    }
  }

  render() {
    return (
      <div>
        <Typography variant="body1">
          This is the user list
        </Typography>
        <List component="nav">
          {this.state.users.map((user)=>{
            return <Paper className="cs142-userlink-item" key = {user._id}>
              <Link to = {`/users/${user._id}`} className = "cs142-user-link">
                <ListItem>
                  <ListItemText primary = {`${user.first_name} ${user.last_name}`} />
                </ListItem>
              </Link>
            </Paper>
          })}
        </List>
      </div>
    );
  }
}

export default UserList;
