var textureButton = common_texture("button.png");
var textureButtonOver =common_texture("buttonOver.png");

var textureHelpButton = common_texture("button_help.png");
var textureHelpButtonOver =common_texture("button_help_hoover.png");

var texturePlusButton = common_texture("button_plus.png");
var texturePlusButtonOver =common_texture("button_plus_hoover.png");

var texturePlusTextButton = common_texture("button_plus_text.png");
var texturePlusTextButtonOver =common_texture("button_plus_text_hoover.png");

var textureMinusButton = common_texture("button_minus.png");
var textureMinusButtonOver =common_texture("button_minus_hoover.png");

var textureResetButton = common_texture("button_reset.png");
var textureResetButtonOver =common_texture("button_reset_hoover.png");

var textureNextButton = common_texture("button_next.png");
var textureNextButtonOver =common_texture("button_next_hoover.png");

var texturePreviousButton = common_texture("button_previous.png");
var texturePreviousButtonOver =common_texture("button_previous_hoover.png");

var textureRerollButton = common_texture("button_reroll.png");
var textureRerollButtonOver =common_texture("button_reroll_hoover.png");

var textureEncodeButton = common_texture("button_encode.png");
var textureEncodeButtonOver =common_texture("button_encode_hoover.png");

var textureDecodeButton = common_texture("button_decode.png");
var textureDecodeButtonOver =common_texture("button_decode_hoover.png");

var textureOnpButton = common_texture("button_onp.png");
var textureOnpButtonOver =common_texture("button_onp_hoover.png");

var textureLoadButton = common_texture("button_load.png");
var textureLoadButtonOver =common_texture("button_load_hoover.png");

var textureFilterButton = common_texture("button_filter.png");
var textureFilterButtonOver =common_texture("button_filter_hoover.png");

var textureDrawButton = common_texture("button_draw.png");
var textureDrawButtonOver =common_texture("button_draw_hoover.png");

var textureUpButton = common_texture("button_up.png");
var textureUpButtonOver =common_texture("button_up_hoover.png");

var textureDownButton = common_texture("button_down.png");
var textureDownButtonOver =common_texture("button_down_hoover.png");

var textureRightButton = common_texture("button_right.png");
var textureRightButtonOver =common_texture("button_right_hoover.png");

var textureLeftButton = common_texture("button_left.png");
var textureLeftButtonOver =common_texture("button_left_hoover.png");


var textureSwitch = common_texture("start.png");
var textureSwitchDown = common_texture("stop.png");
var textureSwitchOver = common_texture("start_hoover.png");
var textureSwitchDownOver = common_texture("stop_hoover.png");

var textureLogo = common_texture("logo_mermidon.png");

var textureHelp = PIXI.Texture.fromImage("imgs/help.png");



var centeredAnchor = new PIXI.Point(0.5,0.5);

var defaultTextStyle = { font: "16px OpenSans", fill: "#ffffff", align: "left" };
var blueTextStyle = { font: "20px OpenSans", fill: "#369bd7", align: "left" };
var blueTextStyleBold = { font: "20px OpenSans Bold", fill: "#369bd7", align: "left" };
var blueMonoSpacedStyle = { font: "30px Ubuntu", fill: "#369bd7", align: "left" };

function common_texture(name){
    return PIXI.Texture.fromImage("../_common/imgs/"+name);
}