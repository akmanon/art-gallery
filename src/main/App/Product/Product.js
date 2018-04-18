import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import './Product.css'
class Product extends Component {


    constructor() {
        super();
        this.state = {
          email: "",
          open:false,
          openS:false,
          items:[]
        }
      }
      handleCart(res) {
        console.log(`https://bookticket-195813.appspot.com/cart/add/${this.state.email}/${res.ref}`);
        this.setState({ openS: true });
        fetch(`https://bookticket-195813.appspot.com/cart/add/${this.state.email}/${res.ref}`, {
            method: 'GET',
        })
        
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
      handleCloseS = () => {
        this.setState({ openS: false });
      };
      handleClose = () => {
        this.setState({ open: false });
      };

    componentDidMount(){
        const Email = localStorage.getItem('email');
        this.setState({
            email : Email
        })
        console.log('Hello')
        fetch(`https://bookticket-195813.appspot.com/products`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items : json
                })
                console.log(this.state.items);
            });
            

    }


 


  render() {
    return (
      <div>
            <div className="wrapper">
            {
             this.state.items.map(res => 
            
            <div key={res.ref} className="cardMargin">
            <div className="cardWrap">
                <Card className="card">
                    <CardMedia
                    className="media"
                    image={res.imgUrl}
                    title={res.name}
                    />
                    <CardContent>
                    <div className="action">
                    <Typography variant="title" component="h2">
                        {res.name}
                    </Typography>
                    <Typography variant="subheading" component="h3">
                        {res.category}
                    </Typography>
                    </div>
                    <div className="action">
                    <Typography component="h3">
                    ₹{res.price}
                    </Typography>
                    <Typography component="h3">
                    {res.dimension}
                     </Typography>
                    </div>
                    </CardContent>
                    <CardActions className="action">
                    <Button variant="raised" size="medium" color="primary" onClick={this.handleClickOpen.bind(this)} >
                        Buy
                    </Button>
                    <Button variant="raised" size="medium" color="secondary" onClick={this.handleCart.bind(this , res)}>
                        Add To Cart
                    </Button>
                    </CardActions>
                </Card>
            </div>
            </div>
            )
            }
            </div>
            <div>
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
          message={<span id="message-id">Added to Cart Sucessfully</span>}
        />
      </div>
      </div>
    );
  }

}


export default Product;
