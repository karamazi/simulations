//21:10-22:10
var textureBlack = PIXI.Texture.fromImage("imgs/block_black.jpg");
var textureWhite = PIXI.Texture.fromImage("imgs/block_white.jpg");
var textureAnt = PIXI.Texture.fromImage("imgs/ant.png");

var texturePortalIn=PIXI.Texture.fromImage("imgs/portal_in.png");
var texturePortalOut=PIXI.Texture.fromImage("imgs/portal_out.png");

var textureDraggable = PIXI.Texture.fromImage("imgs/finish.png");


Draggable=function(stage,x,y){
	this.sprite = new PIXI.Sprite(textureDraggable);
	this.value=0;
	this.text=new PIXI.Text("",{font: "bold 25px Comic Sans MS", fill: "#ffffcc", align: "left"});
	this.socket=null;
	this.isDropped=false;
	this.startingPoint = new PIXI.Point(x,y);


	var self=this;
	var lastClick=0;
	var doubleClickTime=500;
	this.isDoubleClicked=false;

	this.sprite.interactive = true;
	this.sprite.buttonMode = true;

	this.sprite.anchor.x=0.5;
	this.sprite.anchor.y=0.5;


	// use the mousedown and touchstart
	this.sprite.mousedown = this.sprite.touchstart = function(data)
	{
		// stop the default event...
		data.originalEvent.preventDefault();

		// store a reference to the data
		// The reason for this is because of multitouch
		// we want to track the movement of this particular touch
		this.data = data;
		this.alpha = 0.9;
			
		this.dragging = true;
	};

	// set the events for when the mouse is released or a touch is released
	this.sprite.mouseup = this.sprite.mouseupoutside = this.sprite.touchend = this.sprite.touchendoutside = function(data)
	{
		this.alpha = 1
		this.dragging = false;
		// set the interaction data to null
		this.data = null;
	};
	this.sprite.click=this.sprite.tap=function(data){
		self.isDropped = true;
		self.isDoubleClicked=false;	

		var now=Date.now();
		var diff=now-lastClick;
		if(lastClick && diff<doubleClickTime){
			lastClick=0;
			self.isDoubleClicked=true;
			//self.bindWith(freeSocket);
		}else{
			lastClick=now;
		}
	};

	// set the callbacks for when the mouse or a touch moves
	this.sprite.mousemove = this.sprite.touchmove = function(data)
	{
		if(this.dragging)
		{
			var newPosition = this.data.getLocalPosition(this.parent);
			this.position.x = newPosition.x;
			this.position.y = newPosition.y;
		}
	};

	// move the sprite to its designated position
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.text.position = this.sprite.position;
	this.text.anchor = this.sprite.anchor;

	// add it to the stage
	stage.addChild(this.sprite);
	stage.addChild(this.text);
};
Draggable.prototype.update=function(){
	this.isDoubleClicked=false;
};
//either on block or not
Draggable.prototype.dropOn=function(block){
		this.isDropped=false;
		if(block!=null){
			this.sprite.position.x=block.sprite.position.x;
			this.sprite.position.y=block.sprite.position.y;			
		}else{
			this.sprite.position.x=this.startingPoint.x;
			this.sprite.position.y=this.startingPoint.y;
		}
		
		return false;
};

Movable=function(stage,x,y){
	this.sprite = new PIXI.Sprite(textureAnt);
	this.text=new PIXI.Text("",{font: "bold 25px Comic Sans MS", fill: "#ffffcc", align: "left"});
	this.isClicked=false;
	this.block=null;
	this.movX=0;
	this.movY=-1;

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

	stage.addChild(this.sprite);
	stage.addChild(this.text);
}
Movable.prototype.rotate=function(rotateRight){
	if(rotateRight){
		this.sprite.rotation+=Math.PI/2;
		var tmp=this.movX;
		this.movX=-this.movY;
		this.movY=tmp;
	}else{
		this.sprite.rotation-=Math.PI/2;
		var tmp=this.movX;
		this.movX=this.movY;
		this.movY=-tmp
	}
}
Movable.prototype.moveBy=function(x,y){
	this.isMoving=true;
	this.movVect=new PIXI.Point(x,y);
	this.stepVect=new PIXI.Point(x/20,y/20);
	this.movProgressVect=new PIXI.Point(0,0);
	this.sprite.interactive=false;
	this.sprite.buttonMode=false;
}
//do poruszania się w pionie LUB poziomie, zaleznie od kierunku
Movable.prototype.moveXY=function(distance){
	this.moveBy(this.movX*distance,this.movY*distance);
}

Movable.prototype.update=function(){
	this.isClicked=false;
	if(this.isMoving){
		this.sprite.position.x+=this.stepVect.x;
		this.sprite.position.y+=this.stepVect.y;
		this.movProgressVect.x+=this.stepVect.x;
		this.movProgressVect.y+=this.stepVect.y;
		if(Math.abs(this.movProgressVect.x)>=Math.abs(this.movVect.x) 
			&& Math.abs(this.movProgressVect.y)>=Math.abs(this.movVect.y)){
			this.isMoving=false;
			this.sprite.interactive=true;
			this.sprite.buttonMode=true;
		}
	}
}
Movable.prototype.reset=function(x,y){
	this.sprite.position.x=x;
	this.sprite.position.y=y;
}

Block=function(stage,x,y,isWhite){
	this.sprite=null;
	this.resident=null;

	if(isWhite){
		this.sprite = new PIXI.Sprite(textureWhite);
	}else{
		this.sprite = new PIXI.Sprite(textureBlack);
	}


	this.sprite.position.x=x;
	this.sprite.position.y=y;
	this.sprite.anchor.x=0.5;
	this.sprite.anchor.y=0.5;
	this.isWhite=isWhite;

	stage.addChild(this.sprite);
}

Block.prototype.bindWith=function(object){
	//this.sprite.alpha=0.1;
	if(object.block!=null){
		object.block.swapColor();
		object.block.resident=null;
	}
	object.block=this;
	this.resident=object;
	object.rotate(!this.isWhite);
};

Block.prototype.swapColor=function(){
	this.isWhite=!this.isWhite;
	if(this.isWhite){
		this.sprite.setTexture(textureWhite);
	}else{
		this.sprite.setTexture(textureBlack);
	}
};


