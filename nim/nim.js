var matchTexture = PIXI.Texture.fromImage("imgs/match.png");
Match = function (stage, x, y) {
    this.sprite = new PIXI.Sprite(matchTexture);
    this.isClicked = false;
    this.sprite.position.x = x;
    this.sprite.position.y = y;

    stage.addChild(this.sprite);

};
Match.prototype.remove = function (stage) {
    stage.removeChild(this.sprite);
};