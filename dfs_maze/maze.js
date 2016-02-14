var textureBlack = PIXI.Texture.fromImage("imgs/block_gray.png");
var textureWhite = PIXI.Texture.fromImage("imgs/block_white.png");
var textureGreen = PIXI.Texture.fromImage("imgs/block_blue.png");

Block=function(stage,x,y,yInd,xInd, isWhite){
    this.sprite=null;

    if(isWhite){
        this.sprite = new PIXI.Sprite(textureWhite);
    }else{
        this.sprite = new PIXI.Sprite(textureBlack);
    }
    this.y = yInd;
    this.x = xInd;
    this.sprite.position.x=x;
    this.sprite.position.y=y;
    this.sprite.anchor.x=0.5;
    this.sprite.anchor.y=0.5;
    this.isWhite=isWhite;

    stage.addChild(this.sprite);
};

Block.prototype.makeWhite=function(){
    this.isWhite = true;
    this.sprite.setTexture(textureWhite);
};
Block.prototype.makeBlack=function(){
    this.isWhite = false;
    this.sprite.setTexture(textureBlack);
};
Block.prototype.makeGreen=function(){
    this.sprite.setTexture(textureGreen);
};

