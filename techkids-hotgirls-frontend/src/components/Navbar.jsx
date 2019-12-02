import React, { Component } from "react";

class Navbar extends Component {
  state = {
    currentUser: undefined,
  };

  componentWillMount() {
    fetch('http://localhost:3001/api/auth/get-current-user', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({
            currentUser: data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLogout = () => {
    // fetch to /auth/logout
    fetch('http://localhost:3001/api/auth/logout', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          // clear authUser in state
          this.setState({
            currentUser: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });;
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Mindx
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {this.state.currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link">
                    Welcome, {this.state.currentUser.email}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={this.handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Log In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
