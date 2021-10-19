import React from "react";
import Btn from "./Button";

class ButtonArray extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            return: -1,
            stateCode: props.gameStep,
            getGame: props.getGame,
            toFather: props.toFather,
        };
        this.childrenButtonClick = this.childrenButtonClick.bind(this);
    }
    childrenButtonClick(stateCode) {
        this.state.toFather(stateCode)
    }
    render() {
        let Array = [-1];
        for (let i = 0; i < this.state.getGame().state.gameStep ; ++i){
            Array.push(i);
        }
        let buttonArray = Array.map((data,index) => {
            return <Btn key={index-1} stateCode={index-1} toFather={this.childrenButtonClick}></Btn>
        })
        return(
            <div>
                {buttonArray}
            </div>

        )
    }
}

export default ButtonArray;