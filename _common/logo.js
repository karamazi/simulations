Logo = function (stage, x, y) {
    this.logo = new PIXI.Sprite(textureLogo);
    this.logo.position = new PIXI.Point(x,y);
    this.logo.anchor = centeredAnchor;
    stage.addChild(this.logo)
};