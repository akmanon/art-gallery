import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AuthService from '../AuthService/AuthService';
import './Login.css';



function WrongPassword(props) {
    if (props.errorPassword) {
        return <h1>Invalid Password</h1>;
    }
    else
        return false;
}

function UserNotFound(props) {
    if (props.errorUser) {
        return <h1>User Not Found</h1>;
    }
    else
        return false;
}
function UserAlreadyExist(props) {
    if (props.errorUserExist) {
        return <h1>User Already Exist</h1>;
    }
    else
        return false;
}

class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormSubmitS = this.handleFormSubmitS.bind(this);
        this.Auth = new AuthService();
        this.state = {
            wrongPassword: false,
            userNotFound: false,
            userAlreadyExist: false,
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
        return (
            <div>
                <div className="card">
                    <h1>Login</h1>
                    <Grid container
                        spacing={16}
                        
                        justify='center'>
                        <Grid item xs={6}>
                            <Paper className="paper">xs</Paper>
                        </Grid>
                    </Grid>
                    <UserNotFound errorUser={this.state.wrongPassword} />
                    <WrongPassword errorPassword={this.state.userNotFound} />
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            onChange={this.handleChange}

                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
                <div className="card">
                    <UserAlreadyExist errorUserExist={this.state.userAlreadyExist} />
                    <h1>SignUp</h1>
                    <form onSubmit={this.handleFormSubmitS}>
                        <input
                            className="form-item"
                            placeholder="Full Name"
                            name="nameS"
                            type="text"
                            required
                            onChange={this.handleChangeS}
                        />
                        <input
                            className="form-item"
                            placeholder="Contact No"
                            name="contactnoS"
                            type="text"
                            pattern="[789][0-9]{9}"
                            onChange={this.handleChangeS}
                        />
                        <input
                            className="form-item"
                            placeholder="Email"
                            name="emailS"
                            type="email"
                            required
                            onChange={this.handleChangeS}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="passwordS"
                            type="password"
                            onChange={this.handleChangeS}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleChangeS(e) {
        console.log(this.state);

        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmitS(e) {
        e.preventDefault();
        console.log(this.state);
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
                        userNotFound: false,
                        wrongPassword: false,
                        userAlreadyExist: true,
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
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
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
}

export default Login;