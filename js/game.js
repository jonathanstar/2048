// String.prototype.replaceChar = function(index, character){
//   return this.slice(0, index) + character + this.slice(index+1)
// }

var transpose = function(array){
  var transposed = [];
  for(var i = 0; i < array.flatten().length; i++){
    var x =  Math.floor(i / array.length);
    var y = i % array[0].length;
    if(y === 0){
      transposed.push([]);
    }
    transposed[x].push(array[y][x]);
  }
  return transposed;
}

Array.prototype.flatten = function(){
  return [].concat.apply([], this);
}

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
  return this;
}

Array.prototype.stackSquares = function(){
  var arr = this.filter(function(x){
    return x!=="0"
  })
  for(var i = arr.length; i < 4; i++){
    arr.push("0")
  }
  return arr;
}

function Game(boardString){
  this.boardArray = boardString.split("");
}

Game.prototype.toString = function(){
 return this.boardArray.slice(0, 4).join(" ") + "\n" + this.boardArray.slice(4, 8).join(" ") + "\n" + this.boardArray.slice(8, 12).join(" ") + "\n" + this.boardArray.slice(12).join(" ");
}

Game.prototype.moveSquare = function(originalPos, newPos){
  if(this.boardArray[newPos] === "0"){
    this.boardArray[newPos] = this.boardArray[originalPos];
    this.boardArray[originalPos] = "0";
  } else {
    console.log("newPos not empty");
  }
}

Game.prototype.moveLeft = function(){
  var newBoard = [];
  for(var i = 0; i < this.boardArray.length; i+=4){
    newBoard.push(this.boardArray.slice(i, i+4).doCollisions().stackSquares());
  }
  this.boardArray = newBoard.flatten();
}

Game.prototype.moveRight = function(){
  var newBoard = [];
  for(var i = 0; i < this.boardArray.length; i+=4){
    newBoard.push(this.boardArray.slice(i, i+4).reverse().doCollisions().stackSquares().reverse());
  }
  this.boardArray = newBoard.flatten();
}

Game.prototype.moveUp = function(){
  var newBoard = [];
  var matrixBoardArray = [];
  for(var i = 0; i < this.boardArray.length; i+=4){
    matrixBoardArray.push(this.boardArray.slice(i, i+4))
  }
  var transposedBoardArray = transpose(matrixBoardArray).flatten();
  for(var i = 0; i < transposedBoardArray.length; i+=4){
    newBoard.push(transposedBoardArray.slice(i, i+4).doCollisions().stackSquares());
  }
  this.boardArray = transpose(newBoard).flatten();
}

Game.prototype.moveDown = function(){
  var newBoard = [];
  var matrixBoardArray = [];
  for(var i = 0; i < this.boardArray.length; i+=4){
    matrixBoardArray.push(this.boardArray.slice(i, i+4))
  }
  var transposedBoardArray = transpose(matrixBoardArray).flatten().reverse();
  for(var i = 0; i < transposedBoardArray.length; i+=4){
    newBoard.push(transposedBoardArray.slice(i, i+4).doCollisions().stackSquares());
  }
  this.boardArray = transpose(newBoard).flatten().reverse();
}
