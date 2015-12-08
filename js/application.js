$(document).ready(function() {
  game = new Game;
  view = new View(game);
  view.paintBoard();

  $(document).keydown(function(event){
    var direction = undefined;
    switch(event.which){
      case 37:
        direction = "left";
        break
      case 38:
        direction = "up";
        break
      case 39:
        direction = "right";
        break
      case 40:
        direction = "down";
        break;
    }

    if(direction !== undefined){
      game.move(direction);
      game.randomFill();
      view.paintBoard();
    }
  });
});
