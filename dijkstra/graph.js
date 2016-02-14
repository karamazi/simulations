var centerAnchor = new PIXI.Point(0.5, 0.5);
var distanceTextStyle = { font: "bold 25px Comic Sans MS", fill: "#cc9999", align: "left" };
var textureBall = PIXI.Texture.fromImage("imgs/node_unvisited.png");
var textureBallGolden = PIXI.Texture.fromImage("imgs/node_visited.png");
var textureBallGreen = PIXI.Texture.fromImage("imgs/node_active.png");
var nodeStyle = { font: "25px OpenSans", fill: "#ffffff", align: "left" };
var pathStyle = { font: "22px OpenSans", fill: "#369bd7", align: "left" };

Node = function(stage, x, y, nodeName, nodeIndex){
    this.x=x;
    this.y=y;
    this.index=nodeIndex;
    this.sprite = new PIXI.Sprite(textureBall);
    stage.addChild(this.sprite);
    this.text = new MyText(stage, x, y, nodeName, nodeStyle);
    this.pathText = new MyText(stage, x+15, y-30, "?", pathStyle);
    //this.pathText.text.anchor = new PIXI.Point(1,1);
    this.sprite.position = this.text.text.position;
    this.sprite.anchor = centerAnchor;


    this.neighbours = [];
    this.distances = [];
    this.visited = false;

};

Node.prototype.addNeighbour = function(neighbourNode, neighbourDistance){
    this.neighbours.push(neighbourNode);
    this.distances.push(neighbourDistance);
};

Node.prototype.clearConnections = function(){
    this.neighbours = [];
    this.distances = [];
};

Node.prototype.makeVisited=function(){
    this.visited = true;
    this.sprite.setTexture(textureBallGolden);
};
Node.prototype.highlight=function(){
    this.visited = true;
    this.sprite.setTexture(textureBallGreen);
};

Node.prototype.clearVisited=function(){
    this.visited = false;
    this.sprite.setTexture(textureBall);
};

Node.prototype.setShortestDistanceText=function(distance){
    this.pathText.text.setText(distance);
}