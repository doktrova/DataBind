
//Author: Don Oktrova 2014
function DataBind(templateElement, data, rootDataKey) {
    var children = templateElement.getElementsByTagName("*");
    var templateHTML = templateElement.innerHTML;
    var currentElement;

    for (var c = 0; c < children.length; c++) {
        currentElement = children[c];

        for (var a = 0; a < children[c].attributes.length; a++) {
            if (currentElement.attributes[a].name.indexOf("data-") != -1) {
                var dataKey = currentElement.attributes[currentElement.attributes[a].name].value;
                var dataKeys;
                var dataValue;
                var attributeName = currentElement.attributes[a].name.replace("data-", "");

                //Parse data keys
                if (dataKey.indexOf(rootDataKey) != -1)
                    dataKey = dataKey.replace(rootDataKey + ".", "");
                else if (rootDataKey != null)
                    continue;

                //Assigning dataValue from the proper hierarchy
                if (dataKey.indexOf(".") != -1) {
                    dataKeys = dataKey.split(".");
                    switch (dataKeys.length) {
                        case 2:
                            if (data[dataKeys[0]] != null)
                                dataValue = data[dataKeys[0]][dataKeys[1]];
                            break;
                        case 3:
                            if (data[dataKeys[0]][dataKeys[1]] != null)
                                dataValue = data[dataKeys[0]][dataKeys[1]][dataKeys[2]];
                            break;
                    }
                } else {
                    dataValue = data[dataKey];
                }

                //Arrays Handling
                if (Array.isArray(dataValue)) {
                    var boundHtml = "";
                    for (var d = 0; d < dataValue.length; d++)
                        boundHtml += this.DataBind(currentElement, dataValue[d], dataKey, d);
                    currentElement.innerHTML = boundHtml;
                } else if (dataValue != null && attributeName != null) {
                    switch (attributeName) {
                        case "text":
                            currentElement.textContent += dataValue;
                            break;
                        default:
                            var currentAttrValue = currentElement.getAttribute(attributeName);
                            currentElement.setAttribute(attributeName, currentAttrValue + dataValue);
                            break;
                    }
                }
            }
        }
    }

    //Reset Template
    var boundElement = templateElement.innerHTML;
    templateElement.innerHTML = templateHTML;
    return boundElement;
}
