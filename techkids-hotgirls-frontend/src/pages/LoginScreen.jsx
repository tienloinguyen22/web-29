import React, { Component } from 'react';
import RegisterBackground from '../static/images/register-background.jpg';
import './LoginScreen.css';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // validate
    if (!this.state.email) {
      this.setState({
        errorMessage: 'Please input email',
      });
    } else if (!this.state.password) {
      this.setState({
        errorMessage: 'Please input password',
      });
    } else {
      this.setState({
        errorMessage: '',
        loading: true,
      });

      // fetch
      fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            this.setState({
              errorMessage: data.message,
              loading: false,
            });
          } else {
            window.location.href = '/';
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: error.message,
            loading: false,
          });
        });
    }
  };

  render() {
    return (
      <div style={{
        backgroundImage: `url(${RegisterBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        paddingTop: '164px',
      }}>
        <div className="container">
          <form className='register-form' onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Ex: tienloinguyen@gmail.com"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Input password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>

            <p className="text-danger">{this.state.errorMessage}</p>

            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Log In
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginScreen;