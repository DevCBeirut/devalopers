import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultImage from "../../assets/img/image_placeholder.jpg";
import defaultAvatar from "../../assets/img/placeholder.jpg";
import filex from "../../assets/img/filex.png";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
       // imagePreviewUrl: defaultAvatar
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

    componentDidMount() {
      
    }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    if(!e.target.files[0]){
      return;
    }
    let file = e.target.files[0];
    reader.onloadend = () => {
      if(this.props.isfile){
          this.setState({
              file: file,
              imagePreviewUrl: filex
          });
      }else{
          this.setState({
              file: file,
              imagePreviewUrl: reader.result
          });
        this.props.onChangeImageUrl && this.props.onChangeImageUrl(reader.result)
      }

    };
    this.props.onChange(e)

    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    const {labelupload,placeholder,showimg = true,onlyimage=true} = this.props
      const{imagePreviewUrl} = this.state

    let accept = "application/pdf, application/vnd.ms-excel"
    if(onlyimage){
      accept = "image/x-png,image/gif,image/jpeg"
    }
    return (
      <div className="fileinput text-center">
        <input type="file" name="filex" id="filex" accept={accept} onChange={this.handleImageChange} ref="fileInput" />
          {showimg &&<div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
            {(!placeholder || this.state.file !== null) && imagePreviewUrl &&  <img src={imagePreviewUrl} alt="..." />}
            { this.state.file === null && placeholder && <img src={placeholder} alt="..." />}
        </div>}
          {showimg && <div>
          {this.state.file === null ? (
            <Button className="btn-round" onClick={() => this.handleClick()}>
                {labelupload}
            </Button>
          ) : (
            <span>
              <Button className="btn-round" onClick={() => this.handleClick()}>
                Change
              </Button>
              {this.props.avatar ? <br /> : null}
              <Button
                color="danger"
                className="btn-round"
                onClick={() => this.handleRemove()}
              >
                Remove
              </Button>
            </span>
          )}
        </div>}
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
    isfile: PropTypes.bool,
    labelupload : PropTypes.string
};
ImageUpload.defaultProps = {
    labelupload: "Select image",
    isfile : false
};

export default ImageUpload;
