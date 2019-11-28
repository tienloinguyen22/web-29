import React, { Component } from "react";
import RegisterBackground from '../static/images/register-background.jpg';
import './RegisterScreen.css';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    fullName: '',
    errorMessage: '',
    loading: false,
  };

  handleFullnameChange = (event) => {
    this.setState({
      fullName: event.target.value,
    });
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
    } else if (!this.state.fullName) {
      this.setState({
        errorMessage: 'Please input fullname',
      });
    } else {
      this.setState({
        errorMessage: '',
        loading: true,
      });

      // fetch
      fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          fullName: this.state.fullName,
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
            window.location.href = '/login';
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
              <label for="exampleInputPassword1">Fullname</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Nguyen Tien Loi"
                value={this.state.fullName}
                onChange={this.handleFullnameChange}
              />
            </div>
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
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
