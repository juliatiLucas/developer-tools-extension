function ml(tagName, props, nest) {
    var el = document.createElement(tagName);
    if (props) {
        for (var name in props) {
            if (name.indexOf("on") === 0) {
                el.addEventListener(name.substr(2).toLowerCase(), props[name], false)
            } else {
                el.setAttribute(name, props[name]);
            }
        }
    }
    if (!nest) {
        return el;
    }
    return nester(el, nest)
}

function nester(el, n) {
    if (typeof n === "string") {
        var t = document.createTextNode(n);
        el.appendChild(t);
    } else if (n instanceof Array) {
        for (var i = 0; i < n.length; i++) {
            if (typeof n[i] === "string") {
                var t = document.createTextNode(n[i]);
                el.appendChild(t);
            } else if (n[i] instanceof Node) {
                el.appendChild(n[i]);
            }
        }
    } else if (n instanceof Node) {
        el.appendChild(n)
    }
    return el;
}

export default ml