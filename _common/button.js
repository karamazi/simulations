Button=function(stage,x,y,text,type){
    var self=this;

    this.textureButton = textureButton;
    this.textureButtonOver = textureButtonOver;
    this.textureButtonDown = textureButtonDown;
    this.setupTextures(type);

    this.sprite = new PIXI.Sprite(self.textureButton);
    this.sprite.buttonMode = true;
    this.sprite.interactive = true;

    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.anchor = centeredAnchor;
    stage.addChild(this.sprite);

    this.text = new MyText(stage, x-45, y, text, defaultTextStyle);
    this.text.text.anchor=new PIXI.Point(0, 0.5);
    this.isClicked=false;



    this.sprite.mousedown = this.sprite.touchstart = function(data){

        this.isdown = true;
        this.setTexture(self.textureButtonDown);
        this.alpha = 1;
    };

    // set the mouseup and touchend callback..
    this.sprite.mouseup = this.sprite.touchend = this.sprite.mouseupoutside = this.sprite.touchendoutside = function(data){
        this.isdown = false;

        if(this.isOver)
        {
            this.setTexture(self.textureButtonOver);
        }
        else
        {
            this.setTexture(self.textureButton);
        }
    };

    // set the mouseover callback..
    this.sprite.mouseover = function(data){

        this.isOver = true;

        if(this.isdown)return;

        this.setTexture(self.textureButtonOver)
    };

    // set the mouseout callback..
    this.sprite.mouseout = function(data){

        this.isOver = false;

        if(this.isdown)return;
        this.setTexture(self.textureButton)
    };

    this.sprite.click = this.sprite.tap = function(data){
        self.isClicked=true;
    };
};

Button.type = Object.freeze({"Help":0, "Plus":1, "Minus":2, "Reset":3, "Next":4, "Reroll": 5});
Button.prototype.setupTextures=function(text){
    switch(text){
        case Button.type.Help:
            this.textureButton = textureHelpButton;
            this.textureButtonOver = textureHelpButtonOver;
            this.textureButtonDown = textureHelpButtonDown;
            break;
        case Button.type.Plus:
            this.textureButton = texturePlusButton;
            this.textureButtonOver = texturePlusButtonOver;
            this.textureButtonDown = texturePlusButtonDown;
            break;

        case Button.type.Minus:
            this.textureButton = textureMinusButton;
            this.textureButtonOver = textureMinusButtonOver;
            this.textureButtonDown = textureMinusButtonDown;
            break;

        case Button.type.Reset:
            this.textureButton = textureResetButton;
            this.textureButtonOver = textureResetButtonOver;
            this.textureButtonDown = textureResetButtonDown;
            break;

        case Button.type.Next:
            this.textureButton = textureNextButton;
            this.textureButtonOver = textureNextButtonOver;
            this.textureButtonDown = textureNextButtonDown;
            break;

        case Button.type.Reroll:
            this.textureButton = textureRerollButton;
            this.textureButtonOver = textureRerollButtonOver;
            this.textureButtonDown = textureRerollButtonDown;
            break;
        
        default:
            break;
    }
};


Button.prototype.update=function(){
    this.isClicked=false;
};

Button.prototype.setActive=function(active){
    this.sprite.buttonMode = active;
    this.sprite.interactive = active;
};
