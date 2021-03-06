import React, { Component } from 'react';
import { Table, Input, Button } from 'reactstrap';
import axios from 'axios'

export default class PlayGame extends Component {
    renderPlayer = (players) => {
        return players.map((player, index) => <th key={index}>{player}</th>)
    }

    renderSumScores = (scores) => {
        return (
            <tr>
                <th>Sum of score</th>
                {scores.map(scorePlayer => (
                    <th>{scorePlayer.reduce((total, score) => total+ Number(score), 0)}</th>
                ))}
            </tr>
        )
    }

    renderScoreRow = (scores) => {
        const updateScore = this.props.updateScore;
        return scores[0].map((score, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><Input
                        value={scores[0][index]}
                        onChange={(event) => {updateScore(event.target.value, 0, index)}}
                        type="number" /></td>
                    <td><Input
                        value={scores[1][index]}
                        onChange={(event) => {updateScore(event.target.value, 1, index)}}
                        type="number" /></td>
                    <td><Input
                        value={scores[2][index]}
                        onChange={(event) => {updateScore(event.target.value, 2, index)}}
                        type="number" /></td>
                    <td><Input
                        value={scores[3][index]}
                        onChange={(event) => {updateScore(event.target.value, 3, index)}}
                        type="number" /></td>
                </tr>
            )
        })
    }
    render() {
        const game = this.props.game;
        const scores = game.scores;
        const { players } = game;
        const addNewRow = this.props.addNewRow;
        console.log(game);

        return (
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th></th>
                            {this.renderPlayer(players)}
                        </tr>
                        {this.renderSumScores()}
                    </thead>
                    <tbody>
                        {this.renderScoreRow(scores)}
                    </tbody>
                </Table>
                <div className="text-center mb-3">
                    <Button onClick={addNewRow} color="danger" type="submit">
                        Add row
                    </Button>
                </div>
            </div>
        )
    }
}
