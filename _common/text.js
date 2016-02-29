

MyText = function (stage, x, y, text, style, anchor) {
    if(style=== undefined){
        style = defaultTextStyle;
    }
    this.text = new PIXI.Text(text, style);
    this.text.position.x = x;
    this.text.position.y = y;

    if(anchor===undefined){
        this.text.anchor = centeredTextAnchor;
    }
    else if(anchor!==undefined && anchor!==false){
        this.text.anchor=anchor;
    }else if(anchor===false){
        this.text.anchor=noAnchor;
    }
    stage.addChild(this.text);
};

MyText.prototype.setText = function(text){
    this.text.setText(text);
};
MyText.prototype.remove = function(stage){
    stage.removeChild(this.text);
};