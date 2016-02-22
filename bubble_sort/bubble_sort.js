var textureDraggable = PIXI.Texture.fromImage("imgs/ball.png");
var textureSocket = PIXI.Texture.fromImage("imgs/socket.png");
var textureError = PIXI.Texture.fromImage("imgs/blink.png");

var swapEnum = Object.freeze({"FadeIn_toTemp":0, "FadeOut_toTemp":1, "FadeIn_toOne":2, "FadeOut_toOne":3, "FadeIn_fromTemp":4, "FadeOut_fromTemp":5})


Draggable=function(stage,x,y){
	this.sprite = new PIXI.Sprite(textureDraggable);
	stage.addChild(this.sprite);

	this.value=0;
	this.text=new MyText(stage, x,y, "a", defaultTextStyle, centeredTextAnchor);
	//true jesli wlasnie zostalo opuszczone
	this.socket=null;
	this.isDropped=false;
	this.startingPoint = new PIXI.Point();

	//co to kurwa ma byc zeby nie mozna sie bylo po prostu odwołać do zakresu wyzej
	var self=this;
	var lastClick=0;
	var doubleClickTime=500;
	this.isDoubleClicked=false;

	// enable the bunny to be interactive.. this will allow it to respond to mouse and touch events
	this.sprite.interactive = true;
	// this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
	this.sprite.buttonMode = true;

	this.sprite.anchor=centeredAnchor;

	// move the sprite to its designated position
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.text.text.position = this.sprite.position;

	// add it to the stage


	// use the mousedown and touchstart
	this.sprite.mousedown = this.sprite.touchstart = function(data)
	{
		// stop the default event...
		data.originalEvent.preventDefault();
		this.data = data;
		this.alpha = 0.9;
		
		//if(!this.dragging){
			self.startingPoint.x = self.sprite.position.x;
			self.startingPoint.y = self.sprite.position.y;
		//}
			
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
	}

	// set the callbacks for when the mouse or a touch moves
	this.sprite.mousemove = this.sprite.touchmove = function(data)
	{
		if(this.dragging)
		{
			var newPosition = this.data.getLocalPosition(this.parent);
			this.position.x = newPosition.x;
			this.position.y = newPosition.y;
		}
	}


}
Draggable.prototype.dropTo=function(sockets){
		this.isDropped=false;
		var x=this.sprite.position.x;
		var y=this.sprite.position.y;
		for(var i=0;i<sockets.length;i++){
			if(sockets[i].plug==null && sockets[i].sprite.getBounds().contains(x,y)){
				this.bindWith(sockets[i]);
				return true;
			}
		}

		if(this.socket!=null){
			this.bindWith(this.socket);
		}else{
			var s_x=this.startingPoint.x;
			var s_y=this.startingPoint.y;
			this.sprite.position.x=s_x;
			this.sprite.position.y=s_y;
		}

		
		return false;
};
Draggable.prototype.bindWith=function(socket){
	if(socket!=null){
		if(this.socket!=null){
			this.socket.plug=null;			
		}
		this.socket=socket;
		this.socket.plug=this;
		this.sprite.position.x=socket.sprite.position.x;
		this.sprite.position.y=socket.sprite.position.y;	
	}else{
		this.socket.plug=null;
		this.socket=null;
	}
};
Draggable.prototype.setValue=function(value){
	this.value=value;
	this.text.setText(value);
};
Draggable.prototype.update=function(){
	this.isDoubleClicked=false;
};

Socket = function(stage, x, y){
	this.sprite = new PIXI.Sprite(textureSocket);
	this.plug=null;

	this.sprite.anchor=centeredAnchor;
	this.sprite.position.x=x;
	this.sprite.position.y=y;

	this.sprite.interactive = true;
	stage.addChild(this.sprite);
};

UIText = function(stage){
	this.msgText = new MyText(stage,320,80,"", blueTextStyle);
	this.msgTimeInit=0;
	this.msgTimePassedMs=0;
	this.msgTimeDurationMs=30000;

	this.initTime = new Date().getTime();
};
UIText.prototype.clear=function(){

};
UIText.prototype.update=function(){
	var time=new Date().getTime();
	this.seconds=Math.floor((time-this.initTime)/1000);

	if(this.msgTimePassedMs<this.msgTimeDurationMs){
		this.msgTimePassedMs+=time-this.msgTimeInit;
		if(this.msgTimePassedMs>=this.msgTimeDurationMs){
			this.msgText.setText("");
		}
	}

};
UIText.prototype.displayMsg=function(msg){
	this.msgText.setText(msg);
	this.msgTimePassedMs=0;
	this.msgTimeInit=new Date().getTime();
};

//bubble sort min>max
function bubbleSort(values){
	var array=values.slice();
	var iterations=[array.toString()];

	var isSorted=false;
	while(!isSorted){
		isSorted=true;
		for(var i=0;i<array.length-1;i++){
			if(array[i]>array[i+1]){
				isSorted=false;
				var tmp=array[i];
				array[i]=array[i+1];
				array[i+1]=tmp;

				var packed=array.toString();
				iterations.push(packed);
			}
		}
	}
	return iterations;
}



