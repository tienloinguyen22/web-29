window.onload = () => {
  // Get question by ID
  const urlPaths = window.location.pathname.split('/');
  const questionId = urlPaths[urlPaths.length - 1];

  fetch(`/get-question-by-id/${questionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector('.question-content').innerText = data.data.content;
      document.querySelector('.total-votes').innerText = `${data.data.like + data.data.dislike}`;

      if (data.data.like === 0 && data.data.dislike === 0) {
        document.querySelector('.like-percent').innerText = '50%';
        document.querySelector('.dislike-percent').innerText = '50%';
      } else {
        const likePercent = (data.data.like / (data.data.like + data.data.dislike) * 100).toFixed(2);
        const dislikePercent = 100 - Number(likePercent);

        document.querySelector('.like-percent').innerText = `${likePercent}%`;
        document.querySelector('.dislike-percent').innerText = `${dislikePercent}%`;
      }
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });
}