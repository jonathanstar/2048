// String.prototype.replaceChar = function(index, character){
//   return this.slice(0, index) + character + this.slice(index+1)
// }

Array.prototype.collide = function(movedPos, finalPos){
  var first = parseInt(this[movedPos]);
  var second = parseInt(this[finalPos]);
  this[finalPos] = (first + second).toString();
  this[movedPos] = "0";
}

Array.prototype.findNonZeroIndeces = function(){
  var indecesArray = []
  for (var i = 0; i < this.length; i++){
    if(this[i] !== "0"){
      indecesArray.push(i)
    }
  }
  return indecesArray;
}

Array.prototype.doCollisions = function(){
  var indecesArray = this.findNonZeroIndeces();
  for(var i = 0; i < indecesArray.length - 1; i++){
    if(this[indecesArray[i]] === this[indecesArray[i+1]]){
      this.collide(indecesArray[i+1], indecesArray[i]);
      i++;
    }
  }
}

function Game(boardString){
  this.boardArray = boardString.split("");
}

Game.prototype.toString = function(){
 return this.boardArray.slice(0, 4).join(" ") + "\n" + this.boardArray.slice(4, 8).join(" ") + "\n" + this.boardArray.slice(8, 12).join(" ") + "\n" + this.boardArray.slice(12).join(" ");
}



// Game.prototype.collide =  function(firstPos, secondPos){
//   first = parseInt(this.boardString[firstPos]);
//   second = parseInt(this.boardString[secondPos]);
//   this.boardString = this.boardString.replaceChar(secondPos, (first + second).toString());
//   this.boardString = this.boardString.replaceChar(firstPos, "0");
// }

Game.prototype.moveSquare = function(originalPos, newPos){
  if(this.boardArray[newPos] === "0"){
    this.boardArray[newPos] = this.boardArray[originalPos];
    this.boardArray[originalPos] = "0";
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
