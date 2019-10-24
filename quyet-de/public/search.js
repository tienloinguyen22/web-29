window.onload = () => {
  console.log('Search');

  document.querySelector('.search-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const searchValue = document.querySelector('.search-value').value;
    fetch(`/search-questions?search=${searchValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const result = document.querySelector('.search-result');
        result.innerHTML = '';
        for (const item of data.data) {
          const itemHTML = `
            <div>
              <p>${item.content}</p>
              <div>Like: ${item.like} | Dislike: ${item.dislike}</div>
              <hr />
            </div>
          `;
          result.insertAdjacentHTML('beforeend', itemHTML);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  });
};