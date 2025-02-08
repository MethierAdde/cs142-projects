import React from "react";
import "./styles.css";

import States from "../States";
import Example from "../Example";

class Dynamic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: "Example",
        }
    }

    buttonClick = ()=>{
        let newpage = this.state.page === "Example" ? "States" : "Example";
        this.setState({page: newpage});
    }
    render(){
        return <div>
            <button onClick={this.buttonClick}>
            Switch to {this.state.page === "Example" ? "States" : "Example"}
            </button>
            {this.state.page === "Example" ?<Example />:<States />}
        </div>
    }
}

export default Dynamic;