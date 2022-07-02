import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "./Organization.css"
import p1 from "../../assets/HomePages_img/dev.jpg"
import p2 from "../../assets/HomePages_img/dek.jpg"
import p3 from "../../assets/HomePages_img/elca.jpg"
import p4 from "../../assets/HomePages_img/shoppe.png"

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


const Organization = () => {
    return (
        <div id="organization" className="organization">
            <span className="or-title">Accompany enterprises</span>
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

export default Organization