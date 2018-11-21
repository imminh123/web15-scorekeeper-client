import React, { Component } from 'react';
import logo from './logo.svg';
import Message from "./Message";
import Button from "./Button";
import './App.css';
import NewGame from "./Components/NewGame";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import axios from 'axios';
import PlayGame from './Components/PlayGame';
import Loading from './Components/Loading'
import { ROOT_API} from './Static/index'

class App extends Component {

  // constructor(props){
  //   super(props);

  // }

  state = {
    showImg: true,
    message: "Hello World",
    num: 0,
    game: null,
    loading: true
  }

  componentWillMount() {
    console.log('Will mount')
  }

  componentDidMount() {
    console.log('Did mount')
    if (window.location.pathname) {
      const pathParams = window.location.pathname.slice(1).split('/');
      // console.log(pathParams);
      if (pathParams[1] && pathParams[0] === "game") {
        const questionId = pathParams[1];
        axios({
          url: `${ROOT_API}/api/game/${questionId}`,
          method: "GET",
        })
          .then(response => {
            console.log(response.data);
            if (response.data.success) {
              setTimeout(() => {
                this.setState({ game: response.data.game, loading: false });
              }, 2000);

            }
          })
          .catch(error => {
            console.log(error);
            this.setState({ game: null, loading: false })
          });
      } else {
        this.setState({ game: null, loading: false })
      }
    }
  }

  addNewRow = () => {
    const {game} = this.state;
    game.scores = game.scores.map(score => [...score, 0]);
    this.setState({loading :  true});
    axios({
      url: `${ROOT_API}/api/game`,
      method: "PUT",
      data: {
        gameId: game._id,
        scores: game.scores
      }
    })
    .then(response => {
      console.log(response);
      this.setState({loading: false, game});
    })
    .catch(error => {
      console.log(error);
      this.setState({loading: false});
    })
    this.setState({ game });
  }

  updateScore = (score, playerIndex, rowIndex) => {
    const {game} = this.state;
    game.scores[playerIndex][rowIndex] = score;

    axios({
      url: `${ROOT_API}/api/game`,
      method: "PUT",
      data: {
        gameId: game._id,
        scores: game.scores
      }
    })
    .then(response => {
      console.log(response);
      this.setState({loading: false, game});
    })
    .catch(error => {
      console.log(error);
      this.setState({loading: false});
    })
    this.setState({ game });
  }
  render() {
    const { game, loading } = this.state;
    console.log()
    console.log("Render");
    return (
      <Container className="App">
        <Header />
        {loading ?
          <div className="text-center">
            <Loading />
          </div> : (game ? <PlayGame game={game} addNewRow={this.addNewRow} updateScore={this.updateScore} /> : <NewGame toggleLoading={(loading) => {this.setState({loading}) }} />)
        }
      </Container>
    );
  }
}

export default App;
