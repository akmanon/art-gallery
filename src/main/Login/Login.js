import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import AuthService from '../AuthService/AuthService';
import './Login.css';


function InvalidData(props) {
    if (props.errorInvalid) {
        return <h4>Invalid Data</h4>;
    }
    else
        return false;
}
function Fetching(props) {
    if (props.fetch) {
        return <CircularProgress />;
    }
    else
        return false;
}
function WrongPassword(props) {
    if (props.errorPassword) {
        return <h4>Wrong Password</h4>;
    }
    else
        return false;
}

function UserNotFound(props) {
    if (props.errorUser) {
        return <h4>Invalid Email</h4>;
    }
    else
        return false;
}
function UserAlreadyExist(props) {
    if (props.errorUserExist) {
        return <h4>User Already Exist</h4>;
    }
    else
        return false;
}

class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormSubmitS = this.handleFormSubmitS.bind(this);
        this.Auth = new AuthService();
        this.state = {
            value: 0,
            wrongPassword: false,
            userNotFound: false,
            userAlreadyExist: false,
            invalidData: false,
            fetching: false,
            // contactnoS:"",
            // emailS:"",
            // nameS:"",
            // passwordS:""
        }
    }
    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        const { value } = this.state;
        return (

            <div>
                <div className='root'>
                    <Grid item xs={12} sm={6}>
                        <div className='root2'>
                            <div className="head1">
                            <i className="material-icons landscape">image</i>
                                &nbsp;Online Art Gallery
                                <div className="head2">
                                Buy 100% original, authentic art, paintings and crafts online
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className='root1'>
                            <AppBar position="static" color=" ">
                                <Tabs value={value} onChange={this.handleChangeTab} indicatorColor="primary" centered>
                                    <Tab label="Register" />
                                    <Tab label="Login" />
                                </Tabs>
                            </AppBar>
                            {value === 0 &&
                                <div className="signup">
                                    <form onSubmit={this.handleFormSubmitS}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Full Name"
                                            rowsMax="4"
                                            name="nameS"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            fullWidth
                                            pattern="[789][0-9]{9}"
                                            label="Contact No"
                                            rowsMax="4"
                                            name="contactnoS"
                                            max="10"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            rowsMax="4"
                                            name="emailS"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            name="passwordS"
                                            autoComplete="current-password"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <br /><br />
                                        <Button type='submit' variant="raised" color="primary" disabled={this.state.fetching} >
                                            Register <Icon className="rightIcon">send</Icon>
                                        </Button><br />
                                        
                                    </form>
                                    <div>
                                        <Fetching fetch={this.state.fetching} />
                                        <UserAlreadyExist errorUserExist={this.state.userAlreadyExist} />
                                        <InvalidData errorInvalid={this.state.invalidData} />
                                        <br />
                                        </div>
                                </div>
                            }
                            {value === 1 &&
                                <div className='login'>
                                    <form onSubmit={this.handleFormSubmit}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            rowsMax="4"
                                            name="email"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        /><br />
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            rowsMax="4"
                                            name="password"
                                            type="password"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        /><br /><br /><br />
                                        <Button type='submit' variant="raised" color="primary" disabled={this.state.fetching} >
                                            Login&nbsp;<i className="material-icons">&#xE86D;</i>
                                        </Button>
                                        
                                        <br />
                                       
                                    </form>
                                    <Fetching fetch={this.state.fetching} /><br />
                                        <UserNotFound errorUser={this.state.wrongPassword} />
                                        <WrongPassword errorPassword={this.state.userNotFound} />
                                </div>
                            }
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    handleChange(e) {
        console.log(this.state);
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmitS(e) {
        e.preventDefault();
        this.setState({
            fetching: true,
        });
        fetch(`https://bookticket-195813.appspot.com/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${this.state.nameS}&contactNo=${this.state.contactnoS}&email=${this.state.emailS}&password=${this.state.passwordS}`
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.message === "User Alreay Exist") {
                    this.setState({
                        fetching: false,
                        userNotFound: false,
                        wrongPassword: false,
                        userAlreadyExist: true,
                    });
                }
                else if (json.message === "Invalid Data") {
                    this.setState({
                        fetching: false,
                        userNotFound: false,
                        wrongPassword: false,
                        userAlreadyExist: false,
                        invalidData: true,
                    });
                }
                else {
                    this.Auth.login(this.state.emailS, this.state.passwordS)
                        .then(res => {
                            this.props.history.replace('/');
                        })
                        .catch(err => {
                            if (err === 501) {
                                this.setState({
                                    wrongPassword: true,
                                    userNotFound: false
                                });
                            }
                            else if (err === 502) {
                                this.setState({
                                    userNotFound: true,
                                    wrongPassword: false
                                });
                            }
                        })
                }
            })

    }
    handleFormSubmit(e) {
        this.setState({
            fetching: true,
        });
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err => {
                if (err === 501) {
                    this.setState({
                        fetching: false,
                        wrongPassword: true,
                        userNotFound: false
                    });
                }
                else if (err === 502) {
                    this.setState({
                        fetching: false,
                        userNotFound: true,
                        wrongPassword: false
                    });
                }
            })
    }
}

export default Login;