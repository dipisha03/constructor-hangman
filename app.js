// Psuedo Code
// Create a hangman game with constructor functions that will give the user attempts to guess the word with a list of letters to guess from
// Must keep track of the user's guesses and prompt the user if they would like to end the game if no guesses remain

// Requires
const request = require('request');
const inquirer = require("inquirer");
const wordModule = require('./word.js');
const letterModule = require('./letter.js');

var letterObjArray = [];
// Array of words to choose from
const wordArray = ["cook", "spin", "travel", "music"];
// Creaing new instance of a word
var word = new wordModule.Word(wordArray)
// Chances
var chances = 6;
var wrongGuesses = [];

// hangman image
request('https://github.com/dipisha03/constructor-hangman/blob/master/hangman.txt', function(err, response, body) {
  console.log(body)
  gameStart()
});


function gameStart(){
  // Choosing word
  word.chooseWord()
  console.log(word.word)

  // Creating letter objects for each letter in the word and pushing them to an array.
  for (var i = 0; i < word.word.length; i ++) {
    var x = new letterModule.Letter(word.word[i]);
    letterObjArray.push(x);
  }
  inquirerPrompt()
}

function inquirerPrompt(){
  console.log(word.displayFunc(letterObjArray))
  if (chances > 0) {
    console.log(chances + " chances")
    inquirer.prompt([
      {
        message: "Guess a letter",
        name  : "letter"
      }
    ])
    .then(function(guess) {

      if (word.word.indexOf(guess.letter) == -1){
        if (wrongGuesses.indexOf(guess.letter) != -1) {
          console.log("you already guessed that letter!")
        } else {
          console.log("nope!")
          wrongGuesses.push(guess.letter);
          console.log("wrong letters: " + wrongGuesses)
          chances--;
        }
      };
      letterObjArray.forEach(element => {
        element.letterCheck(guess.letter)
      });
      if (word.displayFunc(letterObjArray) == word.word) {
        console.log("win!")
        
      } else {
        inquirerPrompt()
      }
      
    });
  } else {
    console.log("game over")
  } 
}