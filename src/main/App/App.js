import React, { Component } from 'react';
import AuthService from '../AuthService/AuthService';
import withAuth from '../AuthService/WithAuth';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import './App.css';
import Cart from './Cart/Cart';
import Product from './Product/Product';
const Auth = new AuthService();


function DisplayCart(props) {
  if (props.cart) {
    return <Cart />;
  }
  else
    return false;
}
function DisplayProduct(props) {
  if (props.product) {
    return <Product />;
  }
  else
    return false;
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      cart: false,
      product: true,
      open: false,
    }
  }

  componentDidMount() {
    const userName = localStorage.getItem('name');
    this.setState({
      name: userName
    })
  }

  render() {
    return (
      <div>
        <div className="root-bar">
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <i className="material-icons logo">image</i>
              <Typography variant="title" color="inherit" className="flex">
                Online Art Gallery
              </Typography>
              <Button color="inherit">Welcome,&nbsp;&nbsp;{this.state.name.toUpperCase()}</Button>
              <Button color="inherit" onClick={this.handleHome.bind(this)}>HOME</Button>
              <Button color="inherit" onClick={this.handleCart.bind(this)}>CART</Button>
              <Button color="inherit" onClick={this.handleAbout.bind(this)}>ABOUT US</Button>
              <Button color="inherit" onClick={this.handleLogout.bind(this)}>Logout</Button>

            </Toolbar>
          </AppBar>
        </div>
        <DisplayCart cart={this.state.cart} />
        <DisplayProduct product={this.state.product} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"About Us"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <Typography variant="headline" gutterBottom>
                ******Website is Devoloped By******<br />
              </Typography>
              <Typography variant="title" gutterBottom>
                Ashish Kumar.<br />
                Ramesh Holkar.<br />
                Sonali Ghadi.<br />
                Kotian Ketan.<br />
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Made With <i className="material-icons icon-color">favorite</i> in PVPPCOE.
              </Typography>


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }
  handleCart() {
    this.setState({
      product: false,
      cart: true,
    })
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleAbout() {
    this.setState({
      open: true,
    })
  }
  handleHome() {
    this.setState({
      cart: false,
      product: true,
    })
  }

}

export default withAuth(App);
