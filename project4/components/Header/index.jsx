import React from "react";
import "./styles.css";

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className = 'header-container'>
            <p>Man! What can I say!</p>
            <p>emmm...I can show you my <span className ="inline">fufu</span>.</p>
            <img src = './components/Header/fufu.jpg'></img>
        </div>;
    }
}

export default Header;