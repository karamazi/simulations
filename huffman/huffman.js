
var textureBall = PIXI.Texture.fromImage("imgs/ball.png");


var msgEnum = Object.freeze({"Ok":1, "Error":2, "Info":3, "Special":4})

//CONSTANTS---------START
var textStyle = { font: "bold 25px Comic Sans MS", fill: "#ffffcc", align: "left" };
var smallTextFont = "bold 20px Arial";

var textFont = "bold 20px Comic Sans MS";
var textFill = "#ffffcc";
//CONSTANTS-----------END
DefaultText = function (stage, x, y,text) {
    this.text = new PIXI.Text(text, textStyle);
    this.text.position.x = x;
    this.text.position.y = y;
    stage.addChild(this.text);
};
DefaultText.prototype.remove = function (stage) {
    stage.removeChild(this.text);
};
DefaultText.prototype.setText = function (text) {
    this.text.setText(text);
};


Ball = function () {
    var self = this;

    this.value = 0;
    this.sprite = new PIXI.Sprite(textureBall);
    this.text = new PIXI.Text(this.value, defaultTextStyle);


    this.isClicked = false;
    this.isChanged = false;
    this.isInactive = false;

    this.slowDown = 50;
    this.isMoving = false;
    this.movVect = null;
    this.movProgressVect = null;
    this.stepVect = null;

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.anchor = centeredAnchor;
    this.text.position = this.sprite.position;
    this.text.anchor = centeredTextAnchor;

    this.sprite.click = this.sprite.tap = function (data) {
        self.isClicked = true;
    }
}

Ball.prototype.setValue = function (val) {
    this.value = val;
    this.text.setText(val);
}
Ball.prototype.init = function (stage, x, y, value) {
    this.value = value;
    this.text.setText(value);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    stage.addChild(this.sprite);
    stage.addChild(this.text);
};

Ball.prototype.makeInactive = function () {
    this.isInactive = true;
    this.text.alpha = 0.3;
    this.sprite.alpha = 0.3;
    //this.sprite.setTexture(textureBallInactive)
}
Ball.prototype.moveBy = function (x, y) {
    this.isMoving = true;
    this.movVect = new PIXI.Point(x, y);
    this.stepVect = new PIXI.Point(x / this.slowDown, y / this.slowDown);
    this.movProgressVect = new PIXI.Point(0, 0);
}
Ball.prototype.moveTo = function (x, y) {
    var direction = new PIXI.Point(x - this.sprite.x, y - this.sprite.y);
    this.moveBy(direction.x, direction.y);
};

Ball.prototype.update = function () {
    this.isClicked = false;
    if (this.isMoving) {
        this.sprite.position.x += this.stepVect.x;
        this.sprite.position.y += this.stepVect.y;
        this.movProgressVect.x += this.stepVect.x;
        this.movProgressVect.y += this.stepVect.y;
        if (Math.abs(this.movProgressVect.x) >= Math.abs(this.movVect.x)
			&& Math.abs(this.movProgressVect.y) >= Math.abs(this.movVect.y)) {
            this.isMoving = false;
        }
    }
};
Ball.prototype.reset = function (x, y, val) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.isMoving = false;
    this.isChanged = false;
    this.setValue(val);
    this.isInactive = false;
    this.text.alpha = 1;
    this.sprite.alpha = 1;
    this.sprite.setTexture(textureBall);
};
Ball.prototype.setPosition = function (x, y) {
    var p = new PIXI.Point(x, y);
    this.sprite.position = p;
    this.text.position = p;
};
Ball.prototype.remove = function (stage) {
    stage.removeChild(this.sprite);
    stage.removeChild(this.text);
};


Leaf = function () {
    Ball.call(this);
    this.parent = null;
    this.left = null;
    this.right = null;
};
Leaf.prototype = Object.create(Ball.prototype);
Leaf.prototype.constructor = Leaf;

Leaf.prototype.clearNodes = function () {
    this.parent = null;
    this.left = null;
    this.right = null;
};


