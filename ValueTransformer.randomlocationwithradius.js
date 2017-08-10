var ValueTransformer = function () {

    this.displayName = "Random Location with Radius";
    this.shortDescription = "Generate";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-RandomLocationWithRadius";

    this.parameters = function () {

        var mapDefaultValues = {
            latitude: 8.0,
            longitude: 11.0,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
            mapType: 0
        }
        var mapParameter = {
            name: "locationMap",
            displayName: "Map Location",
            description: "Zoom and center region on map",
            type: "Map",
            defaultValue: mapDefaultValues
        };

        var radius = {
            name: "radius",
            displayName: "Radius",
            description: "Select random radius in meters",
            type: "Number",
            defaultValue: 1000
        };
        
        var stringUIParam = { 
			name: "separator", 
			type: "String", 
			displayName: "Lat & Lon separated by", description: "In case of joined Latitude & Longitude output, separator will be used.", 
			defaultValue: ","
		};
        
        var popupDefaultValue = [ 
			{ displayName: "Latitude", value: "lat" },
			{ displayName: "Longitude", value: "lon" },
			{ displayName: "Latitude & Longitude using separator", value: "lat_sep_lon" },
			{ displayName: "longitude & Latitude using separator", value: "lon_sep_lat" },
		];
    	var popupUIParam = { 
			name: "output", 
			type: "Popup", 
			displayName: "Output as", 
			description: "Select output options.",
			defaultValue: popupDefaultValue 
		};


        return [mapParameter, radius, outputsParameter];
    };

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters) {

        var latitude = parameters.locationMap.latitude;
        var longitude = parameters.locationMap.longitude;
        var radius = parameters.radius;
        var output = (Array.isArray(parameters.output) == true) ? "lat" :  parameters.output;
        var separator = (parameters.separator === undefined) ? "," : parameters.separator;

        var r = radius / 111300,
            y0 = latitude,
            x0 = longitude,
            u = Math.random(),
            v = Math.random(),
            w = r * Math.sqrt(u),
            t = 2 * Math.PI * v,
            x = w * Math.cos(t),
            y1 = w * Math.sin(t),
            x1 = x / Math.cos(y0)

        var newLatitude = y0 + y1
        var newLongitude = x0 + x1        

        if (output == "lat") { return newLatitude; }
        if (output == "lon") { return newLongitude; }
        if (output == "lat_sep_lon") { return newLatitude + separator + newLongitude; }
        if (output == "lon_sep_lat") { return newLongitude + separator + newLatitude; }
        return "Error";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
