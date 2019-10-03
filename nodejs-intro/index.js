const fs = require('fs');

// fs.readFile('./text.txt', {encoding: 'utf8'}, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// console.log('Read file success');

fs.watchFile('text.txt', (current, previous) => {
  console.log('File changed !!');
});
