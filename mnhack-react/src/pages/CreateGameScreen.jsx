import React, { Component } from 'react';

class CreateGameScreen extends Component {
  state = {
    players: ['', '', '', ''],
  };

  handlePlayerNameChange = (value, index) => {
    const newPlayers = [...this.state.players];
    newPlayers[index] = value;

    this.setState({
      players: newPlayers,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/create-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        players: this.state.players,
      })
    }).then((res) => {
      return res.json();
    })
      .then((data) => {
        this.props.history.push(`/games/${data.data._id}`);
      });
  };

  render() {
    return (
      <div className='container'>
        <form className='mt-5 create-game' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Player 1"
              name='player1'
              value={this.state.players[0]}
              onChange={(event) => {
                this.handlePlayerNameChange(event.target.value, 0);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Player 2"
              name='player2'
              value={this.state.players[1]}
              onChange={(event) => {
                this.handlePlayerNameChange(event.target.value, 1);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Player 3"
              name='player3'
              value={this.state.players[2]}
              onChange={(event) => {
                this.handlePlayerNameChange(event.target.value, 2);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Player 4"
              name='player4'
              value={this.state.players[3]}
              onChange={(event) => {
                this.handlePlayerNameChange(event.target.value, 3);
              }}
            />
          </div>
          <input type='submit' value='Create game' className='btn btn-primary'/>
        </form>
      </div>
    );
  }
}

export default CreateGameScreen;