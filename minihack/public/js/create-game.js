window.onload = () => {
  const createGameForm = document.querySelector('.create-game');
  createGameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const player1 = createGameForm.player1.value;
    const player2 = createGameForm.player2.value;
    const player3 = createGameForm.player3.value;
    const player4 = createGameForm.player4.value;

    fetch(`/create-game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        players: [player1, player2, player3, player4],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.location.href = `/games/${data.data._id}`;
      })
      .catch((err) => {
        window.alert(err.message);
        console.log(err);
      });
  });
};