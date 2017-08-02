var ValueTransformer = function () {

    this.displayName = "Random Boolean value";
    this.shortDescription = "Generate true values with 50% of chance.";
    this.isEditingDisabled = true;
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        var chance = (Math.random() * 100);
        return (chance <= 50);
    };
}

function sjeClass() {
    return new ValueTransformer();
}