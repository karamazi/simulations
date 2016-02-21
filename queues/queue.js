var textureBall = PIXI.Texture.fromImage("imgs/ball.png");
Ball = function () {
    this.value = 0;
    this.sprite = new PIXI.Sprite(textureBall);
    this.text = undefined;


    this.isClicked = false;

    this.slowDown = 50;
    this.isMoving = false;
    this.movVect = null;
    this.movProgressVect = null;
    this.stepVect = null;

    this.sprite.anchor = centeredAnchor;
};

Ball.prototype.setValue = function (val) {
    this.value = val;
    this.text.setText(val);
};

Ball.prototype.init = function (stage, x, y, value) {
    this.value = value;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    stage.addChildAt(this.sprite, 0);

    this.text = new MyText(stage, 0, 0, this.value);
    this.text.text.position = this.sprite.position;
};

Ball.prototype.moveBy = function (x, y) {
    this.isMoving = true;
    this.movVect = new PIXI.Point(x, y);
    this.stepVect = new PIXI.Point(x / this.slowDown, y / this.slowDown);
    this.movProgressVect = new PIXI.Point(0, 0);
};
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
            this.sprite.position.x-=this.movProgressVect.x-this.movVect.x;
            this.isMoving = false;
        }
    }
};
Ball.prototype.reset = function (x, y, val) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.isMoving = false;
    this.setValue(val);
    this.text.alpha = 1;
    this.sprite.alpha = 1;
    this.sprite.setTexture(textureBall);
};
Ball.prototype.setPosition = function (x, y) {
    var p = new PIXI.Point(x, y);
    this.sprite.position = p;
    this.text.text.position = this.sprite.position;
};

Ball.prototype.remove = function(stage){
    stage.removeChild(this.sprite);
    stage.removeChild(this.text.text);
};


Queue = function (stage, x, y) {
    this.stage=stage;
    this.x = x;
    this.y = y;
    this.dx = 45;
    this.objects = [];
};
Queue.prototype.push = function (o) {
    o.setPosition(this.x + this.dx * this.objects.length, this.y);
    this.objects.push(o);
};
Queue.prototype.update = function(){
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].update();
    }
};


FIFO = function (stage, x, y){
    Queue.call(this, stage, x, y);
};
FIFO.prototype = Object.create(Queue.prototype);
FIFO.prototype.constructor = FIFO;

FIFO.prototype.pop = function () {
    if(this.objects.length===0)
        return;

    var removedBall = this.objects.shift();
    removedBall.remove(this.stage);

    for(var i=0;i<this.objects.length;i++){
        this.objects[i].moveTo(this.x + this.dx * i, this.y);
    }
};

LIFO = function (stage, x, y){
    Queue.call(this, stage, x, y);
};
LIFO.prototype = Object.create(Queue.prototype);
LIFO.prototype.constructor = LIFO;

LIFO.prototype.pop = function () {
    if(this.objects.length===0)
        return;

    var removedBall = this.objects.pop();
    removedBall.remove(this.stage);
};