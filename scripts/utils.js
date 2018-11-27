var fileLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

/*
 * This function converts the letters used to denote files into
 * numbers that can be used for loops. 1 returns "a", and 8
 * returns "h".
 */
function toLetter(number) {
  return fileLetters[number - 1];
}

/*
 * Does the opposite of toLetter()
 */
function toNumber(letter) {
  return fileLetters.indexOf(letter) + 1;
}