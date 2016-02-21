var signLessThan = PIXI.Texture.fromImage("imgs/lt.png");
var signGreaterEqual = PIXI.Texture.fromImage("imgs/ge.png");

var textureBall = PIXI.Texture.fromImage("imgs/ball.png");
Ball=function(){
	var self=this;

	this.value=0;
	this.sprite = new PIXI.Sprite(textureBall);
	this.text=undefined;
	

	this.isClicked=false;

	this.slowDown=50;
	this.isMoving=false;
	this.movVect=null;
	this.movProgressVect=null;
	this.stepVect=null;

	this.sprite.interactive=true;
	this.sprite.buttonMode=true;
	this.sprite.anchor.x=0.5;
	this.sprite.anchor.y=0.5;

	this.sprite.click=this.sprite.tap=function(data){
		self.isClicked=true;
	}
};

Ball.prototype.setValue=function(val){
	this.value=val;
	this.text.setText(val);
};

Ball.prototype.init=function(stage,x,y,value){
	this.value=value;
	this.sprite.position.x=x;
	this.sprite.position.y=y;
	stage.addChild(this.sprite);

	this.text = new MyText(stage,0,0,this.value);
	this.text.text.position = this.sprite.position;
};

Ball.prototype.makeInactive=function(){
	this.isInactive=true;
	this.text.alpha=0.3;
	this.sprite.alpha=0.3;
	//this.sprite.setTexture(textureBallInactive)
};
Ball.prototype.moveBy=function(x,y){
	this.isMoving=true;
	this.movVect=new PIXI.Point(x,y);
	this.stepVect=new PIXI.Point(x/this.slowDown,y/this.slowDown);
	this.movProgressVect=new PIXI.Point(0,0);
};
Ball.prototype.moveTo=function(x,y){
	var direction=new PIXI.Point(x-this.sprite.x,y-this.sprite.y);
	this.moveBy(direction.x,direction.y);
};

Ball.prototype.update=function(){
	this.isClicked=false;
	if(this.isMoving){
		this.sprite.position.x+=this.stepVect.x;
		this.sprite.position.y+=this.stepVect.y;
		this.movProgressVect.x+=this.stepVect.x;
		this.movProgressVect.y+=this.stepVect.y;
		if(Math.abs(this.movProgressVect.x)>=Math.abs(this.movVect.x) 
			&& Math.abs(this.movProgressVect.y)>=Math.abs(this.movVect.y)){
			this.isMoving=false;
		}
	}
};
Ball.prototype.reset=function(x,y,val){
	this.sprite.position.x=x;
	this.sprite.position.y=y;
	this.isMoving=false;
	this.setValue(val);
	this.text.alpha=1;
	this.sprite.alpha=1;
	this.sprite.setTexture(textureBall);
};
Ball.prototype.setPosition=function(x,y){
	var p=new PIXI.Point(x,y);
	this.sprite.position=p;
	this.text.text.position=this.sprite.position;
};


Leaf = function(){
	Ball.call(this);
	this.parent=null;
	this.left=null;
	this.right=null;
};
Leaf.prototype=Object.create(Ball.prototype);
Leaf.prototype.constructor=Leaf;

Leaf.prototype.clearNodes=function(){
	this.parent=null;
	this.left=null;
	this.right=null;
};

Tree = function(stage,graphics,x,y,values){
	this.graphics=graphics;
	this.stage=stage;
	this.leafVals=values;
	this.leaves=[];
	this.rootPos=new PIXI.Point(x,y);
	//this.levels=0;

	this.ind=0;
	this.ballMoves=false;
	this.isAddingNext=false;
	this.foundNext=false;
	this.currentNext=null;
	this.depth=0;
	this.parent=null;

	this.sign=new PIXI.Sprite(signLessThan);
	this.sign.visible=false;
	this.isPaused=false;
	this.pauseTime=1000;
	this.pauseTimeStart=0;

	for(var i=0;i<this.leafVals.length;i++){
		var b=new Leaf();
		b.init(stage,220+i*50,50,this.leafVals[i]);
		this.leaves.push(b);
	}
	this.root=this.leaves[0];
	stage.addChild(this.sign);
};

Tree.prototype.clear=function(values){
	this.leafVals=values;
	for(var i=0;i<this.leafVals.length;i++){
		this.leaves[i].reset(220+i*50,50,this.leafVals[i]);
		this.leaves[i].clearNodes();
	}
	this.root=this.leaves[0];
	this.ind=0;
};

Tree.prototype.displaySign=function(isGreater, x,y){
	if(isGreater)
		this.sign.setTexture(signGreaterEqual);
	else
		this.sign.setTexture(signLessThan);
	this.sign.position=new PIXI.Point(x,y);

	this.sign.visible=true;
	this.isPaused=true;
	this.pauseTimeStart=Date.now();
};

Tree.prototype.orderAddNext=function(){
	if(this.isAddingNext)
		return -1;

	if(this.ind==this.leaves.length)
		return 1;

	if(this.ind==0){
		this.root.setPosition(this.rootPos.x, this.rootPos.y+2);
		this.ind++;
		return 0;
	}

	this.isAddingNext=true;
	this.foundNext=false;
	this.currentNext=this.leaves[this.ind];
	this.currentNext.setPosition(this.rootPos.x,this.rootPos.y-40);
	this.depth=0;
	this.parent=this.root;


	return 0;
};

Tree.prototype.update=function(){
	if(this.isPaused){
		if(Date.now()-this.pauseTimeStart>=this.pauseTime){
			this.isPaused=false;
			this.sign.visible=false;
		}else{
			return;
		}
	}

	this.ballMoves=false;
	for(var i=0;i<this.leaves.length;i++){
		this.leaves[i].update();
		this.ballMoves=this.ballMoves || this.leaves[i].isMoving;
	}
	if(this.isAddingNext){
		//zakoncz caly proces dodawania
		if(!this.ballMoves && this.foundNext){
			var p=this.parent.sprite.position;
			var c=this.currentNext.sprite.position;
			this.graphics.beginFill(0x000000);
			this.graphics.lineStyle(3, 0x369bd7);
			this.graphics.moveTo(p.x,p.y);
			this.graphics.lineTo(c.x, c.y);
			this.graphics.endFill();

			this.ind++;
			this.isAddingNext=false;
		}

		

		if(!this.ballMoves && !this.foundNext){
			this.depth++;
			var mult=(this.leaves.length/2-this.depth);
			if(mult<1)mult=1;
			var c=this.currentNext.sprite.position;
			if(this.currentNext.value<this.parent.value){
				if(this.parent.left!=null){
					this.parent=this.parent.left;
					var p=this.parent.sprite.position;
					this.currentNext.moveTo(p.x,p.y-40);
				}else{
					this.foundNext=true;
					var p=this.parent.sprite.position;
					this.currentNext.moveTo(p.x-50*mult,p.y+50)
					this.parent.left=this.currentNext;
				}
				this.displaySign(false,c.x,c.y);
			}
			else{
				if(this.parent.right!=null){
					this.parent=this.parent.right;
					var p=this.parent.sprite.position;
					this.currentNext.moveTo(p.x,p.y-40);
				}else{
					this.foundNext=true;
					this.parent.right=this.currentNext;
					var p=this.parent.sprite.position;
					this.currentNext.moveTo(p.x+50*mult,p.y+50)
				}
				this.displaySign(true,c.x,c.y);
			}
			
		}
	}

}
