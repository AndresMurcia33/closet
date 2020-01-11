import React from "react";
import ReactDOM from "react-dom";
import ImageUploader from "react-images-upload";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
// import "./styles.css";

class Load extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) 
  {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React Images Upload Demo</h1>
        <div
        >
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

        </div>
      </div>
    );
  }
}
export default Load;