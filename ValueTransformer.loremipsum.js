var ValueTransformer = function () {

    this.displayName = "Lorem Ipsum Generator";
    this.shortDescription = "Generate fake text in popular format.";
    this.isEditingDisabled = true;

    this.parameters = function () {

        var itemsUIParameter = {
            type: "Number",
            name: "items",
            displayName: "Number of items",
            description: "Select number of items you want to generate",
            defaultValue: 50
        };

        var popupDefaultValue = [
            { displayName: "Words", value: "words" },
            { displayName: "Sentences", value: "sentences" },
            { displayName: "Paragraphs", value: "paragraphs" },
            { displayName: "Random", value: "random" }
        ];

        var popupUIParam = {
            name: "popup",
            type: "Popup",
            displayName: "Item Type",
            description: "Select Character type",
            defaultValue: popupDefaultValue
        };

        var segmentsOutputDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace", enabled: 1 },
            { displayName: "Append", enabled: 0 }
        ];

        var segmentsOutputUIParam = {
            type: "Segments",
            name: "output",
            displayName: "Output",
            description: "Prepend, replace or append value.",
            defaultValue: segmentsOutputDefaultValues
        };

        return [itemsUIParameter, popupUIParam, segmentsOutputUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var timestamp = DocumentModel.unixTimestamp();

        var numberOfItems = parameters.items;
        var type = (parameters.popup === undefined) ? words :  parameters.popup;
        var value = "";

        if (type == "words") {
            value = generateWords(numberOfItems);
        }
        if (type == "sentences") {
            value = generateSentences(numberOfItems);
        }
        if (type == "paragraphs") {
            value = generateParagraphs(numberOfItems);
        }
        if (type == "random") {
            value = generateRandom(numberOfItems);
        }

        if (parameters.output[0].enabled == 1) {
            return value + inputValue;
        };
        if (parameters.output[1].enabled == 1) {
            return value;
        };
        if (parameters.output[2].enabled == 1) {
            return inputValue + value;
        };
    };

    function templateArray() {
        
        var list = "alias consequatur aut perferendis sit voluptatem accusantium doloremque aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis nemo enim ipsam voluptatem quia voluptas sit suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae et iusto odio dignissimos ducimus qui blanditiis praesentium laudantium totam rem voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident sed ut perspiciatis unde omnis iste natus error similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo porro quisquam est qui minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos et accusamus officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores doloribus asperiores repellat";

        var listArray = list.split(" ");
        return listArray;
    }

    function generateWords(count) {
        
        var list = templateArray();
        var items = [];
        for (var i = 0; i < count; i++) {
            var item = list[randomIndex(list.length)];
            items.push(item);
        }

        return items.join(" ");
    }

    function generateSentences(count) {
        
        var minCount = 4;
        var maxCount = 16;
        var items = [];
        for (var i = 0; i < count; i++) {
            var words = generateWords(randomInteger(minCount, maxCount));
            words = capitalizeFirstLetter(words);
            words = words + ".";

            items.push(words);
        }

        return items.join(" ");
    }

    function generateParagraphs(count) {

        var minCount = 3;
        var maxCount = 9;

        var items = [];
        for (var i = 0; i < count; i++) {
            var sentences = generateSentences(randomInteger(minCount, maxCount));
            items.push(sentences);
        }

        return items.join("\n\n");
    }

    function generateRandom(count) {
        
        var randomItem = randomIndex(3);
        if (randomItem == 0) {
            var minCount = 1;
            var maxCount = 8;
            return generateWords(randomInteger(minCount, maxCount));
        }
        if (randomItem == 1) {
            var minCount = 1;
            var maxCount = 5;
            return generateSentences(randomInteger(minCount, maxCount));
        }
        if (randomItem == 2) {
            var minCount = 1;
            var maxCount = 6;
            return generateParagraphs(randomInteger(minCount, maxCount));
        }
    }

    // Helpers

    function randomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function sjeClass() {
    return new ValueTransformer();
}