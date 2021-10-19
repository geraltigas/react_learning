import React from "react";

import Board from "./Board";
import Display from "./Display";
import ButtonArray from "./ButtonArray";

function update(hhh){
        return hhh.state.stateArray[hhh.state.stateArray.length-1]
}

class Game extends React.Component{
    constructor(props) {
        super(props);
        let board = [
            0,0,0,
            0,0,0,
            0,0,0
        ];
        this.state = {
            board: board,
            whoStep: 1,
            gameOver: false,
            gameStep: -1,
            stateArray: [board],
            newMap: board,
            allChildFunc: [],
            isFresh: false
        }
        this.childrenBoardClick = this.childrenBoardClick.bind(this)
        this.childrenButtonArrayClick = this.childrenButtonArrayClick.bind(this)
        this.getState = this.getState.bind(this)
        this.getParent = this.getParent.bind(this)
        this.addBlock = this.addBlock.bind(this);
        this.getBoard = this.getBoard.bind(this)
    }
    childrenBoardClick(posi){
        this.setState((state) => {
            let tempboard = [];
            for (var i = 0; i < 9;++i){
                tempboard.push(state.board[i])
            }
            tempboard[posi] = state.whoStep;
            let tempwhoStep = state.whoStep === 1 ? 2 : 1;
            let tempgamestep = state.gameStep + 1;
            let temparray = state.stateArray;
            let tempgameover;
            temparray.push(tempboard);
            while (temparray.length !== tempgamestep+2){
                if (temparray > tempgamestep+2) temparray.push(tempboard);
                else temparray.pop()
            }
            tempgameover = false;
            let vector = [Math.floor(posi/3),posi%3]
            if (vector[0] + vector[1] === 2 || vector[0] === vector[1]){
                if (tempboard[2] === tempboard[4] && tempboard[6] === tempboard[4] && tempboard[4] !== 0){
                    tempgameover = true
                }
                if (tempboard[0] === tempboard[4] && tempboard[8] === tempboard[0] && tempboard[4] !== 0){
                    tempgameover = true
                }
            }
            for (let i = 0; i < 3 ; ++i){
                if (tempboard[i] === tempboard[3+i] && tempboard[6+i] === tempboard[i] && tempboard[i] !== 0){
                    tempgameover = true
                }
            }
            for (let i = 0; i < 3 ;++i){
                if (tempboard[i*3] === tempboard[1+3*i] && tempboard[2+3*i] === tempboard[3*i] && tempboard[i*3] !== 0){
                    tempgameover = true
                }
            }
            return {
            board: tempboard,
            whoStep: tempwhoStep,
            gameOver: tempgameover,
            gameStep: tempgamestep,
            stateArray: state.stateArray,
                newMap: temparray[temparray.length-1],
                isFresh: true
            }})
    }
    getState() {
        return update(this)
    }
    getBoard(father,child) {
        father.ooo = child.forceUpdate;
        return;
    }
    getParent(){
        return this
    }
    addBlock(func,posi){
        this.setState((state)=>{
            return  {
                allChildFunc: [...state.stateArray,func]
            }
        }
        )
    }
    childrenButtonArrayClick(stateCode){
        // console.log('调了')
        console.log(stateCode)
        this.setState((state)=>{
            return {
            board: [...state.stateArray[stateCode + 1]],
                whoStep: (stateCode+1)%2 == 0 ? 1 : 2,
                gameOver: false,
                gameStep: stateCode,
                newMap: [...state.stateArray[stateCode + 1]],
                stateArray: (() => {
                    let temp = [...state.stateArray];
                    while(temp.length !== stateCode+2){
                        temp.pop();
                    }
                    return temp
                })()
        }
        })
    }
    render() {
        console.log([...this.state.newMap])
        return (
            <div className="Game">
                <Board ref="board" getBoard={this.getBoard} addBlock={this.addBlock} getParent={this.getParent} update={this.getState} stateArray={[...this.state.newMap]} isClickable={!this.state.gameOver} toFather={this.childrenBoardClick.bind(this)} whoStep={this.state.whoStep}/>
                <div className="SideBar">
                    <Display getParent={this.getParent} whoStep={this.state.whoStep} gameOver={this.state.gameOver}/>
                    <ButtonArray getGame={this.getParent} gameStep={this.state.gameStep} toFather={this.childrenButtonArrayClick}/>
                </div>
            </div>
        )
    }
}

export default Game;