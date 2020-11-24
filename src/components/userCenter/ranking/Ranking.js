import React from 'react'

export default class Ranking extends React.Component{
    render() {
        return (
                <tr>
                    <td align="center">{this.props.id}</td>
                    <td align="center">{this.props.username}</td>
                    <td align="center">{this.props.score}</td>
                </tr>
        )
    }
}