import React, { version } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:this.props.info,
      version:"",
    }
    let response = fetchModel("http://localhost:3000/test/info");
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
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <div className="cs142-topbar-text">
            <Typography variant="h5" color="inherit">
              PhotoApp of Methier
            </Typography>
            <Typography variant="h6" id = "topbar-info">version:{this.state.version}</Typography>
            <Typography variant="h6" id = "topbar-info">{this.state.info}</Typography>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
