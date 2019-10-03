window.onload = () => {
  const textareaElement = document.querySelector('.question-input');
  textareaElement.addEventListener('input', (event) => {
    console.log('Text changed');
  });
};