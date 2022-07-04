import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import p1 from "../../assets/HomePages_img/4.jpg"
import p2 from "../../assets/HomePages_img/1.jpg"
import p3 from "../../assets/HomePages_img/2.jpg"
import p4 from "../../assets/HomePages_img/3.jpg"
import "./Organization.css"

const slides = [
    {
        url: p1,
        caption: ''
    },
    {
        url: p2,
        caption: ''
    },
    {
        url: p3,
        caption: ''
    },
    {
        url: p4,
        caption: ''
    },
];

const Booth = () => {
    return (
        <div id="booth">
            <span className="or-title">Booth</span>
            <Fade>
                {slides.map((x) => {
                    return (
                        <div className="each-fade">
                            <img src={x.url} alt={x.caption} />
                        </div>
                    )
                })}
            </Fade>
        </div>
    );
};

export default Booth