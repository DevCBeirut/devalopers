import React,{Component} from 'react';


import Header from "../common/Header";
import Footer from "../common/Footer";
import {AvForm} from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import {Link} from "react-router-dom";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import _ from 'lodash';

class Allskills extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            searchkey:"",
            loading : false,
            required : false,
            errorMessage : ""
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
    }
    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("skills");

        this.setState({
            loading: true,
        })

        // debugger

        if(response && response.status === 200){
            let skills = response.data.data
            skills = _.groupBy(skills, "type")





            this.setState({
                    loading: false,
                data:skills
                }
            );
        }
        this.props.loadingAction(false);
    }


    render() {
        const {data,searchkey} = this.state
        let filteredData = data;



        // debugger
        //if(searchkey.length>0){
         //   filteredData = data.filter(i=>i.name.toLowerCase().includes(searchkey))
       // }

        const renderData =  Object.keys(filteredData).map((key=>{

            let found = false
            const skillvalue = filteredData[key].map((item,index)=>{
                if(searchkey.length>0){
                    if(item.name.toLowerCase().includes(searchkey)){
                        found = true;
                        return (<div key={index} className="col-md-3">
                            <li><Link to={"talentdirectory?"+item.name} className="text-primary pointer">{item.name}</Link></li>
                        </div>)
                    }
                }else{
                    return (<div key={index} className="col-md-3">
                        <li><Link to={"talentdirectory?"+item.name} className="text-primary pointer">{item.name}</Link></li>
                    </div>)
                }

            })
            if(searchkey.length>0){

                if(found){
                    return (<>
                        <div className="col-lg-12">
                            <h3 className="mt-5 ">{key}</h3>
                        </div>
                        {skillvalue}
                    </>   )

                }

            }else{
                return (<>
                    <div className="col-lg-12">
                        <h3 className="mt-5 ">{key}</h3>
                    </div>
                    {skillvalue}
                </>   )
            }



        }) )
        return (
            <>
                <Header/>
                <div className="py-5  ">
                    <div className="container bg-info searchskillslanding">
                        <div className="row d-flex  bg-white  ">
                            <div className="p-3 col-lg-12 col-md-12 ">
                                <div className="card border-0">
                                    <div className="card-body p-3">
                                        <h2 className="mt-3 font-weight-bold">Skills</h2>

                                        <AvForm className="mt-4 ">
                                         <div className="row">
                                             <div className="col-11 pr-0">
                                                 <FormRow hidelabel={true} type={'text'} value={searchkey} name={"search"} changeInput={searchkey => {
                                                     this.setState({ searchkey:searchkey.target.value.toLowerCase() })
                                                 }}    placeholder="Search Skills..."   />
                                             </div>
                                             <div className="col-1 pl-0">
                                           <Button  className="btn btn-sm  btn-secondary pl-4 pr-4 pt-2 pb-2 "  >
                                               Search
                                           </Button>
                                       </div>

                                         </div>
                                        </AvForm>

                                        <div className="row align-content-left">



{renderData}
                                        </div>
                                    </div>
                                </div>
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
    loadingAction: (payload) => dispatch(loadingAction(payload))
});
export default connect(null, mapDispatchToProps)(Allskills);
