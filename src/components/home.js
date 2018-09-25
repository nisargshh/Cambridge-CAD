import React from 'react';
import "./home.css"


export default class extends React.Component{
    render(){
        return(
            <div className="intro-text">
                This website is about the dispatches that are done through the CAD (Computer Aided Dispatch) in the city of Cambridge.
                The charts on this website will visualise all the different types of dispatches done through the CAD software, which department was primarily called,
                the type of dispatch that was called and many more.
            </div>
        )
    }
}