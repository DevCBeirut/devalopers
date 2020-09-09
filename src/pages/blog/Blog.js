import React,{Component} from 'react';

import Header from "../common/Header";
import Footer from "../common/Footer";
import DevBigCover from "../freelancerdashboard/DevBigCover";
import TopHeader from "../common/TopHeader";
class Blog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[{title:"ddd"},{title:"ddd"},{title:"ddd"}]
        }
    }



    render() {
        const {data} = this.state
        return (
            <>
                <Header />
                <div className="main-cover">
                    <TopHeader title={"Blog"} />
                </div>
                <div className="py-5 bg-info">
                    <div className="container contact-us">

                        <div className="row d-flex  bg-white bordershadow ">
                            <div className="p-3 col-lg-12 col-md-12">
                                <div className="card border-0">
                                    <div className="col-lg-11 col-md-11 mx-auto">
                                        {data.map(item=>{

                                            return   <div className="post-preview">

                                                <h4 className="post-title">
                                                    Dummy Title
                                                </h4>
                                                <h6 className="post-subtitle">
                                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                                </h6>

                                                <p className="post-meta">Posted by
                                                    <a href="#" className="text-secondary"> Admin </a>
                                                    on May 16, 2020</p>

                                                <hr/>
                                            </div>
                                        })}





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

export default Blog;
