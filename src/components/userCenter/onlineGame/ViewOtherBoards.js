import React from 'react'
import GridContainer from "../../GridContainer";

class ViewOtherBoards extends React.Component{

    render(){
        console.log(`ViewOtherBoards`);
        const otherBoard = this.props.otherBoards.map((item, idx) =>
            <div class="col-xs-3">
                <p>用户名: {item.username}; 分数: {item.score}</p>
                <GridContainer key={idx+item} showOthers={JSON.parse(JSON.stringify(item))} />
            </div>
        )

        return (
            <div class="container-fluid">
                <div class="row">
                    {otherBoard}
                </div>
            </div>
        )
    }
}

export default ViewOtherBoards;