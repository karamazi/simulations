var textureBlack = PIXI.Texture.fromImage("imgs/block_black.jpg");
var textureWhite = PIXI.Texture.fromImage("imgs/block_white.jpg");
var textureHorse = PIXI.Texture.fromImage("imgs/horse.png");
var textureCross = PIXI.Texture.fromImage("imgs/cross.png");
var textureBall = PIXI.Texture.fromImage("imgs/ball.png");

var possibleMovesTextStyle = {font: "22px OpenSans", fill: "#ffffff", align: "left"};
Field = function (stage, xPos, yPos, isWhite) {
    this.sprite = null;
    this.isVisited = false;
    this.isWhite = isWhite;
    if (this.isWhite) {
        this.sprite = new PIXI.Sprite(textureWhite);
    } else {
        this.sprite = new PIXI.Sprite(textureBlack);
    }

    this.sprite.position.x = xPos;
    this.sprite.position.y = yPos;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.possibleMoves = 0;
    stage.addChild(this.sprite);

    this.cross = new PIXI.Sprite(textureCross);
    this.cross.position = this.sprite.position;
    this.cross.anchor = this.sprite.anchor;
    this.cross.visible = false;
    stage.addChild(this.cross);

    this.textBg = new PIXI.Sprite(textureBall);
    this.textBg.position = this.sprite.position;
    this.textBg.anchor = this.sprite.anchor;
    this.textBg.visible = false;
    stage.addChild(this.textBg);

    this.text = new MyText(stage, xPos, yPos, "", possibleMovesTextStyle);
};
Field.prototype.setPossibleMoves = function (moves) {
    this.possibleMoves = moves;
    this.textBg.visible = true;
    this.text.setText(moves);

};
Field.prototype.clearPossibleMoves = function () {
    this.possibleMoves = 0;
    this.textBg.visible = false;
    this.text.setText("");
};

Field.prototype.markAsVisited = function () {
    this.isVisited = true;
    this.cross.visible = true;
};
Field.prototype.reset = function () {
    this.isVisited = false;
    this.textBg.visible = false;
    this.cross.visible = false;
    this.text.setText("");

};

Figure = function (stage, board, x, y) {
    this.sprite = new PIXI.Sprite(textureHorse);
    this.board = board;
    this.currentField = null;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.x = 0;
    this.y = 0;
    this.moveBy(x, y);

    stage.addChild(this.sprite);
};

Figure.prototype.moveBy = function (dx, dy) {
    if (this.currentField !== null)
        this.currentField.markAsVisited();
    this.x += dx;
    this.y += dy;
    this.currentField = this.board[this.y][this.x];
    this.sprite.position = this.board[this.y][this.x].sprite.position;
};
Figure.prototype.canMoveBy = function (dx, dy) {
    return (dx != 0 || dy != 0) &&
        this.x + dx >= 0 && this.x + dx < this.board.length &&
        this.y + dy >= 0 && this.y + dy < this.board[0].length && !board[this.y + dy][this.x + dx].isVisited;
};