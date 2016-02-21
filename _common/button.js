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
            this.textureButton = common_texture("button_help.png");
            this.textureButtonOver = common_texture("button_help_hover.png");
            break;

        case Button.type.Plus:
            this.textureButton = common_texture("button_plus.png");
            this.textureButtonOver = common_texture("button_plus_hover.png");
            break;
        case Button.type.Minus:
            this.textureButton = common_texture("button_minus.png");
            this.textureButtonOver = common_texture("button_minus_hover.png");
            break;

        case Button.type.Reset:
            this.textureButton = common_texture("button_reset.png");
            this.textureButtonOver = common_texture("button_reset_hover.png");
            break;

        case Button.type.Next:
            this.textureButton = common_texture("button_next.png");
            this.textureButtonOver = common_texture("button_next_hover.png");
            break;

        case Button.type.Previous:
            this.textureButton = common_texture("button_previous.png");
            this.textureButtonOver = common_texture("button_previous_hover.png");
            break;

        case Button.type.Reroll:
            this.textureButton = common_texture("button_reroll.png");
            this.textureButtonOver = common_texture("button_reroll_hover.png");
            break;

        case Button.type.PlusText:
            this.textureButton = common_texture("button_plus_text.png");
            this.textureButtonOver = common_texture("button_plus_text_hover.png");
            break;

        case Button.type.Encode:
            this.textureButton = common_texture("button_encode.png");
            this.textureButtonOver = common_texture("button_encode_hover.png");
            break;

        case Button.type.Decode:
            this.textureButton = common_texture("button_decode.png");
            this.textureButtonOver = common_texture("button_decode_hover.png");
            break;

        case Button.type.Onp:
            this.textureButton = common_texture("button_onp.png");
            this.textureButtonOver = common_texture("button_onp_hover.png");
            break;

        case Button.type.Load:
            this.textureButton = common_texture("button_load.png");
            this.textureButtonOver = common_texture("button_load_hover.png");
            break;

        case Button.type.Filter:
            this.textureButton = common_texture("button_filter.png");
            this.textureButtonOver = common_texture("button_filter_hover.png");
            break;

        case Button.type.Draw:
            this.textureButton = common_texture("button_draw.png");
            this.textureButtonOver = common_texture("button_draw_hover.png");
            break;

        case Button.type.Up:
            this.textureButton = common_texture("button_up.png");
            this.textureButtonOver = common_texture("button_up_hover.png");
            break;
        case Button.type.Down:
            this.textureButton = common_texture("button_down.png");
            this.textureButtonOver = common_texture("button_down_hover.png");
            break;
        case Button.type.Left:
            this.textureButton = common_texture("button_left.png");
            this.textureButtonOver = common_texture("button_left_hover.png");
            break;
        case Button.type.Right:
            this.textureButton = common_texture("button_right.png");
            this.textureButtonOver = common_texture("button_right_hover.png");
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

