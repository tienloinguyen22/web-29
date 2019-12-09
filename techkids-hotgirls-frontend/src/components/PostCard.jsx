import React, { Component } from 'react';

// imageUrl
// authorName
// content
class PostCard extends Component {
  render() {
    return (
      <div className="card mt-3">
        <div 
          className='card-img-top'
          style={{
            height: '250px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeate',
            backgroundSize: 'cover',
            backgroundImage: `url(${this.props.imageUrl})`
          }}
        ></div>
        <div className="card-body">
          <h5 className="card-title">{this.props.authorName}</h5>
          <p 
            className="card-text"
            style={{
              height: '170px',
              overflow: 'hidden',
            }}
          >
            {this.props.content}
          </p>
        </div>
      </div>
    );
  }
}

export default PostCard;