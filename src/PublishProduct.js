import React, {Component} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import firebase from 'firebase';
import ImageUploader from "react-images-upload";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import Grid from '@material-ui/core/Grid';

class PublishProduct extends Component{
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
      const aas = ["Busas", "Buzos", "Camisas", "Camisetas", "Chalecos", "Faldas", "Jeans", "Leggins", "Pantalones", "Pijamas", "Sacos", "Short", "Traje de baño"]
        this.setState({
          pictures: this.state.pictures.concat(pictureFiles)
        });
        // const storeRef = firebase.storage().ref(`/Fotos/${img.name}`)
        // const task = storeRef.put(img);
     }

     FolderList() {
      return (
        <div>
            <h2 className="title">
              VENDE TUS PRODUCTOS
            </h2>
            <label className="subTitle">Cómo quieres publicar?</label>
            <List className="listType">
            <ListItem>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <ListItemAvatar>
                  <img className ="imgSelect" src={process.env.PUBLIC_URL + 'womanImg.jpg'} alt="woman" /> 
                </ListItemAvatar>
                <ListItemText primary="Mujer" />
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
                <img className ="imgSelect" src={process.env.PUBLIC_URL + 'manImg.jpg'} alt="woman" /> 
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
                  <img className ="imgSelect" src={process.env.PUBLIC_URL + 'boyImg.jpg'} alt="woman" /> 
                  </ListItemAvatar>
                <ListItemText primary="Niño"/>
              </Grid>
            </ListItem>
          </List>
        </div>
      );
    }

    render(){
       return(
        <div>
        {
          this.FolderList()
        }
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
