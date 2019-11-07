window.onload = () => {
  const paths = window.location.pathname.split('/');
  const gameId = paths[paths.length - 1];
  const tableHeadEle = document.querySelector('.thead');
  const tableBodyEle = document.querySelector('.tbody');
  let gameInfo;

  const calculateSos = (scores) => {
    let sos = 0;
    let playersSos = [0, 0, 0, 0];

    for (let i = 0; i < scores.length; i += 1) {
      for (let j = 0; j < scores[i].length; j += 1) {
        sos += scores[i][j];
        playersSos[j] += scores[i][j];
      }
    }

    return {
      sos: sos,
      playersSos: playersSos,
    };
  };

  document.querySelector('.add-round').addEventListener('click', () => {
    // add round to html
    gameInfo.scores.push([0, 0, 0, 0]);
    const i = gameInfo.scores.length - 1;
    const newRound = `
      <tr>
        <th scope="col">Round ${i + 1}</th>
        <th scope="col">
          <input class='form-control round${i}' data-position='${i}-0' type='number' value='0'/>
        </th>
        <th scope="col">
          <input class='form-control round${i}' data-position='${i}-1' type='number' value='0' />
        </th>
        <th scope="col">
          <input class='form-control round${i}' data-position='${i}-2' type='number' value='0' />
        </th>
        <th scope="col">
          <input class='form-control round${i}' data-position='${i}-3' type='number' value='0' />
        </th>
      </tr>
    `;
    tableBodyEle.insertAdjacentHTML('beforeend', newRound);

    const roundInputs = document.getElementsByClassName(`round${i}`);
    for (const element of roundInputs) {
      element.addEventListener('input', (event) => {
        const newScore = event.target.value;
        const position = event.target.getAttribute('data-position').split('-');
        // update db
        fetch('/update-scores', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: gameInfo._id,
            score: Number(newScore),
            row: Number(position[0]),
            col: Number(position[1]),
          }),
        });

        // update sos
        gameInfo.scores[Number(position[0])][Number(position[1])] = Number(newScore);
        const newSos = calculateSos(gameInfo.scores);
        document.querySelector('.sos').innerText = `Sum of scores(${newSos.sos})`;
        document.querySelector('.sos0').innerText = newSos.playersSos[0];
        document.querySelector('.sos1').innerText = newSos.playersSos[1];
        document.querySelector('.sos2').innerText = newSos.playersSos[2];
        document.querySelector('.sos3').innerText = newSos.playersSos[3];
      });
    }

    // fetch to server
    fetch('/add-round', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: gameInfo._id,
      }),
    });
  });

  fetch(`/get-game-by-id?id=${gameId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      gameInfo = data.data;
      const players = data.data.players;
      const playersRow = `
        <tr>
          <th scope="col">#</th>
          <th scope="col">${players[0]}</th>
          <th scope="col">${players[1]}</th>
          <th scope="col">${players[2]}</th>
          <th scope="col">${players[3]}</th>
        </tr>
      `;
      tableHeadEle.insertAdjacentHTML('beforeend', playersRow);

      const scores = data.data.scores;
      const sosResult = calculateSos(scores);
      const sosRow = `
        <tr>
          <th class='sos' scope="col">Sum of scores(${sosResult.sos})</th>
          <th class='sos0' scope="col">${sosResult.playersSos[0]}</th>
          <th class='sos1' scope="col">${sosResult.playersSos[1]}</th>
          <th class='sos2' scope="col">${sosResult.playersSos[2]}</th>
          <th class='sos3' scope="col">${sosResult.playersSos[3]}</th>
        </tr>
      `;
      tableBodyEle.insertAdjacentHTML('beforeend', sosRow);

      for (let i = 0; i < data.data.scores.length; i += 1) {
        const round = data.data.scores[i];
        const roundRow = `
          <tr>
            <th scope="col">Round ${i + 1}</th>
            <th scope="col">
              <input class='form-control round${i}' data-position='${i}-0' type='number' value='${round[0]}'/>
            </th>
            <th scope="col">
              <input class='form-control round${i}' data-position='${i}-1' type='number' value='${round[1]}' />
            </th>
            <th scope="col">
              <input class='form-control round${i}' data-position='${i}-2' type='number' value='${round[2]}' />
            </th>
            <th scope="col">
              <input class='form-control round${i}' data-position='${i}-3' type='number' value='${round[3]}' />
            </th>
          </tr>
        `;
        tableBodyEle.insertAdjacentHTML('beforeend', roundRow);

        const roundInputs = document.getElementsByClassName(`round${i}`);
        for (const element of roundInputs) {
          element.addEventListener('input', (event) => {
            const newScore = event.target.value;
            const position = event.target.getAttribute('data-position').split('-');
            // update db
            fetch('/update-scores', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: gameInfo._id,
                score: Number(newScore),
                row: Number(position[0]),
                col: Number(position[1]),
              }),
            });

            // update sos
            gameInfo.scores[Number(position[0])][Number(position[1])] = Number(newScore);
            const newSos = calculateSos(gameInfo.scores);
            document.querySelector('.sos').innerText = `Sum of scores(${newSos.sos})`;
            document.querySelector('.sos0').innerText = newSos.playersSos[0];
            document.querySelector('.sos1').innerText = newSos.playersSos[1];
            document.querySelector('.sos2').innerText = newSos.playersSos[2];
            document.querySelector('.sos3').innerText = newSos.playersSos[3];
          });
        }
      }
    })
    .catch((err) => {
      window.alert(err.message);
      console.log(err);
    });
};