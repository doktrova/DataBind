
//Author: Don Oktrova 2014
//THIS VERSION IS NOT BACKWARD COMPATIBLE IT RETURNS DOM ELEMENTS INSTEAD OF HTML STRING 
function DataBind(templateElement, data, rootDataKey) {
    if (typeof overwrite === "undefined") { overwrite = false; }

    if (Array.isArray(data)) {
        var boundConatiner = document.createElement("div");
        for (var i = 0; i < data.length; i++)
            boundConatiner.appendChild(this.DataBind(templateElement, data[i], overwrite));
        templateElement.innerHTML = boundConatiner.innerHTML;
        return templateElement;
    }

    var templateHTML = templateElement.innerHTML;
    var children = templateElement.getElementsByTagName("*");
    var currentElement;

    for (var c = 0; c < children.length; c++) {
        currentElement = children[c];

        for (var a = 0; a < children[c].attributes.length; a++) {
            if (currentElement.attributes[a].name.indexOf("data-") != -1) {
                var dataAttribute = currentElement.attributes[a];
                var dataKey = dataAttribute.value;
                var dataKeys;
                var dataValue = "";
                var attributeName = dataAttribute.name.replace("data-", "");
                currentElement.removeAttribute(dataAttribute.name);

                if (dataKey.indexOf(rootDataKey) != -1)
                    dataKey = dataKey.replace(rootDataKey + ".", "");
                else if (rootDataKey != null)
                    continue;

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

                if (Array.isArray(dataValue)) {
                    var boundConatiner = document.createElement("div");
                    for (var d = 0; d < dataValue.length; d++)
                        boundConatiner.appendChild(this.DataBind(currentElement, dataValue[d], overwrite, dataKey, d));

                    currentElement.innerHTML = boundConatiner.innerHTML;
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

    if (overwrite)
        return templateElement;

    var boundElement = templateElement.firstElementChild.cloneNode(true);
    templateElement.innerHTML = templateHTML;
    return boundElement;
}
