import React from "react";

import 'antd/dist/antd.css';
import { Button } from 'antd';

class Btn extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            stateCode: props.stateCode,
            toFather: props.toFather
        };
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(){
        this.state.toFather(this.state.stateCode);
    }
    render() {
        return (
            <div>
                <Button ref="button" type="primary" onClick={this.clickHandler}> {this.state.stateCode === -1?"重新开始":"回到第"+(this.state.stateCode+1)+"步"} </Button>
            </div>
        )
    }
}

export default Btn;