import React from 'react';
import {Button} from "react-bootstrap";
import {AvForm} from "availity-reactstrap-validation";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import FontAwesome from "react-fontawesome";
import loadingAction from "../../core/redux/actions/loadingAction";
import refreshAction from "../../core/redux/actions/refreshAction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Utilites} from "../../core/Utilites";

class ProfileCover extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            pictureprofilefile:"",
            pictureprofile:"",
        }
        this.engine = new RequestEngine();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.cover!==this.props.cover){
            this.setState({pictureprofile: nextProps.cover });
        }
    }

    handleValidSubmit = async () => {
        this.props.loadingAction(true);
        const iscompany = this.props.iscompany
        try {
            const {pictureprofilefile} =this.state
            const formData = new FormData();
            formData.append('cover',pictureprofilefile)
            const response = await this.engine.postItemData(iscompany?"company":"user",formData,"updatecover")
            if(response && response.status === 200){
                this.showSucessMessage("Sucess")
                this.props.refreshAction(true)
            }
        }catch (e) {
            this.showErrorMessage("error please try again")
        }
        this.props.loadingAction(false);
    };
    onChangePic(e) {
        this.setState({pictureprofilefile:e.target.files[0]})
    }
    onChangeProfilePic(e){
        this.setState({pictureprofile:e},()=>this.handleValidSubmit())


    }
    removePic(){
        this.setState({pictureprofile:null},()=>this.handleValidSubmit())
    }
    render() {
       let cover= ""
        const {pictureprofile} = this.state;
       const{canedit} = this.props
        let classBg = " companycoverempty"
        let styleBg = {"height": "240px"}
        if(pictureprofile && pictureprofile.length>1){
            cover = pictureprofile;
            styleBg = {backgroundImage: "url(" + cover + ")"}
            classBg = ""
        }

        return (
            <div className={"companycover "+classBg} style={styleBg}>
                <div className="container">
                    <AvForm   onValidSubmit={() =>this.handleValidSubmit()} className="form-horizontal liteinput" >

                        <div className="row d-flex">
                            <div className="col-lg-12 col-md-12 text-right">
                                <div className=" border-0">
                                    {canedit && <div className="card-body p-3">
                                        <ImageUpload  showimg={false}  ref="fileInput" labelupload="Select cover" onChangeImageUrl={(e) => this.onChangeProfilePic(e)} onChange={(e) => this.onChangePic(e)}/>

                                        {pictureprofile ?<><Button onClick={() => this.removePic()} className="mt-3 btn p-2 pl-3 pr-3 m-1  " style={{border:"1px solid", borderRadius:"0"}} >Remove Cover Photo</Button></>
                                        :<Button onClick={() => this.refs.fileInput.handleClick()} className="btn bg-transparent p-2 pl-3 pr-3 m-1  " style={{border:"1px solid",borderRadius:"0"}} >Add Cover Photo</Button>}

                                    </div>}
                                </div>
                            </div>
                        </div>
                    </AvForm>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload)),
    refreshAction: (payload) => dispatch(refreshAction(payload))

});
export default connect(null, mapDispatchToProps)(withRouter(ProfileCover));
