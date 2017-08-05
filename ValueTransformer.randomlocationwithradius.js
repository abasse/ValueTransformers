var ValueTransformer = function () {

    this.displayName = "Random Location with Radius";
    this.identifier = "com.swiftjsoneditor.valueplugin.icloud.randomlocationwithradius";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/swiftjsoneditor/PublicDocuments/wiki/ValueTransformer-RandomLocationWithRadius";

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

        var outupsDefaultValues = [{
            name: "latitude",
            displayName: "Latitude",
            enabled: 1
                                   }, {
            name: "longitude",
            displayName: "Longitude",
            enabled: 0
                                   }];
        var outputsParameter = {
            name: "output",
            displayName: "Output value of",
            description: "Select output option for plugin",
            type: "Options",
            defaultValue: outupsDefaultValues
        };

        return [mapParameter, radius, outputsParameter];
    };

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters) {

        var latitude = parameters.locationMap.latitude;
        var longitude = parameters.locationMap.longitude;
        var radius = parameters.radius;

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

        if (parameters.output[0].enabled == 1) { return newLatitude; }
        if (parameters.output[1].enabled == 1) { return newLongitude; }
        return "Error";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
