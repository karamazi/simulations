var centeredAnchor = new PIXI.Point(0.5, 0.5);

function load_pc_texture(type){
    return PIXI.Texture.fromImage("imgs/pc_"+type+".png");
}
function load_bar_texture(type, power){
    return PIXI.Texture.fromImage("imgs/bar"+power+"_"+type+".png");
}

var inactivePc = load_pc_texture("inactive");
var inactiveBar1 = load_bar_texture("inactive",1);
var inactiveBar2 = load_bar_texture("inactive",2);
var inactiveBar3 = load_bar_texture("inactive",3);

function get_inactive_bar(power){
    switch(power){
        case 1:
            return inactiveBar1;
        case 2:
            return inactiveBar2;
        case 3:
            return inactiveBar3;
    }
}


ButtonGroup = function (stage, x, y, sort_type) {
    this.buttons = [];
    this.activeInd = 0;
    this.value = 0.001	;
    this.buttons.push(new ComputerButton(stage, x, y, 0.001, sort_type, 1));
    this.buttons.push(new ComputerButton(stage, x + 50, y, 0.000001, sort_type, 2));
    this.buttons.push(new ComputerButton(stage, x + 100, y, 0.000000001, sort_type,3 ));

    var labelTexture = PIXI.Texture.fromImage("imgs/label_"+sort_type+".png");
    this.label = new PIXI.Sprite(labelTexture);
    this.label.position = new PIXI.Point(x+50,y-50);
    this.label.anchor = centeredAnchor;
    stage.addChild(this.label);
    this.updateColors();
};
ButtonGroup.prototype.update = function () {
    var swap=false;
    for (var i = 0; i < this.buttons.length; i++) {
        if (this.buttons[i].isClicked) {
            this.activeInd = i;
            this.value = this.buttons[i].value;
            swap=true;
        }   
        this.buttons[i].update();
    }
    if (swap)
        this.updateColors();
    
};
ButtonGroup.prototype.updateColors=function(){
    for (var i = 0; i < this.buttons.length; i++) {
        if (i == this.activeInd)
            this.buttons[i].makeActive(true);
        else
            this.buttons[i].makeActive(false);
    }
};

ComputerButton = function (stage, x, y, value, type, power) {
    this.value = value;
    this.isClicked = false;
    var self = this;
    this.power = power;

    this.activeTexture = load_pc_texture(type);
    this.activeBar = load_bar_texture(type, power);

    this.barSprite = new PIXI.Sprite(this.activeBar);
    this.barSprite.position.x = x;
    this.barSprite.position.y = y+40;
    this.barSprite.anchor = centeredAnchor;

    this.pcSprite = new PIXI.Sprite(this.activeTexture);
    this.pcSprite.position.x = x;
    this.pcSprite.position.y = y;
    this.pcSprite.anchor = centeredAnchor;
    this.pcSprite.interactive = true;
    this.pcSprite.buttonMode = true;

    this.pcSprite.click = function (data) {
        self.isClicked = true;
    };

    stage.addChild(this.pcSprite);
    stage.addChild(this.barSprite);
};
ComputerButton.prototype.update = function () {
    this.isClicked = false;
};

ComputerButton.prototype.makeActive = function (isActive) {
    if(isActive){
        this.pcSprite.texture = this.activeTexture;
        this.barSprite.texture = this.activeBar;
    }else{
        this.pcSprite.texture = inactivePc;
        this.barSprite.texture = get_inactive_bar(this.power);
    }
};

var data = {
    labels: [""],
    name: "eee",
    datasets: [
        {
            label: "Count Sort",
            fillColor: "rgba(54,155,215,0.2)",
            strokeColor: "rgba(54,155,215,1)",
            pointColor: "rgba(54,155,215,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(54,155,215,1)",
            data: [0]
        },
        {
            label: "Bubble Sort",
            fillColor: "rgba(164,219,0,0.2)",
            strokeColor: "rgba(164,219,0,1)",
            pointColor: "rgba(164,219,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(164,219,0,1)",
            data: [0]
        },
        {
            label: "Quick Sort",
            fillColor: "rgba(158,186,202,0.2)",
            strokeColor: "rgba(158,186,202,1)",
            pointColor: "rgba(158,186,202,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(158,186,202,1)",
            data: [0]
        }

    ]
};

var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - If there is a stroke on each bar
    barShowStroke: true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%>"+
        "</ul>"
    //scaleOverride: true,
    //scaleStartValue: 0,
    //scaleStepWidth: 15, 
    //scaleSteps: 30
}

