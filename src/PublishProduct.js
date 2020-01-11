import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import firebase from 'firebase';
import ImageUploader from "react-images-upload";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
      selectedCategory: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleItemList = this.handleItemList.bind(this)
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
    // const storeRef = firebase.storage().ref(`/Fotos/${img.name}`)
    // const task = storeRef.put(img);
  }
  handleItemList(data) {
    this.setState({ selectPublication: data, selectedCategory: true })

    if (data) {
      return (
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
              {/* onClick={() => this.handleItemList(data)} */}
              <ListItemText primary={data.name} />
              <Button variant="outlined" color="secondary">
                Volver
            </Button>
            </Grid>
          </ListItem>
        </List>
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
                        <img onClick={() => this.handleItemList(objList[human])} className="imgSelect" src={process.env.PUBLIC_URL + objList[human].src} alt={objList[human].alt} />
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

  render() {
    return (
      <div>
        {
          this.state.selectedCategory ?
            this.handleItemList()
            :
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
