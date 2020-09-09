import React, { Component } from 'react';
import { Button } from "reactstrap";
export default class MultipleImageUpload extends Component {

     fileObj = [];
     fileArray = [];
     fileList = [];

    constructor(props) {
        super(props)
        this.state = {file: [],oldimg:[]}
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.placeholder!==this.props.placeholder){
            this.setState({oldimg: nextProps.placeholder});
        }
    }


    handleClick() {
        this.refs.fileInput.click();
    }

    uploadMultipleFiles(e) {
        if(e.target.files){
            this.fileObj.push(e.target.files)
            this.fileArray.push(URL.createObjectURL(e.target.files[0]))
            this.fileList.push(e.target.files[0])
        }

       // for (let i = 0; i < this.fileObj[0].length; i++) {
         //   this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      //  }
        this.setState({ file: this.fileArray })
        this.props.onChange(this.fileList)

    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    deletOldImg(index){
        console.log("delete old",index)
        let {oldimg} = this.state

        let oldfildname = ""
        if(oldimg.length>index){
            oldfildname = oldimg[index]
            oldimg.splice(index, 1)
        }
        this.setState({oldimg})
       this.props.onChangeDeleteOld(oldfildname)
    }

    deletImg(index){
        console.log("delete ",index)

        if(this.fileObj.length>index){
            this.fileObj.splice(index, 1)
        }
        if(this.fileArray.length>index){
            this.fileArray.splice(index, 1)
        }
        if(this.fileList.length>index){
            this.fileList.splice(index, 1)
        }


       this.setState({ file: this.fileArray })
       this.props.onChange(this.fileList)
    }

    render() {
        const {labelupload,viewonly} = this.props
        const {oldimg} = this.state
        if(viewonly){
            return ("");
        }
        return (
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map((url,index) => (
                        <div className="fileinput text-center">
                            <div className={"thumbnail"}>
                            <img src={url} alt="..."  />
                            </div>
                            <Button
                                color="danger"
                                className="btn-round"
                                onClick={() => this.deletImg(index)}
                            >
                                Remove</Button>
                        </div>
                    ))}

                    {(oldimg || []).map((url,index) => (
                        <div className="fileinput text-center">
                            <div className={"thumbnail"}>
                                <img src={url} alt="..."  />
                            </div>
                            <Button
                                color="danger"
                                className="btn-round"
                                onClick={() => this.deletOldImg(index)}
                            >
                                Remove</Button>
                        </div>
                    ))}

                </div>

                <div className="form-group">
                    <input type="file" className="form-control" ref="fileInput" onChange={this.uploadMultipleFiles} multiple />
                </div>

                <Button className="btn-round" onClick={() => this.handleClick()}>
                    {labelupload}
                </Button>
            </form >
        )
    }
}