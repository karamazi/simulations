
//CONSTANTS-----------END
Division = function (stage, x, y, value, base) {
    this.value = value;
    this.base = base;
    this.result = -1;
    this.leftOver = -1;
    this.leftOverText = "";
    this.isCalcd = false;

    this.initText = new MyText(stage, x, y, value + " / " + base, blueTextStyle, false);
    this.resultText = new MyText(stage,x+220, y, "", blueTextStyle, false);
};

Division.prototype.calcResult = function () {
    this.result = Math.floor(this.value / this.base);
    this.leftOver = this.value % this.base;
    if (this.leftOver == 10)
        this.leftOverText = "A";
    else if (this.leftOver == 11)
        this.leftOverText = "B";
    else if (this.leftOver == 12)
        this.leftOverText = "C";
    else if (this.leftOver == 13)
        this.leftOverText = "D";
    else if (this.leftOver == 14)
        this.leftOverText = "E";
    else if (this.leftOver == 15)
        this.leftOverText = "F";
    else
        this.leftOverText = this.leftOver;

    this.initText.setText(this.value + " / " + base+" = "+this.result);
    this.resultText.setText("+r " + this.leftOverText);
    this.isCalcd = true;
};

Division.prototype.clearStage = function (stage) {
    stage.removeChild(this.initText.text);
    stage.removeChild(this.resultText.text);
};