

MyText = function (stage, x, y, text, style) {
    if(style=== undefined){
        style = defaultTextStyle;
    }
    this.text = new PIXI.Text(text, style);
    this.text.position.x = x;
    this.text.position.y = y;
    this.text.anchor = centeredAnchor;
    stage.addChild(this.text);
};

MyText.prototype.setText = function(text){
    this.text.setText(text);
};