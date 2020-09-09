import React from 'react';
import profile from "../../../assets/images/profile.png"
import Carousel from 'react-bootstrap/Carousel';

import ConditionalWrapper from '../.././../components/misc/ConditionalWrapper';

let index;
function Testimonials({ testimonials }) {

    const getCarouselItem = item => (
        <div className="p-2 col-10 mx-auto col-md-4 testmoniels">
            <img src={profile} width="80" className="pt-1" alt="Against Cyber Theft" />
            <div className="card border-0">
                <div className="card-body p-4">
                    <p className="mt-4">{item.description.substring(0, 255)}... </p>
                    <h5 className="mt-3 font-weight-bold">{item.name}</h5>
                    <h6 className="mt-1" style={{ color: "#80B7DD" }}>{item.jobtitle}</h6>
                </div>
            </div>
        </div>
    )
    const isMobile = () => window.innerWidth < 768;

    return (
        <div className="testmoniels bg-info">
            <div className="container">
                <div id="testimonialssect" className="row">
                    <div className="text-center col-md-6 mx-auto">
                        <h2 className="font-weight-bold deepgray" >Testimonials</h2>
                    </div>
                </div>

                <div className="row d-flex justify-content-center text-center ">

                    <ConditionalWrapper
                        condition={isMobile()}
                        wrapper={children => <Carousel className="testimonial-carousel">{children}</Carousel>}
                    >
                        {testimonials && testimonials.map((item, index) => {
                            return (
                                isMobile() ?
                                    <Carousel.Item>
                                        {getCarouselItem(item)}
                                    </Carousel.Item>
                                    : getCarouselItem(item)
                            )
                        })}
                    </ConditionalWrapper>
                </div>

            </div>
        </div>
    );
}

export default Testimonials;
