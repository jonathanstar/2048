String.prototype.replaceChar = function(index, character){
  return this.slice(0, index) + character + this.slice(index+1)
}

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
  });
  for(var i = arr.length; i < 4; i++){
    arr.push("0")
  }
  return arr;
}

var randomIndex = function(max, min){
  return Math.floor(Math.random() * (max - min) + min)
}

var setRandomBoardNumberArray = function(){
  var array = [];
  for(var i = 0; i < 9; i++){
    array.push("2");
  }
  array.push("4");
  return array;
}

function Game(string){
  this.randomBoardNumberArray = setRandomBoardNumberArray();
  var boardString = string || "0000000000000000".replaceChar(randomIndex(0, 16), this.randomBoardNumber()).replaceChar(randomIndex(0, 16), this.randomBoardNumber());
  this.boardArray = boardString.split("");
}

Game.prototype.toString = function(){
 return this.boardArray.slice(0, 4).join(" ") + "\n" + this.boardArray.slice(4, 8).join(" ") + "\n" + this.boardArray.slice(8, 12).join(" ") + "\n" + this.boardArray.slice(12).join(" ");
}

Game.prototype.emptySquares = function(){
  var emptySquareIndeces = [];
  for(var i = 0; i < this.boardArray.length; i++){
    if(this.boardArray[i] === "0"){
      emptySquareIndeces.push(i);
    }
  }
  return emptySquareIndeces;
}

Game.prototype.randomBoardNumber = function(){
  return this.randomBoardNumberArray[Math.floor(Math.random() * this.randomBoardNumberArray.length)]
}

Game.prototype.randomFill = function(num){
  var emptyIndeces = this.emptySquares();
  var numToFill = num || 1;

  for(var i = 0; i < numToFill; i++){
    var indexToFill = emptyIndeces[randomIndex(0, emptyIndeces.length)];
    this.boardArray[indexToFill] = this.randomBoardNumber();
  }
}

Game.prototype.moveSquare = function(originalPos, newPos){
  if(this.boardArray[newPos] === "0"){
    this.boardArray[newPos] = this.boardArray[originalPos];
    this.boardArray[originalPos] = "0";
  } else {
    console.log("newPos not empty");
  }
}

Game.prototype.move = function(direction){
  var newBoard = [];

  var moveLeft = function(){
    for(var i = 0; i < this.boardArray.length; i+=4){
      newBoard.push(this.boardArray.slice(i, i+4).doCollisions().stackSquares());
    }
    this.boardArray = newBoard.flatten();
  }.bind(this);

  var moveRight = function(){
    for(var i = 0; i < this.boardArray.length; i+=4){
      newBoard.push(this.boardArray.slice(i, i+4).reverse().doCollisions().stackSquares().reverse());
    }
    this.boardArray = newBoard.flatten();
  }.bind(this);

  var transposedBoardArray = function(){
    var matrixBoardArray = [];
    for(var i = 0; i < this.boardArray.length; i+=4){
      matrixBoardArray.push(this.boardArray.slice(i, i+4))
    }
    return transpose(matrixBoardArray).flatten()
  }.bind(this);

  var moveUp = function(){
    var formattedTransposedBoardArray = transposedBoardArray();
    for(var i = 0; i < formattedTransposedBoardArray.length; i+=4){
      newBoard.push(formattedTransposedBoardArray.slice(i, i+4).doCollisions().stackSquares());
    }
    this.boardArray = transpose(newBoard).flatten();
  }.bind(this);

  var moveDown = function(){
    var formattedTransposedBoardArray = transposedBoardArray().reverse();
    for(var i = 0; i < formattedTransposedBoardArray.length; i+=4){
      newBoard.push(formattedTransposedBoardArray.slice(i, i+4).doCollisions().stackSquares());
    }
    this.boardArray = transpose(newBoard).flatten().reverse();
  }.bind(this);

  if(direction === "left"){
    moveLeft();
  } else if(direction === "right"){
    moveRight();
  } else if(direction === "up"){
    moveUp();
  } else if(direction === "down"){
    moveDown();
  } else {
    console.log("incorrect parameter for move function")
  }
}
