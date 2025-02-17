import React from "react"
import {Grid,TextField, Typography} from '@mui/material'
import axios from "axios";

class LoginRegister extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputUsername:"",
            inputPassword:"",
            loginOrRegister:true,//true表示正在登陆状态，否则在注册状态
            loginerrinfo:"",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:3000/admin/login",{
            login_name:this.state.inputUsername,
            password:this.state.inputPassword
        }).then(response =>{
            console.log("log in succeed!")
            this.props.changeLogstate(true,response.data);
            this.setState({loginerrinfo:""});
            window.location.href = `#/`;
        }).catch(error =>{
            this.setState({loginerrinfo:error.response?.data});
        })
    }
    handleChangeInput(changestate){
        this.setState(changestate);
    }
    render(){
        return <Grid>
        { this.state.loginOrRegister?
            <Grid item>
                <Typography variant="h5">Log in</Typography>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField
                            required
                            label="Username"
                            type="text"
                            value={this.state.inputUsername}
                            onChange={event =>
                            this.handleChangeInput({ inputUsername: event.target.value })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <TextField
                            required
                            label="Password"
                            type="text"
                            value={this.state.inputPassword}
                            onChange={event =>
                            this.handleChangeInput({ inputPassword: event.target.value })
                            }
                        />
                    </label>
                    <br />
                    <input type = "submit" value="Log in" onClick={this.handleSubmit}/>
                    <br/>
                    <Typography>{this.state.loginerrinfo}</Typography>
                </form>
            </Grid>
            :
            <Grid>
                <Typography variant="h5">Register</Typography>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField
                            required
                            label="Username"
                            type="text"
                            value={this.state.inputUsername}
                            onChange={event =>
                            this.handleChangeInput({ inputUsername: event.target.value })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <TextField
                            required
                            label="Password"
                            type="text"
                            value={this.state.inputPassword}
                            onChange={event =>
                            this.handleChangeInput({ inputPassword: event.target.value })
                            }
                        />
                    </label>
                    <br />
                    <input type = "submit" value="Log in" onClick={this.handleSubmit}/>
                </form>
            </Grid>
        }
        </Grid>
    }
}

export default LoginRegister;