window.onload = () => {
  let selectedQuestion;

  fetch('/get-random-question', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      selectedQuestion = data.data;
      document.querySelector('.question-content').innerText = data.data.content;
    })
    .catch((err) => {
      console.log(err);
      window.alert(err.message);
    });

  document.querySelector('.other-question').addEventListener('click', () => {
    window.location.reload();
  });

  document.querySelector('.vote-result').addEventListener('click', () => {
    window.location.href = `/questions/${selectedQuestion.id}`
  });

  const voteQuestion = (vote) => {
    fetch('/vote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: selectedQuestion.id,
        vote: vote,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        window.location.href = `/questions/${selectedQuestion.id}`
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });;
  };

  document.querySelector('.like').addEventListener('click', () => {
    voteQuestion('like');
  });
  document.querySelector('.dislike').addEventListener('click', () => {
    voteQuestion('dislike');
  });
};