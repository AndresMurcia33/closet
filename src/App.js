import React, {Component} from 'react';
import firebase from 'firebase';
import PublishProduct  from './PublishProduct'
import './App.css';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';


class App extends Component{

    constructor(){
      super();
      this.state ={
        user: null,
        auth: true,
        anchorEl:null
      }
      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleMenu = this.handleMenu.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    
    componentWillMount()
    {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({user:user })
      })
    }
    //Authentication with google 
    handleAuth()
    {
       const provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider)
       .then(result => {
         console.log(`${result.user.email} inited sesion`)}
         )
       .catch(error=> {
         console.log("Error try init sesion")
       });
    };
    
    handleLogout(){
      firebase.auth().signOut().then(result => {
        console.log(`${result.user.email} salio con éxito`)}
      )
      .catch(error=> {
        console.log("Error try init sesion")
      });
    }

    renderLogingButton(){
      // if user is logged in 
      if(this.state.user){
        return(
          <div className="contaComponent">
              {/* <img src={this.state.user.photoURL} alt={this.state.user.displayName} /> */}
              {/* <p>hola</p>{this.state.user.displayName}
              <button onClick={this.handleLogout}>Salir</button> */}
              <PublishProduct/>
          </div>
        );
      }else{
        return(
          <div>
            <button onClick={this.handleAuth}>
              Login con Google
            </button>
          </div>
        );
      }
    }
    handleMenu(event)
    {
      this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
      this.setState({anchorEl: null});
    };

    header(){
      const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
    }));

    const open = Boolean(this.state.anchorEl);
      return(
        <div >
        <AppBar position="static" className="AppBarStore">
          <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <NavigateBeforeIcon />
              </IconButton>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
                  <ShoppingBasketIcon />
                </IconButton>
                <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
                  <SearchIcon />
                </IconButton>
              </Grid>
            {this.state.auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                {
                  this.state.user ?
                  <img className={  this.state.user ? "accountCircle" : "hidden"}  src={this.state.user.photoURL} alt={this.state.user.displayName} />
                  : <AccountCircle />
                }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
             )}
          </Toolbar>
        </AppBar>
      </div>
      )
    }
    render(){
      return (
        <div className="App">
          {
            this.header()
          }
          {
            this.renderLogingButton()
          }
        </div>
      );

    }
}

export default App;
