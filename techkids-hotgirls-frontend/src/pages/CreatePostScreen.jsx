import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import './CreatePostScreen.css';

class CreatePostScreen extends Component {
  state = {
    content: '',
    imageFile: undefined,
    base64Image: '',
    loading: false,
    errorMessage: '',
  };

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imageFile: imageFile,
          base64Image: reader.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    // fetch upload file
    const formData = new FormData();
    formData.append('image', this.state.imageFile);
    fetch('http://localhost:3001/api/uploads/image', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          this.setState({
            loading: false,
            errorMessage: data.message,
          });
        } else {
          // fetch create post
          fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              content: this.state.content,
              imageUrl: data.data.imageUrl,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              if (!responseData.success) {
                this.setState({
                  loading: false,
                  errorMessage: responseData.message,
                });
              } else {
                window.location.href = '/';
              }
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                loading: false,
                errorMessage: err.message,
              });
            });
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

  render() {
    return (
      <div>
        <Navbar />

        <div className='container mt-5'>
          <h2>Create a new post</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Image:</label>
              <div className='preview' style={{
                backgroundImage: `url(${this.state.base64Image})`
              }}>
                {this.state.base64Image ? null : (
                  <div>Select your favorite image ...</div>
                )}
              </div>
              <input
                type='file'
                className='btn btn-outline-primary file-input'
                onChange={this.handleFileChange}
              />
            </div>

            <div className='caption-container'>
              <label>Caption:</label>
              <div>
                <textarea
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  className='form-control'
                  rows='6'
                  placeholder='Describe your image...'
                ></textarea>
              </div>
            </div>

            <p className="text-danger">{this.state.errorMessage}</p>

            <div className='mb-5 mt-2'>
              {this.state.loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePostScreen;