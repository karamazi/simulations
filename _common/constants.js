var textureButton = common_texture("button.png");
var textureButtonDown = common_texture("buttonDown.png");
var textureButtonOver =common_texture("buttonOver.png");

var textureHelpButton = common_texture("button_help.png");
var textureHelpButtonDown = common_texture("button_help.png");
var textureHelpButtonOver =common_texture("button_help_hoover.png");

var texturePlusButton = common_texture("button_plus.png");
var texturePlusButtonDown = common_texture("button_plus.png");
var texturePlusButtonOver =common_texture("button_plus_hoover.png");

var textureMinusButton = common_texture("button_minus.png");
var textureMinusButtonDown = common_texture("button_minus.png");
var textureMinusButtonOver =common_texture("button_minus_hoover.png");

var textureResetButton = common_texture("button_reset.png");
var textureResetButtonDown = common_texture("button_reset.png");
var textureResetButtonOver =common_texture("button_reset_hoover.png");

var textureNextButton = common_texture("button_next.png");
var textureNextButtonDown = common_texture("button_next.png");
var textureNextButtonOver =common_texture("button_next_hoover.png");

var textureSwitch = common_texture("start.png");
var textureSwitchDown = common_texture("stop.png");
var textureSwitchOver = common_texture("start_hoover.png");
var textureSwitchDownOver = common_texture("stop_hoover.png");

var textureLogo = common_texture("logo_mermidon.png");

var textureHelp = PIXI.Texture.fromImage("imgs/help.png");



var centeredAnchor = new PIXI.Point(0.5,0.5);

var defaultTextStyle = { font: "20px Comic Sans MS", fill: "#ffffff", align: "left" };
var blueTextStyle = { font: "20px Comic Sans MS", fill: "#369bd7", align: "left" };

function common_texture(name){
    return PIXI.Texture.fromImage("../_common/imgs/"+name);
}