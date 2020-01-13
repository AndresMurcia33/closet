import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import ImageUploader from "react-images-upload";
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class PublishProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      publication: {
        woman: {
          id: 1,
          name: "Mujer",
          src: 'womanImg.jpg',
          alt: "woman"
        },
        men: {
          id: 2,
          name: "Hombre",
          src: 'manImg.jpg',
          alt: "man"
        },
        boy: {
          id: 3,
          name: "Niño",
          src: 'boyImg.jpg',
          alt: "boy"
        }
      },
      pictures: [],
      selectPublication: null,
      expanded: false,
      user: null,
      selectedPro:[],
      typeProduct: null,
      EstadoPruducto: null,
      Talla: null,
      Marca: null,
      showComponent:"Seleccionar",
      selectedSize:"Seleccionar",
      selectedBrand:"Seleccionar",
      selectedState:"Seleccionar",
      sendRequest: false,
      sendRequestError: false,
      EstadoPublicacion: null,
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleItemList = this.handleItemList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePublication = this.handlePublication.bind(this);
  }

  //TODO CREATE FUNTION TOAST
  componentWillMount()
  {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user })
    })
    firebase.database().ref('TipoProducto')
      .once('value', snapshot => {
      this.setState({ typeProduct: snapshot.val() })
    })
    firebase.database().ref('Marca')
      .once('value', snapshot => {
      this.setState({ Marca: snapshot.val() })
    })
    firebase.database().ref('Talla')
      .once('value', snapshot => {
      this.setState({ Talla: snapshot.val() })
    })
    firebase.database().ref('EstadoProducto')
      .once('value', snapshot => {
      this.setState({ EstadoPruducto: snapshot.val() })
    })
    firebase.database().ref('Publicacion')
      .once('value', snapshot => {
    this.setState({ EstadoPublicacion: snapshot.val() })
  })
  }

  onDrop(pictureFiles, pictureDataURLs) {
    if (pictureFiles.length > 3){
      //TODO TOAST
      console.log("ONLY TREH POTHOS") 
    }else{
      this.setState({
        pictures: pictureFiles
      });
    }

  }


  handleClick = panel => (event, isExpanded) => {
    let newState = this.state.openList;
    this.setState({ openList: !newState });
  };

  handleChange = panel => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  handleItemList() {
    const ExpansionPanel = withStyles({
      root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
      },
      expanded: {},
    })(MuiExpansionPanel);

    const ExpansionPanelSummary = withStyles({
      root: {
        marginBottom: -1,
        minHeight: 44,
        '&$expanded': {
          minHeight: 44,
        },
      },
      content: {
        '&$expanded': {
          margin: '0px 0',
        },
      },
      expanded: {},
    })(MuiExpansionPanelSummary);

    const ExpansionPanelDetails = withStyles(theme => ({
      root: {
        padding: '0px 18px 0px 18px',
      },
    }))(MuiExpansionPanelDetails);

    const data = this.state.selectPublication;
    if (data && this.state.user) {
      const typePro =   this.state.typeProduct ? Object.keys(this.state.typeProduct) : null
      const typeObj = this.state.typeProduct;
      return (
        <div>
          <h2 className="title">
            VENDE TUS PRODUCTOS
          </h2>
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
        >
          <div style={{width:"59%"}} >
            {
              typePro ?
                typePro.map(type => {
                  return (
                    <ExpansionPanel key={type} expanded={this.state.expanded === type} onChange={this.handleChange(type)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography >{type}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List>
                          {
                            typeObj[type].map(listData => {

                              return (
                                <ListItem
                                  className="MuiListItem-rootProd"
                                  button
                                  key={listData}
                                  onClick={()=>
                                  {
                                    this.setState({selectedPro: {
                                      "publication": data.name,
                                      "type": type,
                                      "category":listData
                                    }, showComponent: "publicItem"})
                                  }
                                }
                                >
                                  <ListItemText primary={listData} />
                                </ListItem>
                              )
                            })
                          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>

                  )
                })
                :
                <p>Empty list</p>
            }
          </div>
          <div>
            <List className="listTyp2e">
              <ListItem key={data.id}  >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <ListItemAvatar >
                    <img className="imgSelect" src={process.env.PUBLIC_URL + data.src} alt={data.alt} />
                  </ListItemAvatar>
                  <ListItemText primary={data.name} />
                  <Button
                    className="smallButton"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={()=>{
                      this.setState({showComponent: "FolderList" , selectedPro : [] })
                    }}
                  >
                    Volver
              </Button>
                </Grid>
              </ListItem>
            </List>
          </div>
        </Grid>
        </div>
      )
    }

  }

  FolderList() {
    const keysTypePublic = Object.keys(this.state.publication);
    const objList = this.state.publication;
    return (
      <div>
        <h2 className="title">
          VENDE TUS PRODUCTOS
        </h2>
        <p className="subTitle">Cómo quieres publicar?</p>
        <List className="listType" >
          {
            keysTypePublic.map(human => {
              {
                return (
                  <ListItem key={objList[human].id} onClick={this.handleItemList}  >
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <ListItemAvatar >
                        <img onClick={() => this.setState({ selectPublication: objList[human], showComponent: "handleItemList" })} className="imgSelect"
                        src={process.env.PUBLIC_URL + objList[human].src}
                        alt={objList[human].alt}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={objList[human].name} />
                    </Grid>
                  </ListItem>
                )
              }
            })
          }
        </List>
      </div>
    );
  }

  handleUpload (img) {
    const file = img
    const name = new Date().valueOf();
    const storageRef = firebase.storage().ref(`Fotos/${name}`);
    const task = storageRef.put(file);
    task.on('state_changed', null,
    error => {
      console.error(error.message);
    }, () => {
       console.log("task.snapshot.downloadURL" , task.snapshot.ref.getDownloadURL())
      // task.snapshot.ref.getDownloadURL()
        task.snapshot.ref.getDownloadURL().then(function(url) {
          
        });
      // const record = {
      //   photoURL: this.state.user.photoURL,
      //   displayName: this.state.user.displayName,
      //   image: task.snapshot.downloadURL
      // }
      
    });
  }

  putStorageItem(file) {
    // the return value will be a Promise
    const name = new Date().valueOf();
    return  firebase.storage().ref(`Fotos/${name}`).put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL()
    }).catch((error) => {
      console.log('One failed:', file, error.message)
    });
  }

  handlePublication()
  {
    const pictures = this.state.pictures;
    Promise.all(
      // Array of "Promises"
      pictures.map(item => this.putStorageItem(item))
    )
    .then((url) => {
      console.log(`All success`, this.props.user.uid)
      if(pictures.length === url.length){
        const category =  this.state.selectedPro;
        const record = {
          TipoProducto:[{name: category.publication, type: category.type, category: category.category}],
          Talla: this.state.selectedSize,
          Marca: this.state.selectedBrand,
          EstadoProducto: this.state.selectedState,
          UID: this.props.user.uid,
          Pictures:url
        }
        const dbRef = firebase.database().ref('Publicacion');
        const newRow = dbRef.push();
        newRow.set(record)
        .then(data =>{
          this.setState({sendRequest: true})
          console.log("success",data)
        }).catch(error => {
          this.setState({sendRequestError:true})
          console.log("error", error)
        })
      }
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message)
    });
    
  }
  publicItem(){
    const talla = this.state.Talla;
    const marca = this.state.Marca;
    const estadoProducto = this.state.EstadoPruducto;
    const category =  this.state.selectedPro

    return(
      <div>
        <h2 className="title">
          VENDE TUS PRODUCTOS
        </h2>

          <div className="itemPublish">
            <h5>CATEGORÍA<span>*</span></h5>
          </div>
          <div>
            <p className="lineCategory">
              {
              `${category.publication}>${category.type}>${category.category} `
              }
            </p>
            <p className="changeCategory" onClick={()=>{
              this.setState({showComponent:"FolderList", selectedPro: null})
            }}>Cambiar</p>
          </div>
          <div className="itemPublish">
            <h5 >TALLA<span>*</span></h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={this.state.selectedSize}
                onChange={(e)=>{
                  this.setState({selectedSize: e.target.value})
                }}
                displayEmpty

              >
                <InputLabel id="TALLA">Seleccionar</InputLabel>
                {
                  talla ? talla.map(items =>{
                    return(
                      <MenuItem
                       key={items}
                       value={items}
                      >
                        {items}
                      </MenuItem>
                    )
                  }):
                  <MenuItem value="">Empty</MenuItem>
                }
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5>MARCA<span>*</span></h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                onChange={(e)=>{
                  this.setState({selectedBrand: e.target.value})
                }}
                displayEmpty
              >
                <InputLabel id="Marca">Seleccionar</InputLabel>
                {
                  marca ? marca.map(items =>{
                    return(
                      <MenuItem key={items} value={items}>{items}</MenuItem>
                    )
                  }):
                  <MenuItem value="">Empty</MenuItem>
                }
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5 >ESTADO<span>*</span></h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                onChange={(e)=>{
                  this.setState({selectedState: e.target.value})
                }}
                displayEmpty
              >
                <InputLabel id="Estado">Seleccionar</InputLabel>
                {
                  estadoProducto ? estadoProducto.map(items =>{
                    return(
                      <MenuItem key={items} value={items}>{items}</MenuItem>
                    )
                  }):
                  <MenuItem value="">Empty</MenuItem>
                }
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5 >SUBE FOTOS<span>*</span> </h5>
          </div>
          <div>
            <p className="changeCategory">Mira nuestros tips para subir buenas fotos</p>
          </div>
          <div className="itemPublish">
            <h5 >IMAGENES DESTACADAS</h5>
          </div>
          <div style={{ marginRight: "15px" }}>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              label=""
              buttonText="Cargar Images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
              maxFileSize={1048576}
              fileSizeError=" file size is too big"
              singleImage={true}
            />
          </div>
          <div>
            <Button
             className="publicButton"
             onClick={this.handlePublication}
            >
              Publicar
            </Button>
          </div> 
      </div>
    )
  }

  renderSwitch() {
    let param = this.state.showComponent
    switch(param) {
      case 'handleItemList':
        return this.handleItemList();
      case 'publicItem':
        return this.publicItem();
      case 'FolderList':
        return this.FolderList();
      case 'listAll':
        return this.listAll();
      default:
        return this.FolderList();
    }
  }

  listAll(){
    const listPro = this.state.EstadoPublicacion;
    const listKey = listPro ? Object.keys(listPro) : ""

      return (
        listPro ? listKey.map(data =>{
        return( 
          <div className="listProduct">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
              <Carousel
                showIndicators={false}
                autoPlay={true}
                interval={2000}
                showThumbs={false}
                width={150}
              >
                {
                  listPro[data].Pictures.map(img =>{
                    return(
                      <div>
                          <img src={img} />
                      </div>  
                    )
                  })
                }
              </Carousel>   
              <div className="infoProduct">
                <label>Producto:</label>
                <p>{listPro[data].EstadoProducto}</p>
                <label>Marca:</label>
                <p>{listPro[data].Marca}</p>
                <label>Talla:</label>
                <p>{listPro[data].Talla}</p>
                <Button className="sentButton" onClick={()=>{}} color="primary" >
                  COMPRAR
                </Button>
              </div>
            </Grid>
          </div>
        )
       }):<p>Empty List</p>
      )
  }

  render() {
    console.log(" Estado pictures", this.state.pictures)

    return (
      <div>
        {this.renderSwitch()}
        {/* {  this.publicItem()} */}
      
        <div >
        <Dialog
          open={this.state.sendRequest}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="modalTitle">{"Publicación Exitosa"}</DialogTitle>
          <DialogContent>
          <img className="imgSaccess" src={process.env.PUBLIC_URL + "success.png"} alt="success" />
            <DialogContentText className="modalBody" id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="cancelButton" onClick={()=>{
              this.setState({showComponent:"FolderList", selectedPro: null, sendRequest: false})
            }} color="primary">
              CANCELAR
            </Button>
            <Button className="sentButton" onClick={()=>{
              this.setState({showComponent:"listAll", selectedPro: null, sendRequest: false})
            }} color="primary" autoFocus>
              ENVIAR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={this.state.sendRequestError}
          onClose={this.state.sendRequestError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="modalTitle">No es posible publicar</DialogTitle>
          <DialogContent>
          <img className="imgSaccess" src={process.env.PUBLIC_URL + "success.png"} alt="success" />
            <DialogContentText className="modalBody" id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="sentButton" onClick={()=>{
              this.setState({showComponent:"FolderList", selectedPro: null, sendRequestError: false})
            }} color="primary" autoFocus>
              ENTENDIDO
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </div>
    )
  }
}

export default PublishProduct;
