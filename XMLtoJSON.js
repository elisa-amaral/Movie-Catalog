function xmlToJson(xml) 
{
    var object = {}, i, j, attribute, item, nodeName, old;

    if (xml.nodeType === 1) 
    { 
        if (xml.attributes.length > 0) 
        {
            object["@attributes"] = {};
            for (j = 0; j < xml.attributes.length; j = j + 1) {
                attribute = xml.attributes.item(j);
                object["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { 
        object = xml.nodeValue.trim();
    }

    if (xml.hasChildNodes()) 
    {
        for (i = 0; i < xml.childNodes.length; i = i + 1) 
        {
            item = xml.childNodes.item(i);
            nodeName = item.nodeName;
            if ((object[nodeName]) === undefined) 
            {
                object[nodeName] = xmlToJson(item);
            } 
            else 
            {
                if ((object[nodeName].push) === undefined) 
                {
                    old = object[nodeName];
                    object[nodeName] = [];
                    object[nodeName].push(old);
                }
                object[nodeName].push(xmlToJson(item));
            }
        }
    }
    return object;
};