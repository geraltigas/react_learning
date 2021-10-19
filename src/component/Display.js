import React from "react";

const mapping = {
    0:' ',
    1:'X',
    2:'O'
}

class Display extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            whoStep: props.whoStep,
            gameOver: props.gameOver,
            getParent: props.getParent,
        };
    }
    render() {
        let text = ''
        if (this.props.getParent().state.gameOver){
            text = 'Winner: ' + (mapping[this.props.getParent().state.whoStep] === 'X' ? 'O':'X');
        }else{
            text = 'Next:' + mapping[this.props.getParent().state.whoStep];
        }
        if (this.props.getParent().state.gameStep === 8){
            text= 'Draw!'
        }
        return (
            <div>
                {text}
            </div>
        )
    }
}

export default Display;
