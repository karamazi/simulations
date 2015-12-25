

MyText = function (stage, x, y, text, style, anchor) {
    if(style=== undefined){
        style = defaultTextStyle;
    }
    this.text = new PIXI.Text(text, style);
    this.text.position.x = x;
    this.text.position.y = y;

    if(anchor===undefined){
        this.text.anchor = centeredAnchor;
    }
    else if(anchor!==undefined && anchor!==false){
        this.text.anchor=anchor;
    }
    stage.addChild(this.text);
};

MyText.prototype.setText = function(text){
    this.text.setText(text);
};