import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import firebase from 'firebase';
import ImageUploader from "react-images-upload";
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import firebase from 'firebase';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class PublishProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
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
      selectPublication: null,
      expanded: false,
      user: null,
      selectedPro:[], 
      typeProduct: null,
      EstadoPruducto: null,
      Talla: null,
      Marca: null, 
      showComponent:""
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleItemList = this.handleItemList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //TODO CREATE FUNTION TOAST
  componentWillMount() {

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
    firebase.database().ref('EstadoPruducto')
      .once('value', snapshot => {
      this.setState({ EstadoPruducto: snapshot.val() })
    })
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
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
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginBottom: -1,
        minHeight: 49,
        '&$expanded': {
          minHeight: 49,
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
          <div>
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
        <label className="subTitle">Cómo quieres publicar?</label>
        <List className="listType">
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

          {/* <ListItem>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
              <ListItemAvatar>
                <img onClick={this.handleItemList} className ="imgSelect" src={process.env.PUBLIC_URL + 'manImg.jpg'} alt="woman" />
                </ListItemAvatar>
              <ListItemText primary="Hombre" />
              </Grid>
            </ListItem>
            <ListItem>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <ListItemAvatar>
                  <img onClick={this.handleItemList} className ="imgSelect" src={process.env.PUBLIC_URL + 'boyImg.jpg'} alt="woman" />
                  </ListItemAvatar>
                <ListItemText primary="Niño"/>
              </Grid>
            </ListItem> */}
        </List>
      </div>
    );
  }

  publicItem(){
    return(
      <div>
        <h2 className="title">
          VENDE TUS PRODUCTOS
        </h2>
    
          <div className="itemPublish">
            <h5>CATEGORÍA<span>*</span></h5>
          </div>
          <div>  
            <p className="lineCategory">Muerj>djslfja>KLDLSJADs</p>
            <p className="changeCategory">Cambiar</p>
          </div>

          <div className="itemPublish">
            <h5 >TALLA<span>*</span></h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
                displayEmpty 
              >
                <InputLabel id="label">Seleccionar</InputLabel>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5 >MARCA<span>*</span></h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
                displayEmpty 
              >
                <InputLabel id="label">Seleccionar</InputLabel>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                // onChange={handleChange}
                displayEmpty 
              >
                <InputLabel id="label">Seleccionar</InputLabel>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5 >SUBE FOTOS<span>*</span> </h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
                displayEmpty 
              >
                <InputLabel id="label">Seleccionar</InputLabel>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="itemPublish">
            <h5 >IMAGENES DESTACADAS</h5>
          </div>
          <div>
            <FormControl >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
                displayEmpty 
              >
                <InputLabel id="label">Seleccionar</InputLabel>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
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
      default:
        return this.FolderList();
    }
  }

  render() {
    console.log("Mi Stte", this.state.selectedPro)
    return (
      <div>
      {/* {this.renderSwitch()} */}
      {this.publicItem()}
        {/* <div className="hidden">
          <div style={{ marginRight: "15px" }}>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              label=""
              buttonText="Upload Images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
              maxFileSize={1048576}
              fileSizeError=" file size is too big"
            />
          </div>
        </div> */}
      </div>
    )
  }
}

export default PublishProduct;
