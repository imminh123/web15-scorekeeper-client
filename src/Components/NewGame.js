import React, { Component } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios'
import { ROOT_API} from '../Static/index'
export default class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: {
                player1: '',
                player2: '',
                player3: '',
                player4: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const toggleLoading = this.props.toggleLoading;
        toggleLoading(true);
        const newGame = {
            players: Object.keys(this.state.players).map(key => this.state[key]),
            scores: [[], [], [], []]
        }
        axios({
            url: `${ROOT_API}/api/game`,
            method: "POST",
            data: newGame
        }).then(response => {
            console.log(response.data);
            if (response.data.success) {
                window.location.href = `/game/${response.data.game._id}`
            }

        }).catch(error => {
            toggleLoading(false);
            console.log(error);
        });

    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input name="player1" placeholder="Player 1" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player2" placeholder="Player 2" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player3" placeholder="Player 3" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player4" placeholder="Player 4" onChange={this.handleInputChange} />
                </FormGroup>
                <Button color="warning" onSubmit={this.handleSubmit}>Create new game</Button>
            </Form>
        )

    }
}