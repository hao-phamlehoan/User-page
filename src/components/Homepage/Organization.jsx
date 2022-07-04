import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "./Organization.css"
import p1 from "../../assets/HomePages_img/dev.jpg"
import p2 from "../../assets/HomePages_img/dek.jpg"
import p3 from "../../assets/HomePages_img/elca.jpg"
import p4 from "../../assets/HomePages_img/shopee.png"
import p11 from "../../assets/HomePages_img/dev1.jpg"
import p22 from "../../assets/HomePages_img/dek1.jpg"
import p33 from "../../assets/HomePages_img/elca1.jpg"
import p44 from "../../assets/HomePages_img/shopee1.png"

const slides = [
    {
        url1: p1,
        url2: p11,
        caption: ''
    },
    {
        url1: p2,
        url2: p22,
        caption: ''
    },
    {
        url1: p3,
        url2: p33,
        caption: ''
    },
    {
        url1: p4,
        url2: p44,
        caption: ''
    },
];


const Organization = () => {
    return (
        <div id="organization" >
            <span className="or-title">Accompany enterprises</span>
            <Fade>
                {slides.map((x) => {
                    return (
                        <div className="each-fade">
                            <img src={x.url1} alt={x.caption} />
                            <img src={x.url2} alt={x.caption} />
                        </div>
                    )
                })}
            </Fade>
        </div>
    );
};

export default Organization