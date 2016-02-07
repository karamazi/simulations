Switch=function(stage,x,y){
    this.sprite=new PIXI.Sprite(textureSwitch);
    this.sprite.position.x=x;
    this.sprite.position.y=y;
    this.sprite.anchor=centeredAnchor;
    stage.addChild(this.sprite);

    this.text = new MyText(stage, x-45, y, "Start");
    this.text.text.anchor = new PIXI.Point(0,0.5);

    this.isClicked=false;
    var self=this;

    this.sprite.buttonMode = true;
    this.sprite.interactive = true;

    this.sprite.mouseup = this.sprite.touchend = this.sprite.mouseupoutside = this.sprite.touchendoutside = function(data){
        this.isdown = false;

        if(this.isOver)
        {
            //to sie wydaje glupie ale najpierw idzie ten event a potem click
            if(!self.isClicked)
                this.setTexture(textureSwitchDownOver);
            else
                this.setTexture(textureSwitchOver);
        }
        else
        {
            if(!self.isClicked)
                this.setTexture(textureSwitchDown);
            else
                this.setTexture(textureSwitch);
        }
    };

    this.sprite.mousedown = this.sprite.touchstart = function(data){
        this.isdown = true;
        this.setTexture(textureSwitchDown);
        this.alpha = 1;
    };
    this.sprite.mouseover = function(data){
        this.isOver = true;
        if(this.isdown)return;
        if(self.isClicked)
            this.setTexture(textureSwitchDownOver);
        else
            this.setTexture(textureSwitchOver);
    };

    // set the mouseout callback..
    this.sprite.mouseout = function(data){
        this.isOver = false;
        if(this.isdown)return;

        if(self.isClicked)
            this.setTexture(textureSwitchDown);
        else
            this.setTexture(textureSwitch)
    };

    this.sprite.click = this.sprite.tap = function(data){
        self.isClicked=!self.isClicked;
        self.text.setText(self.isClicked ? "Stop" : "Start");
    };

};

Switch.prototype.deactivate=function() {
    this.isClicked = false;
    this.sprite.setTexture(textureSwitch);
    this.text.setText("Start");
};

Switch.prototype.update=function() {
    this.isClicked = false;
};
