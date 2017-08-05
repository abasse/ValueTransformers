var ValueTransformer = function () {
    
    this.displayName = "Random String from List";
    this.shortDescription = "Random values from text list divided by coma, semicolon, etc."
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/swiftjsoneditor/PublicDocuments/wiki/ValueTransformer-TextListRandomValues";
    
    this.parameters = function () {
		
		var dividedByUIParameter = { 
			name: "dividor",
			type: "String", 
			displayName: "Separated By", 
			description: "Select your separator such ( , ; )", 
			defaultValue: "," 
		};
		
		var booleanUIParam = { 
			name: "trim",
			type: "Bool", 
			displayName: "Trim White Space", 
			description: "If enabled, separated values will be trimmed.", 
			defaultValue: true 
		};

		var textUIParam = { 
			name: "text", 
			type: "Text", 
			displayName: "List Values", 
			description: "List your values separated by your separator sign.",
			defaultValue: "Value1, Value2, Value3, Value4"
		};
		
		var segmentsDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsUIParam = {
            type: "Segments",
            name: "output", 
            displayName: "Output",
            description: "Select how to output the value.", 
            defaultValue: segmentsDefaultValues 
        };

        return [dividedByUIParameter,booleanUIParam, textUIParam, segmentsUIParam];
    }
   
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
		var dividor = (parameters.dividor === undefined) ? "," : parameters.dividor;
		var valueList = parameters.text;
		var trim = parameters.trim;
		var value = ""
		
		var list = valueList.split(dividor); 
		var index = randomArrayIndex(list.length);
		value = list[index];
		if (trim == true) {
			value = value.trim();
		}
		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return value;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		}

        return parameters.paramName;
    };
	
	function randomArrayIndex(max) {
    	return Math.floor(Math.random() * max);
	}
}

// Requiered global function
function sjeClass() {
    return new ValueTransformer();
}

