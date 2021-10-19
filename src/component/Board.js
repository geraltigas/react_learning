import React from "react";
import Block from "./Block";

const mapping = {
    0:' ',
    1:'X',
    2:'O'
}

class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isClickable: props.isClickable,
            stateArray: props.stateArray,
            whoStep: props.whoStep,
            toFather: props.toFather,
            aaaaaaa: false,
            getState: props.update,
            addBlock: props.addBlock,
            getBoard: props.getBoard,
            getParent: props.getParent,
        };
        this.child = {};
        this.childrenClick = this.childrenClick.bind(this);
        this.fromButton = this.fromButton.bind(this)
        let parent = this.state.getParent();
        this.state.getBoard(parent,this);
        // console.log('board')
        // console.log(this.state)
    }
    fromButton =  (ref) => {
        this.child.update = ()=>{ref.update();};
        this.child.posi  = ref.posi;
        this.state.addBlock(this.child.update, this.child.posi)
    }
    childrenClick(posi){
        this.props.toFather(posi)
    }
    render() {

        let parent = this.state.getParent();

        let blocklist = parent.state.newMap.map((data,index)=>{
            return <Block getChild={this.fromButton} ref="block" getGame={this.state.getParent} toFather={this.childrenClick} isClickable={!parent.state.gameOver} status={parent.state.newMap[index]} whoStep={parent.state.whoStep} posi={index}></Block>
        })
        return (
            <div className="Board">
                {blocklist}
            </div>
        )
    }
}

export default Board;