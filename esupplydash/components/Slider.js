import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="slider-parent"> 
        <Slider {...settings}>
        	{this.props.images.map(x => {
        		return(
        				<img src={x} className="slider-img" key={x}/>
        		)
        	})}
        </Slider>
      </div>
    );
  }
}
