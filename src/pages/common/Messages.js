import React,{Component} from 'react';



import Header from "./Header";
import Footer from "./Footer";
import {Link, withRouter} from "react-router-dom";
import CompanyHeader from "../companydashboard/CompanyHeader";
import {Button} from "reactstrap";
import profile from "../../assets/images/profile.png";
import {FormControl} from "react-bootstrap";
import FormRow from "../../components/Row/FormRow";
import {AvForm} from "availity-reactstrap-validation";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import {connect} from "react-redux";
import DevHeader from "../freelancerdashboard/DevHeader";
import strings from "../../core/translate";
import {Memory} from "../../core/Memory";
import msgcountAction from "../../core/redux/actions/msgcountAction";

class Messages extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            filteredData:[],
            loading : false,
            selectedrow : 0,
            message:"",
            profileownerid:""

        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.props.msgcountAction(0);
        let profileownerid =  Memory.getItem("userid")
        if(profileownerid){
            this.setState({
                profileownerid:profileownerid
            })
        }

        const contactid = this.props.match.params.id
        // id
        if(contactid){
            this.callPage(contactid)
        }else{
            this.callPage()
        }

    }
    async callPage(contactid = "0") {
        this.props.loadingAction(true);
        this.setState({
            loading: true,
        })
        let messagelink = "/messages"
        if(contactid!="0"){
            messagelink= "/messages/"+contactid
        }
        const response = await this.engine.getItem("job",messagelink)

        if(response && response.status === 200){
            this.setState({
                    loading: false,
                    data: response.data.data.rooms,
                    originalData: response.data.data.rooms,
                    message:""
                }
            );
        }
        this.props.loadingAction(false);
    }


    handleValidSubmit = async (roomid) => {


        this.setState({
            loading: true
        })
        try {
            const {message} = this.state
            const data ={
                message:message,
                roomid :roomid
            }
            const response = await this.engine.postItem("job",data,"messages/save")
            if(response && response.status === 200){
                this.callPage()
                //this.messagesEnd.scrollIntoView(false);
                var scroll = document.getElementById('messagesWrapper');
                scroll.scrollTop = scroll.scrollHeight;
                scroll.animate({scrollTop: scroll.scrollHeight});
            }
        }catch (e) {
            this.showErrorMessage("please try again")
        }

        this.setState({
            loading: false
        })

    };

    changeConversation = (row) => this.setState({ selectedrow: row });

    filterConversations = value =>
        this.setState( prevState =>
            ({ data: prevState.originalData.filter(i=>i[this.props.isdev ? "company" : "user"].name.toLowerCase().includes(value)) }))

    render() {

        const {data,selectedrow,message,loading,profileownerid, filteredData } = this.state
        const {isdev} = this.props



        let name = ""



        let toprofile = {name:"",fullpicture:""}
        if (data[selectedrow] && data[selectedrow].company && data[selectedrow].company._id ==profileownerid ){
            toprofile = {name:data[selectedrow].user.name,fullpicture:data[selectedrow].user.fullpicture};
        }else if (data[selectedrow] && data[selectedrow].user && data[selectedrow].user._id ==profileownerid ) {
            toprofile = {name:data[selectedrow].company.name,fullpicture:data[selectedrow].company.fullpicture};
        }

        return (
            <>
                <Header/>
                {isdev ?<DevHeader selected={1} />:<CompanyHeader selected={3} />}
                <div className="py-5 bg-info">
                    <div className="container messaging">
                        <div className="row d-flex  bg-white">

                            <div className=" col-lg-4 col-md-4 pl-0 pr-0 borderwrap">
                                <h5 className="m-3 font-weight-bold ">Messaging </h5>
                                <FormControl type="text" placeholder="&#xF002; Search " className="txtsearch  p-4 " onChange={e => this.filterConversations(e.target.value)}
                                 style={{fontFamily:"FontAwesome, Arial",borderLeft: 0,borderRight: 0,borderRadius: 0,height:50}}/>


                                <div className="listscrollapplicant">
                                    {data.map((item,index)=>{

                                        let profilepicture = profile
                                        if (!isdev && item.user){
                                            name = item.user.name;
                                        }else if (item.company){
                                            name = item.company.name;
                                        }

                                        if(!isdev && item.user && item.user.fullpicture) {
                                            profilepicture = item.user.fullpicture;
                                        } else if (isdev && item.company && item.company.fullpicture) {
                                            profilepicture = item.company.fullpicture;
                                        }
                                        return  <div key={index} className={"d-flex borderwrap pointer "+ ((index===selectedrow) && "selectedmsg")} style={{Height: 104}} onClick={() =>  this.changeConversation(index)}>
                                            <div className="profileimg d-flex">
                                                <img src={profilepicture} width="60" className="pt-0 align-self-center"/>
                                            </div>
                                            <div className="pl-2 pt-0 col-md-9 text-left">
                                                <h5 className="mt-2 " style={{whiteSpace:"nowrap"}}>{name}</h5>
                                                {item.job && <h6 className="mt-0  ">Applied for <Link className={"text-primary"}  to={"/viewjobinfo/"+item.job._id}>{item.job.name}</Link></h6>}
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 borderwrap pl-0 pr-0">
                                {
                                    !loading && data.length === 0
                                    ? <div className="p-4">{strings.no_messages}</div>
                                    : (selectedrow!==-1) && data[selectedrow] && data[selectedrow].user &&
                                    <div className="card border-0">
                                        <div className="card-body p-0">

                                            <div className="d-flex">
                                                <div className="profileimg">
                                                    <img src={toprofile.fullpicture}  style={{borderRadius:50,height:100,width:100}} className="img-fluid pt-0"/>
                                                </div>
                                                <div className="pt-3 text-left">
                                                    <h5 className="mt-5 ">{toprofile.name}</h5>
                                                    {data[selectedrow].job && <h6 className="mt-0  ">Applied for <Link className={"text-primary"}  to={"/viewjobinfo/"+data[selectedrow].job._id}>{data[selectedrow].job.name}</Link></h6>}
                                                </div>
                                            </div>
                                            <hr/>


                                            <div className="messagesWrapper" id="messagesWrapper" ref={(el) => { this.messagesEnd = el; }}>

                                                {data[selectedrow] && data[selectedrow].message && data[selectedrow].message.map((item,index)=>{

                                                let iscompany = true;
                                                    if(item.user){
                                                        iscompany = false
                                                    }
                                                    let profilepicture = profile
                                                    if(iscompany && item.company.fullpicture){
                                                        profilepicture = item.company.fullpicture
                                                    }
                                                    if(!iscompany && item.user.fullpicture){
                                                        profilepicture = item.user.fullpicture

                                                    }
                                                    return  <div className={"d-flex  "}>
                                                        <div className=" ">
                                                            <img src={profilepicture} width="50" className="p-1"   />
                                                        </div>
                                                        <div className="pl-5 text-left">
                                                            <h5 className="mt-2 font-weight-bold ">{iscompany?item.company.name:item.user.name}</h5>
                                                            <h6 className="mt-1  ">{item.text}</h6>

                                                        </div>
                                                    </div>
                                                })}


                                            </div>
                                            <div className="mt-0">
                                                <AvForm onValidSubmit={() =>this.handleValidSubmit(data[selectedrow] && data[selectedrow]._id)} className="">
                                                    <hr />
                                                    <FormRow required={false}  hidelabel={true}  name="message" data={message}  type="textarea"   changeInput={this.changeInput.bind(this)}    />
                                                    <Button className="btn-round" onClick={() => this.handleValidSubmit(data[selectedrow] && data[selectedrow]._id)}>
                                                        Send
                                                    </Button>
                                                </AvForm>
                                            </div>



                                        </div>
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>


                <Footer/>


            </>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload)),
    msgcountAction: (payload) => dispatch(msgcountAction(payload))
});
export default connect(null, mapDispatchToProps)(withRouter(Messages));
