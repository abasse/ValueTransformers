var ValueTransformer = function () {

    this.displayName = "Hex color generator";
    this.shortDescription = "Random web hex color generator.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-HexColor";
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        return color;
    };
}

function sjeClass() {
    return new ValueTransformer();
}
