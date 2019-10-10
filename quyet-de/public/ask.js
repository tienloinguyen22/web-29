window.onload = () => {
  const textareaElement = document.querySelector('.question-input');
  textareaElement.addEventListener('input', (event) => {
    const value = textareaElement.value;
    const remainCharacters = 200 - value.length;
    
    const remainCharactersElement = document.querySelector('.remain-characters');
    remainCharactersElement.innerText = `Còn ${remainCharacters}/200 kí tự`;
  });

  const formElement = document.querySelector('.create-question-form');
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = textareaElement.value;

    if (!value) {
      // show error message
      const errorMessageElement = document.querySelector('.error-message');
      errorMessageElement.innerText = `Vui lòng nhập câu hỏi`;
    } else {
      const errorMessageElement = document.querySelector('.error-message');
      errorMessageElement.innerText = ``;

      // send req to server
      fetch(`/create-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionContent: value,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          window.location.href = `/questions/${data.data.id}`;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};