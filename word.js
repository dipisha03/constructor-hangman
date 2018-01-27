function Word (wordArray) {
  this.word = "";
  this.wordArray = wordArray;
  this.chooseWord = function () {
   // Choosing word based on random number.
    this.word = wordArray[Math.floor(Math.random() * this.wordArray.length)];
  } 
  this.displayFunc = function (arr) {
    var displayArray = [];
    arr.forEach(element => {
      displayArray.push(element.display);
    });
    return displayArray.join("");
  }
}

module.exports = {
  Word
};