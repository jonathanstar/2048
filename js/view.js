function View(game){
  this.game = game;
}

View.prototype.paintBoard = function(){
    for(var i = 0; i < game.boardArray.length; i++){
      // debugger
      var row = Math.floor(i / 4);
      var col = i % 4;
      var id = "#"+row + col;
      if(game.boardArray[i] !== "0"){
        $(id).text(game.boardArray[i])
      }
    }

  }
