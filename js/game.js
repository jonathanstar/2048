String.prototype.replaceChar = function(index, character){
  return this.slice(0, index) + character + this.slice(index+1)
}

String.prototype.collide = function(movedPos, finalPos){
  var first = parseInt(this[movedPos]);
  var second = parseInt(this[finalPos]);
  var str = this.replaceChar(finalPos, (first + second).toString());
  var str = str.replaceChar(movedPos, "0");
  return str;
}

String.prototype.findNonZeroIndeces = function(){
  var indecesArray = []
  for (var i = 0; i < this.length; i++){
    if(this[i] !== "0"){
      indecesArray.push(i)
    }
  }
  return indecesArray;
}

String.prototype.doCollisions = function(){
  var str = this.valueOf();
  var indecesArray = this.findNonZeroIndeces();
  for(var i = 0; i < indecesArray.length - 1; i++){
    if(str[indecesArray[i]] === str[indecesArray[i+1]]){
      str = str.collide(indecesArray[i+1], indecesArray[i]);
      i++;
    }
  }
  return str;
}

function Game(boardString){
  this.boardString = boardString;
}

Game.prototype.toString = function(){
 return this.boardString.slice(0, 4) + "\n" + this.boardString.slice(4, 8) + "\n" + this.boardString.slice(8, 12)+ "\n" + this.boardString.slice(12);
}



// Game.prototype.collide =  function(firstPos, secondPos){
//   first = parseInt(this.boardString[firstPos]);
//   second = parseInt(this.boardString[secondPos]);
//   this.boardString = this.boardString.replaceChar(secondPos, (first + second).toString());
//   this.boardString = this.boardString.replaceChar(firstPos, "0");
// }

Game.prototype.moveSquare = function(originalPos, newPos){
  if(this.boardString[newPos] === "0"){
    this.boardString = this.boardString.replaceChar(newPos, this.boardString[originalPos]);
    this.boardString = this.boardString.replaceChar(originalPos, "0");
  } else {
    console.log("newPos not empty");
  }
}


Game.prototype.moveLeft = function(){

}

Game.prototype.moveRight = function(){

}

Game.prototype.moveUp = function(){

}

Game.prototype.moveDown = function(){

}
