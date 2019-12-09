import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard'

class HomeScreen extends Component {
  state = {
    total: 0,
    data: [],
    pageNumber: 1,
    pageSize: 4,
  };

  componentWillMount() {
    this.fetchData(this.state.pageNumber);
  }

  fetchData = (pageNumber) => {
    fetch(`http://localhost:3001/api/posts?pageNumber=${pageNumber}&pageSize=${this.state.pageSize}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          data: data.data,
          total: data.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePageChange = (pageNumber) => {
    // fetch new data
    this.fetchData(pageNumber);

    // set state pageNumber
    this.setState({
      pageNumber: pageNumber,
    });
  };

  loadPrevPage = () => {
    if (this.state.pageNumber > 1) {
      this.fetchData(this.state.pageNumber - 1);
      this.setState({
        pageNumber: this.state.pageNumber - 1,
      });
    }
  };

  loadNextPage = () => {
    const numberOfPage = Math.ceil(this.state.total / this.state.pageSize);
    if (this.state.pageNumber < numberOfPage) {
      this.fetchData(this.state.pageNumber + 1);
      this.setState({
        pageNumber: this.state.pageNumber + 1,
      });
    }
  }

  render() {
    const numberOfPage = Math.ceil(this.state.total / this.state.pageSize);
    const pages = [];
    for (let i = 0; i < numberOfPage; i += 1) {
      pages.push(i + 1);
    }
    return (
      <div>
        <Navbar />

        <div className='container mt-5'>
          <div className='row'>
            {this.state.data.map((item) => {
              return (
                <div className='col-xs-12 col-md-6 col-lg-4 col-xl-3' key={item._id}>
                  <PostCard
                    imageUrl={`http://localhost:3001${item.imageUrl}`}
                    authorName={item.author.fullName}
                    content={item.content}
                  />
                </div>
              );
            })}
          </div>

          <nav aria-label="Page navigation example" className='mt-3 mb-5'>
            <ul className="pagination">
              <li className="page-item" onClick={this.loadPrevPage}>
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {pages.map((item) => {
                let className = 'page-item';
                if (item === this.state.pageNumber) {
                  className += ' active';
                }
  
                return (
                  <li className={className} key={item} onClick={() => {
                    this.handlePageChange(item);
                  }}>
                    <a className="page-link">{item}</a>
                  </li>
                );
              })}

              <li className="page-item" onClick={this.loadNextPage}>
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default HomeScreen;