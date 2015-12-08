$(document).ready(function() {
  game = new Game;

  var paintBoard = function(){
    for(var i = 0; i < game.boardArray; i++){
      var row = Math.floor(i / 4);
      var col = i % 4;
      var id = "#"+row + col;
      if(game.boardArray[i] !== "0"){
        $(id).text(game.boardArray[i])
        debugger
      }
    }
  }

});
