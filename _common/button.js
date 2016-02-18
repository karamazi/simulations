Button = function (stage, x, y, text, type) {
    var self = this;

    this.textureButton = textureButton;
    this.textureButtonOver = textureButtonOver;
    this.setupTextures(type);

    this.sprite = new PIXI.Sprite(self.textureButton);
    this.sprite.buttonMode = true;
    this.sprite.interactive = true;

    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.anchor = centeredAnchor;
    stage.addChild(this.sprite);

    this.text = new MyText(stage, x - 45, y + 2, text, defaultTextStyle);
    this.text.text.anchor = new PIXI.Point(0, 0.5);
    this.isClicked = false;


    this.sprite.mousedown = this.sprite.touchstart = function (data) {

        this.isdown = true;
        this.setTexture(self.textureButton);
        this.alpha = 1;
    };

    // set the mouseup and touchend callback..
    this.sprite.mouseup = this.sprite.touchend = this.sprite.mouseupoutside = this.sprite.touchendoutside = function (data) {
        this.isdown = false;

        if (this.isOver) {
            this.setTexture(self.textureButtonOver);
        }
        else {
            this.setTexture(self.textureButton);
        }
    };

    // set the mouseover callback..
    this.sprite.mouseover = function (data) {

        this.isOver = true;

        if (this.isdown)return;

        this.setTexture(self.textureButtonOver)
    };

    // set the mouseout callback..
    this.sprite.mouseout = function (data) {

        this.isOver = false;

        if (this.isdown)return;
        this.setTexture(self.textureButton)
    };

    this.sprite.click = this.sprite.tap = function (data) {
        self.isClicked = true;
    };
};

Button.type = Object.freeze({
    "Help": 0,
    "Plus": 1,
    "Minus": 2,
    "Reset": 3,
    "Next": 4,
    "Previous": 5,
    "Reroll": 6,
    "PlusText": 7,
    "Encode": 8,
    "Decode": 9,
    "Onp": 10,
    "Load": 11,
    "Filter": 12,
    "Draw": 13,
    "Up": 14,
    "Down": 15,
    "Left": 16,
    "Right": 17
});
Button.prototype.setupTextures = function (text) {
    switch (text) {
        case Button.type.Help:
            this.textureButton = textureHelpButton;
            this.textureButtonOver = textureHelpButtonOver;
            break;

        case Button.type.Plus:
            this.textureButton = texturePlusButton;
            this.textureButtonOver = texturePlusButtonOver;
            break;
        case Button.type.Minus:
            this.textureButton = textureMinusButton;
            this.textureButtonOver = textureMinusButtonOver;
            break;

        case Button.type.Reset:
            this.textureButton = textureResetButton;
            this.textureButtonOver = textureResetButtonOver;
            break;

        case Button.type.Next:
            this.textureButton = textureNextButton;
            this.textureButtonOver = textureNextButtonOver;
            break;

        case Button.type.Previous:
            this.textureButton = texturePreviousButton;
            this.textureButtonOver = texturePreviousButtonOver;
            break;

        case Button.type.Reroll:
            this.textureButton = textureRerollButton;
            this.textureButtonOver = textureRerollButtonOver;
            break;

        case Button.type.PlusText:
            this.textureButton = texturePlusTextButton;
            this.textureButtonOver = texturePlusTextButtonOver;
            break;

        case Button.type.Encode:
            this.textureButton = textureEncodeButton;
            this.textureButtonOver = textureEncodeButtonOver;
            break;

        case Button.type.Decode:
            this.textureButton = textureDecodeButton;
            this.textureButtonOver = textureDecodeButtonOver;
            break;

        case Button.type.Onp:
            this.textureButton = textureOnpButton;
            this.textureButtonOver = textureOnpButtonOver;
            break;

        case Button.type.Load:
            this.textureButton = textureLoadButton;
            this.textureButtonOver = textureLoadButtonOver;
            break;

        case Button.type.Filter:
            this.textureButton = textureFilterButton;
            this.textureButtonOver = textureFilterButtonOver;
            break;

        case Button.type.Draw:
            this.textureButton = textureDrawButton;
            this.textureButtonOver = textureDrawButtonOver;
            break;

        case Button.type.Up:
            this.textureButton = textureUpButton;
            this.textureButtonOver = textureUpButtonOver;
            break;
        case Button.type.Down:
            this.textureButton = textureDownButton;
            this.textureButtonOver = textureDownButtonOver;
            break;
        case Button.type.Left:
            this.textureButton = textureLeftButton;
            this.textureButtonOver = textureLeftButtonOver;
            break;
        case Button.type.Right:
            this.textureButton = textureRightButton;
            this.textureButtonOver = textureRightButtonOver;
            break;

        default:
            break;
    }
};


Button.prototype.update = function () {
    this.isClicked = false;
};

Button.prototype.setActive = function (active) {
    this.sprite.buttonMode = active;
    this.sprite.interactive = active;
    if(active){
        this.sprite.texture = this.textureButton;
        this.sprite.alpha = 1
    }else{
        this.sprite.texture = this.textureButtonOver;
        this.sprite.alpha = 0.5
    }

};

