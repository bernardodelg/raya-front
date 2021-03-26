import React, {Component} from "react";

class Loader extends Component{


    render(){

        if (this.props.property){
            return (
                // <div className="center-loader">
                //     <div className="loader-content"></div>
                // </div>
                <div id="loader-wrapper" >
                    <div id="loader"></div>
                </div>
            );
        }else{
            return (
                <div>
                  
                </div>
            );
        }
       
    }
}

export default Loader;