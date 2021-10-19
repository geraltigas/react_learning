import React from "react";

const mapping = {
    0:' ',
    1:'X',
    2:'O'
}

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickable: props.isClickable,
            status: props.status,
            whoStep: props.whoStep,
            posi: props.posi,
            getGame: props.getGame,
            fromFather: props.getChild
        };
        this.state.fromFather({update: ()=>{this.update()},posi: this.state.posi});
        this.clickHandler = this.clickHandler.bind(this);
        this.update = this.update.bind(this);
        this.state.getGame().update = () => {this.update();return};
    }
    clickHandler(e){
        if (!this.state.getGame().state.gameOver && this.state.getGame().state.newMap[this.state.posi] === 0){
            this.setState({
                status: this.state.getGame().state.whoStep
                });
                this.props.toFather(this.state.posi);
        }else{
            return;
        }
    }
    update(){
        this.setState({
            isClickable: !this.state.getGame().state.gameOver && this.state.getGame().state.newMap[this.state.posi] === 0,
            status: this.state.getGame().state.newMap[this.state.posi],
        })
        if (this.state.getGame().state.isFresh){
            setTimeout(this.setState({
                isClickable: !this.state.getGame().state.gameOver && this.state.getGame().state.newMap[this.state.posi] === 0,
                status: this.state.getGame().state.newMap[this.state.posi],
            }),50)

        }
    }
    render() {
        return (
            <div className="Block" onClick={this.clickHandler}>{mapping[this.state.status]}</div>
        )
    }
}

export default Block;