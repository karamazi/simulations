var blueTextStyle = { font: "17px OpenSans", fill: "#369bd7", align: "left" };
var blueTextStyleBold = { font: "17px OpenSans Bold", fill: "#369bd7", align: "left" };

Neuron = function (stage, x, y) {

    this.weight1 = 0;
    this.weight2 = 0;
    this.input1 = 0;
    this.input2 = 0;
    this.output = 0;
    this.correction1 = 0;
    this.correction2 = 0;
    this.learningFactor = 0;

    var textSpacing = 30;
    var valuesDistance = 220;
    this.inputTextDesc = new MyText(stage, x, y, "Sygnał wejściowy:", blueTextStyle, false);
    this.inputText = new MyText(stage, x + valuesDistance, y, "", blueTextStyleBold, false);
    this.weightTextDesc = new MyText(stage, x, y + textSpacing, "Wagi wejściowe:", blueTextStyle, false);
    this.weightText = new MyText(stage, x + valuesDistance, y + textSpacing, "", blueTextStyleBold, false);
    this.outputTextDesc = new MyText(stage, x, y + textSpacing * 3, "Syngał wyjściowy:", blueTextStyle, false);
    this.outpuText = new MyText(stage, x + valuesDistance, y + textSpacing * 3, "", blueTextStyleBold, false);

    this.learningFactorTextDesc = new MyText(stage, x, y + textSpacing * 5, "Współczynnik uczenia:", blueTextStyle, false);
    this.learningFactorText = new MyText(stage, x + valuesDistance, y + textSpacing * 5, "", blueTextStyleBold, false);
    this.correctionTextDesc = new MyText(stage, x, y + textSpacing * 6, "Korekcja wag:", blueTextStyle, false);
    this.correctionText = new MyText(stage, x + valuesDistance, y + textSpacing * 6, "", blueTextStyleBold, false);

    this.correctedWeightTextDesc = new MyText(stage, x, y + textSpacing * 7, "Skorygowane wagi:", blueTextStyle, false);
    this.correctedWeightText = new MyText(stage, x + valuesDistance, y + textSpacing * 7, "", blueTextStyleBold, false);

};

Neuron.prototype.setWeights = function (w1, w2) {
    this.weight1 = w1;
    this.weight2 = w2;
    this.weightText.setText(round2(this.weight1) + "  " + round2(this.weight2));
};

Neuron.prototype.setLearningFactor = function (factor) {
    this.learningFactor = factor;
    this.learningFactorText.setText(round2(this.learningFactor));
};

Neuron.prototype.setInputs = function (input1, input2) {
    this.input1 = input1;
    this.input2 = input2;
    this.inputText.setText(round2(this.input1) + "  " + round2(this.input2));
};

Neuron.prototype.calculateOutput = function () {
    var y = this.input1 * this.weight1 + this.input2 * this.weight2;
    //this.output = 0.8*y+1;
    this.output = y > 0 ? 1 : y < 0 ? -1 : 0;
    this.outpuText.setText(round2(this.output));
};

Neuron.prototype.calculateCorrection = function () {
    this.correction1 = this.learningFactor * this.input1 * this.output;
    this.correction2 = this.learningFactor * this.input2 * this.output;
    this.correctionText.setText(round2(this.correction1) + "  " + round2(this.correction2));
};
Neuron.prototype.setCorrectedWeights = function () {
    var corrected1 = this.weight1 + this.correction1;
    var corrected2 = this.weight2 + this.correction2;
    this.correctedWeightText.setText(round2(corrected1) + "  " + round2(corrected2));
};
Neuron.prototype.correctWeights = function () {
    this.setWeights(this.weight1 + this.correction1, this.weight2 + this.correction2);
};

Neuron.prototype.processInputDataPair = function (input1, input2) {
    this.setInputs(input1, input2);
    this.correctWeights();
    this.calculateOutput();
    this.calculateCorrection();
    this.setCorrectedWeights();

};
Neuron.prototype.clear = function () {
    this.inputText.setText("");
    this.outpuText.setText("");
    this.correctionText.setText("");
    this.correctedWeightText.setText("");
};

function round2(x) {
    return parseFloat(Math.round(x * 100) / 100).toFixed(2);
}