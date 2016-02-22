
var textureBall = PIXI.Texture.fromImage("imgs/ball.png");
var textureBallGolden = PIXI.Texture.fromImage("imgs/ball_golden.png");
var textureBallPivot = PIXI.Texture.fromImage("imgs/ball_pivot.png");

Ball=function(stage,x,y){
	this.sprite = new PIXI.Sprite(textureBall);
	this.text = new PIXI.Text("1", defaultTextStyle);
	
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
	this.text.anchor=centeredTextAnchor;

	this.sprite.click=this.sprite.tap=function(data){
		self.isClicked=true;
	};

	stage.addChild(this.sprite);
	stage.addChild(this.text);
};
Ball.prototype.remove = function (stage) {
    stage.removeChild(this.sprite);
    stage.removeChild(this.text);
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
};
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


