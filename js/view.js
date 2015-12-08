function View(game){
  this.game = game;
}

View.prototype.paintBoard = function(){
  for(var i = 0; i < this.game.boardArray.length; i++){
    var row = Math.floor(i / 4);
    var col = i % 4;
    var id = "#"+row + col;
    $(id).removeClass();

    if(game.boardArray[i] !== "0"){
      $(id).text(game.boardArray[i])
      $(id).addClass("_" + game.boardArray[i])
    } else {
      $(id).text("");
    }
  }
}
