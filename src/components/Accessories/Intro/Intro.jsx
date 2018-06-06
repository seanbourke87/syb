import React, { Component } from "react";

class Bubbles extends React.Component {
    bubbleMaker = () => {
        let bubbles = Array.apply(null, Array(13));

        const theBubbles = bubbles.map((bubble, index) => 
            <div key={index}></div>
        );

        return theBubbles;
    }

    render() {
        return (
            <div className="bubbles">
                {this.bubbleMaker()}
            </div>
        )
    }
}

const Intro = () =>
 <div className="intro">
    <p>Having worked within an agency for several years as well as inhouse for a growing company, <br />I consider myself an experienced team player.</p>
    <ul>
        <li>JS</li>
        <li>React</li>
        <li>HTML5</li>
        <li>SCSS</li>
        <li>PS</li>
    </ul>
    <Bubbles />
 </div>

 export default Intro;