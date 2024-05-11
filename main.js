//OBTAINED FROM: https://www.npmjs.com/package/wordlist-english
import wordlist from "wordlist-english"; //THIS IS USED AS A WORDBANK, IT CAN BE EDITED SO THAT THERE CAN BE PREFERRED WORDS

//BELOW ARE REQUIRED THROUGH INSTALLATION OF PACKAGES FOR THE CODE TO WORK
//IT IS NECESSARY DUE TO THE FACT THAT NODE.JS CANNOT BY DEFAULT RECIEVE INPUTS
//OBTAINED FROM: https://www.npmjs.com/package/inquirer
import select from "@inquirer/select";
import confirm from "@inquirer/confirm"; 




const man = [
  `\n
   _____       
   |   | 
   |   
   |  
   |  
   |_______
`,
  `\n
   _____       
   |   | 
   |   O 
   | 
   | 
   |_______
`,
  `\n
   _____       
   |   | 
   |   O 
   |   |
   | 
   |_______
`,
  `\n
   _____       
   |   | 
   |   O 
   |  /|
   |  
   |_______
`,
  `\n
   _____       
   |   | 
   |   O 
   |  /|\\
   |  
   |_______
`,
  `\n
   _____       
   |   | 
   |   O 
   |  /|\\
   |  /
   |_______
`,

  `\n
   _____       
   |   | 
   |   O 
   |  /|\\
   |  / \\
   |_______
`,
  `\n
   _____       
   |   | 
   |   x 
   |  /|\\
   |  / \\
   |_______
`,
];
const dialects = {
  american: wordlist["english/american"],
  australian: wordlist["english/australian"],
  british: wordlist["english/british"],
  canadian: wordlist["english/canadian"],
};

async function start() {
  const type = await select({
    message: "Select a English dialect:",
    choices: [
      {
        value: "American",
        description: "Uses English native in the United States",
      },
      {
        value: "Australian",
        description: "Uses English native in Australia",
      },
      {
        value: "British",
        description: "Uses English native in Great Britian",
      },
      {
        value: "Canadian",
        description: "Uses English native in Canada",
      },
    ],
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split``
    .map(
      (letter) =>
        new Object({ value: letter, description: `The letter ${letter}` })
    );
  const word = getWord(type).toUpperCase();
  if (await output(word, new Array(word.length).fill("_"), alphabet)) {
    console.log("YOU WON");
  } else console.log("YOU LOST");
  if (await confirm({ message: "Replay? " }))
    start();
}

async function output(correctAnswer, answerChoice, alphabet) {
  let correct, incorrect;
  correct = incorrect = 0;
  for (;;) {
    console.clear();
    console.log(man[incorrect]);
    console.log(answerChoice.join(""));
    if (correct == correctAnswer.length) return true;
    if (incorrect == 7 || alphabet == 0) return false;

    const answer = await select({
      message: "Select a letter:",
      choices: alphabet,
    });
    if (alphabet.length > 0) alphabet = alphabet.removeLetter(answer);

    let check = false;
    for (let i = 0; i < answerChoice.length; i++) {
      if (correctAnswer[i] == answer) {
        answerChoice[i] = answer;
        correct++;
        check = true;
      }
    }
    if (!check) incorrect++;
  }
}

//PROCEDURE CALLED REMOVE LETTER
//ONE PARAMETER
//CONTAINS SEQUENCING, SELECTION, ITERATION
Array.prototype.removeLetter = function (letter) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i].value == letter) continue;
    arr.push(this[i]);
  }
  return arr;
};

function getWord(type) {
  type = type.toLowerCase();
  let random = Math.floor(Math.random() * dialects[type].length);
  return dialects[type][random];
}

start(); //INITIALIZATION
