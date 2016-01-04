Logo = function (stage, x, y) {
    this.logo = new PIXI.Sprite(textureLogo);

    this.logo.anchor = centeredAnchor;
    if(x===undefined || y==undefined)
        this.logo.position = new PIXI.Point(320,455);
    else
        this.logo.position = new PIXI.Point(x,y);

    stage.addChild(this.logo)
};