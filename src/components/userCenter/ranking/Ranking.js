import React from 'react'

export default class Ranking extends React.Component{
    render() {
        return (
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.username}</td>
                    <td>{this.props.score}</td>
                </tr>
        )
    }
}