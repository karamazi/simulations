var textureField = PIXI.Texture.fromImage("imgs/socket.jpg");
var textureRobot = PIXI.Texture.fromImage("imgs/robot.png");
var textureFinish = PIXI.Texture.fromImage("imgs/finish.png");
Field = function (stage, xPos, yPos) {
    var self = this;

    this.sprite = new PIXI.Sprite(textureField);
    this.isClicked = false;

    this.sprite.position.x = xPos;
    this.sprite.position.y = yPos;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.interactive=true;
    this.sprite.buttonMode=true;

    stage.addChild(this.sprite);

    this.sprite.click=this.sprite.tap=function(data){
        self.isClicked=true;
    }
};
Field.prototype.update = function () {
    this.isClicked = false;
};

Finish = function(stage, x, y){
    this.sprite = new PIXI.Sprite(textureFinish);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    stage.addChild(this.sprite);
};


Robot=function(stage,x,y){
    this.sprite = new PIXI.Sprite(textureRobot);
    var self=this;

    this.isMoving=false;
    this.movVect=null;
    this.movProgressVect=null;
    this.stepVect=null;

    this.sprite.position.x=x;
    this.sprite.position.y=y;
    this.sprite.anchor.x=0.5;
    this.sprite.anchor.y=0.5;

    stage.addChild(this.sprite);
};
Robot.prototype.update=function(){
    if(this.isMoving){
        this.sprite.position.x+=this.stepVect.x;
        this.sprite.position.y+=this.stepVect.y;
        this.movProgressVect.x+=this.stepVect.x;
        this.movProgressVect.y+=this.stepVect.y;
        if(Math.abs(this.movProgressVect.x) >= Math.abs(this.movVect.x) &&
            Math.abs(this.movProgressVect.y) >= Math.abs(this.movVect.y)){
            this.isMoving=false;
        }
    }
}

Robot.prototype.moveBy=function(x,y){
    this.isMoving=true;
    this.movVect=new PIXI.Point(x,y);
    this.stepVect=new PIXI.Point(x/25,y/25);
    this.movProgressVect=new PIXI.Point(0,0);
};
Robot.prototype.moveTo=function(x,y){
    this.moveBy(x-this.sprite.position.x,
                y-this.sprite.position.y)
};
