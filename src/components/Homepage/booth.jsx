import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "./Organization.css"

const slides = [
    {
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: ''
    },
    {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: ''
    },
    {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: ''
    },
    {
        url: "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: ''
    },
];

const Booth = () => {
    return (
        <div id="booth" className="organization">
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