import React, { Component } from 'react';
import Navbar from '../components/Navbar';

class HomeScreen extends Component {
  componentWillMount() {
    console.log('Be4 mount');
  }
  componentDidMount() {
    console.log('After mount');
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default HomeScreen;