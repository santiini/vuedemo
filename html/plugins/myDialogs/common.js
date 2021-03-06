// 对象合并
function extend(o, n, override) {
    for (var key in n) {
        if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
            o[key] = n[key];
        }
    }
    return o;
}

// 自定义模板引擎
function templateEngine(html, data) {
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;
    var match;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

// 通过class查找dom
if (!('getElementsByClass' in HTMLElement)) {
    HTMLElement.prototype.getElementsByClass = function (n, tar) {
        var el = [],
            _el = (!!tar ? tar : this).getElementsByTagName('*');
        for (var i = 0; i < _el.length; i++) {
            if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1) {
                el[el.length] = _el[i];
            }
        }
        return el;
    };
    ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
}