var ValueTransformer = function () {

    this.displayName = "Base64 encoded string";
    this.shortDescription = "Generate Base64 encoded string from input string.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-Base64Encode";
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        var encoded = DocumentModel.base64Encode(inputValue);
        return encoded;
    };
}

function sjeClass() {
    return new ValueTransformer();
}
