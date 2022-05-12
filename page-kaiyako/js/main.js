const myCode = [
  ["q", "ah"],
  ["w", "&#658;"],
  ["e", "h"],
  ["r", "z"],
  ["t", "g"],
  ["y", "j"],
  ["u", "ch"],
  ["i", "ih"],
  ["o", "eh"],
  ["p", "r"],
  ["[", "b"],
  ["]", "bwa"],
  ["a", "m"],
  ["s", "ktl"],
  ["d", "s"],
  ["f", "oh"],
  ["g", "aa"],
  ["h", "k"],
  ["j", "t"],
  ["k", "v"],
  ["l", "n"],
  [";", "d"],
  ["'", "f"],
  ["z", "oo"],
  ["x", "ee"],
  ["c", "l"],
  ["v", "p"],
  ["b", "y"],
  ["n", "th"],
  ["m", "w"],
  [".", "uh"],
  [",", "sh"],
  ["/", "."],
  [" ", "ERRORNOSPACESACCEPTED"]
]
let changeDetector;
let textAreaInput = "";
let currentWord;
//-----TEMP
let loopCount = 0;
function count(){
  loopCount++;
}
let decodeToggler = true;
//-----TEMP

window.onload = function(){
  //
  $("#input").append("qwer\ntyui ")
  //
  decodeToggler = document.getElementById("decode-toggler").checked;
  textAreaInput = $("#input").val();
  hasChanged();
  setInterval(loop, 200);
  document.body.onkeypress= function(e){
    if(e.keyCode == 32){
      decode("eocf jz n. mpc;");
    }
  }
}

function loop(){
  if(textAreaInput !== $("#input").val()){
    textAreaInput = $("#input").val();
    hasChanged();
  }else if(decodeToggler !== document.getElementById("decode-toggler").checked){
    hasChanged()
    decodeToggler = document.getElementById("decode-toggler").checked;
  }

}

//-----WIP-----
function hasChanged(){
  lastChar = textAreaInput.charAt(textAreaInput.length - 1);
  if(document.getElementById("decode-toggler").checked){
    printToPage(decode($("#input").val()));

  }
  // log(`loop ${loopCount}`, "s");
}
//-----/WIP-----

function decode(input){
  // log(`decoding '${input}'`, "t")
  let output = [];
  //---delete this I think
  let presWord = 0;
  //---delete this I think


  //-----Put words into an array
  const words = separateWords(input);

  // log(`Arrayed words is`, "s");
  // log(words, "s");

  //-----WIP-----
  //-----Translate words
  for(let i=0; i<words.length; i++){
    count();
    if(words[i] === "\n"){
      // log("newline")
      output.push(["\n", "<br>"])
    }else if(words[i] === " "){
      output.push([words[i], ""]);
    }else{
      let myWord = findMatch(words[i]);
      if(myWord === null){
        //-----if there is no match in the word bank
        myWord = decodeWord(words[i]);
        output.push([words[i], myWord, "word"]);
      }else{
        output.push([words[i], myWord[1], myWord[2]]);
      }
    }
  }


  // log(`Output is`, "t");
  // log(output, "s");
  return output;
  //-----/WIP-----

}
//-----WIP-----
let temp
let string = "123"
function separateWords(input){
  let output = [];
  let presWord = 0;
  for(let i=0; i<input.length; i++){
    count();
    if(output[presWord] == undefined){output[presWord] = ""}
    if(input.charAt(i) === " "){
      presWord++
      output[presWord] = input.charAt(i);
      presWord++
    }else if(input.charAt(i) === "\n"){
      presWord++
      output[presWord] = input.charAt(i);
      presWord++
    }else{
      output[presWord] += input.charAt(i);
    }
  }


  // console.log(output)
  return output
}
// separateWords("one\ntwo three")

function findMatch(input, type){
  // log(`finding match for ${input}`)
  // temp = input;
  if(input === undefined){input = "DEFAULT";log(`input of findMatch is undefined`)}
  if(type == "k-e" || type == undefined){
    //if kaiyako to english
    let hasMatch = false;
    for(let i=0; i<wordCode.length; i++){
      count();
      if(input === wordCode[i][0]){
        hasMatch = true;
        return [wordCode[i][0], wordCode[i][1], wordCode[i][2], i]
      }
    }
    if(hasMatch == false){
      return null;
    }
  }
}
//-----/WIP-----

function decodeWord(input, type){
  if(input === undefined){input = "DEFAULT";log(`input of decodeWord is undefined`)}
  let output = "";
  say(`decoding '${input}'`)
  if(input === " "){
    say(`output is '${output}'`)
    return "";
  }
  if(type == "k-e" || type == undefined){
    for(let i=0; i<input.length; i++){
      count();
      let hasMatch = false;
      for(let j=0; j<myCode.length; j++){
        count();
        if(input.charAt(i) == myCode[j][0]){
          output += myCode[j][1];
          hasMatch = true;
          break;
        }
      }
      if(hasMatch == false){
        output += "-";
      }
    }
  }
  return output;
}
function printToPage(input){
  log(`Tying to print`, "t")
  log(input, "s")
  let output = "";
  for(let i=0; i<input.length; i++){
    // console.info(`printing ${input[i][0]}`)

    count();
    if(input[i][2] !== undefined){
      output += `<span class="${input[i][2]}">${input[i][1]}</span>`;
    }else{
      output += input[i][1];
    }

  }
  say(output)
  $("#output").empty();
  $("#output").html(output);
}




//DEBUGGING
function log(input, type){
  if(type === "s"){
    console.log(input);
  }else if(type === "t"){
    //do this if title
    console.log(`-----${input}------`);
  }else{
    console.log("-----");
    console.log(input);
  }

}
function say(input){
  input = JSON.stringify(input)
  input = input.substring(1);
  input = input.substring(0, input.length - 1);
  console.log(input);
}
