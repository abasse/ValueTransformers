var ValueTransformer = function () {
    
    this.displayName = "Json Path";
    this.shortDescription = "Extract values from other Project Nodes using jsonPath.";
    this.isEditingDisabled = true;

    this.parameters = function () {
        
        var projectId = { 
            type: "String",
            name: "projectId",
            displayName: "Project Id", 
            description: "Select ProjectID from project browser.", 
            defaultValue: "" 
        };
        
        var jsonPath = { 
            type: "String",
            name: "jsonPath", 
            displayName: "Json Path",
            description: "Navigate to item and select \"Copy to Clipboard > Json Path Relative\"",
            defaultValue: ""
        };
        
        var segmentsDefaultValues = [
            { displayName: "Sequencial", enabled: 1 }, 
            { displayName: "Random" , enabled: 0 }
        ];
        
        var segmentsUIParam = { 
            type: "Segments",
            name: "segments", 
            displayName: "Index",
            description: "More info...",
            defaultValue: segmentsDefaultValues
        };
        
        var segmentsOutputDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsOutputUIParam = { 
            type: "Segments", 
            name: "output",
            displayName: "Output", 
            description: "Prepend, replace or append value.", 
            defaultValue: segmentsOutputDefaultValues 
        };
        
        return [projectId, jsonPath, segmentsUIParam, segmentsOutputUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters) {
        
        var projectId = parameters.projectId;
        var jsonPath = parameters.jsonPath;
        
        if (projectId == undefined || projectId == "") { return "Error: Project Id parameter is undefined"; };
        if (jsonPath == undefined || jsonPath == "") { return "Error: Json Path parameter is undefined"; };
        
        var result = DocumentModel.jsonPath(projectId,jsonPath)
        if (result == undefined) { return "Error: Json Path produced undefined results";};
        if (result.count == 0) { return "Error: Json Path produced 0 results";};
        
        var index = 0;
        
        if (parameters.segments[0].enabled == 1) {
            index = arrayIndex % result.length;
        }
        
        if (parameters.segments[1].enabled == 1) {
            index = getRandomArbitrary(0,result.length);
            DocumentModel.log(index);
        }
        
        var jsonNode = result[index];
        if (jsonNode == undefined) {return "Error: Json Path produced undefined results"; }
        DocumentModel.log(index);
        
        
        if (jsonNode.isContainer == 1) { return "Error: Json Node at path is a container";};
        var value = jsonNode.value
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
        return ""
    };
    
    function getRandomArbitrary(min, max) {
        var doubleValue =  Math.random() * (max - min) + min;
        return parseInt(doubleValue);
    };
}

function sjeClass() {
    return new ValueTransformer();
}
