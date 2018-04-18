import React, { Component } from 'react';
import List, { ListItem,ListItemText,} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import "./Cart.css"

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      emails: "",
      cart: [],
      cartItems: [],
      open:false,
      openS:false,
    }
  }
  handleBuyNow(){
    this.setState({
      open: true,
    })

  }
  
  handleCloseS = () => {
    this.setState({ openS: false });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleRemove(res1){
    let Email = localStorage.getItem('email');
    let data = this.state.cartItems;
    let removeIndex = data.map(function(item) { return item.ref; }).indexOf(res1.ref);
    data.splice(removeIndex, 1);
        this.setState({
          openS: true,
          cartItems: data

        })
    fetch(`https://bookticket-195813.appspot.com/cart/remove/${Email}/${res1.ref}`, {
      method: 'GET',
    });
  }

  componentDidMount() {
    let Email = localStorage.getItem('email');
    console.log(`https://bookticket-195813.appspot.com/cart/${Email}`);
    fetch(`https://bookticket-195813.appspot.com/cart/${Email}/`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        let data = Array.from(new Set(json.refs));
        console.log(data);
        this.setState({
          cart: data
        })
        console.log(this.state.cart);
        this.state.cart.map(res => {
          fetch(`https://bookticket-195813.appspot.com/products/${res}/`, {
            method: 'GET',
          })
            .then(res1 => res1.json())
            .then(json => {

              this.setState({
                cartItems: [...this.state.cartItems, json]
              });
              console.log(this.state.cartItems);

            })
        }
        )
      });


  }





  render() {
    return (
      <div>
        <div className="cartList">
        <Typography variant="display2" gutterBottom>
        My Shopping Cart
      </Typography>
          <List component="nav">
            {
              this.state.cartItems.map(res =>
                <div className="cartListWrap" key={res.ref}>
                  <ListItem button>
                    <Avatar alt="Remy Sharp" src={res.imgUrl} />
                    <ListItemText primary={res.name} secondary={'₹' + res.price + ',' + " " + res.dimension + ", " + res.category} />
                    <Button variant="raised" size="medium" color="primary" onClick={this.handleBuyNow.bind(this)}>
                      Buy Now
                       </Button>
                    <Button variant="raised" size="medium" color="secondary" onClick={this.handleRemove.bind(this , res)}>
                      Remove
                       </Button>
                  </ListItem>
                  <Divider />
                </div>
              )
            }
          </List>

        </div>

        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogTitle id="alert-dialog-title">{"Buy Option is Not Yet Implemented."}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.openS}
          onClose={this.handleCloseS}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Added to Removed Sucessfully</span>}
        />
      </div>
    );
  }
}

export default Cart;
