<<<<<<< HEAD

=======
>>>>>>> e1545f5efaece7cf2f8bcecbd682828c4acecc91
function camelize(str) {
  let str1 = str.split('-');
  return str1.map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
}

