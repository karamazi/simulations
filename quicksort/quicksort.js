var textureButton = PIXI.Texture.fromImage("imgs/button.png");
var textureButtonDown = PIXI.Texture.fromImage("imgs/buttonDown.png");
var textureButtonOver = PIXI.Texture.fromImage("imgs/buttonOver.png");

var textureBall = PIXI.Texture.fromImage("imgs/ball.png");
var textureBallGolden = PIXI.Texture.fromImage("imgs/ball_golden.png");
var textureBallPivot = PIXI.Texture.fromImage("imgs/ball_pivot.png");
//var textureBallInactive = PIXI.Texture.fromImage("imgs/ball_inactive.png");

var textureHelp = PIXI.Texture.fromImage("imgs/help.png");
var textureBackground = PIXI.Texture.fromImage("imgs/background.png");

var msgEnum = Object.freeze({"Ok":1, "Error":2, "Info":3, "Special":4})

var episodeEnum = Object.freeze({"SetGolden":0, "Divide":1, "FindGolden":2,"Finished":3})

//CONSTANTS---------START
var textStyle = { font: "bold 25px Comic Sans MS", fill: "#ffffcc", align: "left" };
var smallTextFont = "bold 20px Arial";

//CONSTANTS-----------END
Ball=function(stage,x,y){
	this.sprite = new PIXI.Sprite(textureBall);
	stage.addChild(this.sprite);
	this.text = new MyText(stage,x,y,"1");
	
	this.isClicked=false;
	this.isGolden=false;
	this.isInactive=false;
	this.isPivot = false;

	this.value=1;
	var self=this;

	this.isMoving=false;
	this.movVect=null;
	this.movProgressVect=null;
	this.stepVect=null;

	this.sprite.interactive=true;
	this.sprite.buttonMode=true;
	this.sprite.position.x=x;
	this.sprite.position.y=y;
	this.sprite.anchor.x=0.5;
	this.sprite.anchor.y=0.5;
	this.text.position=this.sprite.position;
	this.text.anchor=this.sprite.anchor;

	this.sprite.click=this.sprite.tap=function(data){
		self.isClicked=true;
		console.log("derp");
	}


};
Ball.prototype.remove = function (stage) {
    stage.removeChild(this.sprite);
    this.text.remove(stage);
};

Ball.prototype.makeGolden=function(){
	this.isGolden=true;
	//this.value=2;
	//this.text.setText(2);
	this.sprite.setTexture(textureBallGolden);
};
Ball.prototype.makeNormal = function () {
    this.isGolden = false;
    this.isPivot = false;
    this.sprite.setTexture(textureBall);
}
Ball.prototype.makePivot=function(){
    this.isPivot=true;
    this.sprite.setTexture(textureBallPivot);
};
Ball.prototype.setValue = function (value) {
    this.value = value;
    this.text.setText(value);
};

Ball.prototype.makeInactive = function () {
    this.isInactive = true;
    this.text.alpha = 0.3;
    this.sprite.alpha = 0.3;
    //this.sprite.setTexture(textureBallInactive)
};
Ball.prototype.moveBy=function(x,y){
	this.isMoving=true;
	this.movVect=new PIXI.Point(x,y);
	this.stepVect=new PIXI.Point(x/5,y/5);
	this.movProgressVect=new PIXI.Point(0,0);
};

Ball.prototype.update=function(){
	this.isClicked=false;
	if(this.isMoving){
		this.sprite.position.x+=this.stepVect.x;
		this.sprite.position.y+=this.stepVect.y;
		this.movProgressVect.x+=this.stepVect.x;
		this.movProgressVect.y+=this.stepVect.y;
		if(this.movProgressVect.x>=this.movVect.x && this.movProgressVect.y>=this.movVect.y){
			this.isMoving=false;
		}
	}
};
Ball.prototype.reset=function(x,y){
	this.sprite.position.x=x;
	this.sprite.position.y=y;
	this.isGolden=false;
	this.text.setText(1);
	this.isInactive=false;
	this.text.alpha=1;
	this.sprite.alpha=1;
	this.sprite.setTexture(textureBall);
};

