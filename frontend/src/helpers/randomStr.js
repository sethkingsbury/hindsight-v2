const createGameCode = () => {
  const list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var code = '';
  for (var i = 1; i < 5; i++) {
    var charIndex = Math.floor(Math.random() * list.length);
    code += list.charAt(charIndex);
  }
  return code;
};

export { createGameCode };
