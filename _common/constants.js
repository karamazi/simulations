var textureButton = common_texture("button.png");
var textureButtonOver =common_texture("buttonOver.png");

var textureSwitch = common_texture("start.png");
var textureSwitchDown = common_texture("stop.png");
var textureSwitchOver = common_texture("start_hover.png");
var textureSwitchDownOver = common_texture("stop_hover.png");

var textureLogo = common_texture("logo_mermidon.png");

var textureHelp = PIXI.Texture.fromImage("imgs/help.png");



var centeredAnchor = new PIXI.Point(0.5,0.5);
var centeredTextAnchor = new PIXI.Point(0.5,0.5);
var isFirefox = typeof InstallTrigger !== 'undefined';
if(isFirefox){
    centeredTextAnchor.y=0.3;
}

var defaultTextStyle = { font: "16px OpenSans", fill: "#ffffff", align: "left" };
var blueTextStyle = { font: "20px OpenSans", fill: "#369bd7", align: "left" };
var blueTextStyleBold = { font: "20px OpenSans Bold", fill: "#369bd7", align: "left" };
var blueMonoSpacedStyle = { font: "30px Ubuntu", fill: "#369bd7", align: "left" };

function common_texture(name){
    return PIXI.Texture.fromImage("../_common/imgs/"+name);
}