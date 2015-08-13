/**
 * @author:huangshuaihui
 * @email:then198611@163.com
 * @version:1.0.0
 * @name:hichao ui for web app
 */
 
 
/*
* BASE
*/
(function () {
    var win = this,
        doc = win.document,
        nav = win.navigator,
        app = nav.appVersion || nav.userAgent,
        loc = win.location;

    var arr = [],
        stringPrototype = String.prototype,
        slice = arr.slice;
        
    //声明
    var H = function (selector, context) {
        return H.init.apply(this, arguments);
    };
    
    //trim
    stringPrototype.trim = function () {
        return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
    };
    
    // is object
    function isObject(t) {
        return t + "" == "[object Object]";
    }
    // is null
    function isNull(t) {
        return t === undefined || t === null;
    }
    // is string
    function isString(t) {
        return typeof t == 'string';
    }
    // is array
    function isArray(t) {
        return t instanceof Array;
    }
    // is function
    function isFunction(t) {
        return t instanceof Function;
    }
    // is window
    function isWindow(t) {
        return t != null && t === t.window;
    }
    // is number
    function isNumber(t) {
        return typeof t == 'number';
    }
    // to json
    function parseJSON(t) {
        return (isNull(t) && t != '') ? "" : JSON.parse(t);
    }
    // array or hui array
    function huiArray(t) {
        var length = !isString(t) ? "length" in t && t.length : null;
        
        // window or document
        if (isWindow(t)) {
            return false;
        }
        // node 
        else if (t.nodeType === 1 && length) {
            return true;
        }

        else {
            return isArray(t) || length === 0 || typeof length === "number" && length > 0 && (length - 1) in t;
        }
    }
    // is dom
    function isDom(t) {
        return t && t.nodeType == 1;
    }
    function execObject(t) {
        return isFunction(t) ? t() : t;
    }
    //extend
    H.extend = function () {
        var args = arguments,
            ret = args[0] || {},
            i = 1;
        switch (args.length) {
            case 0:
                return;
            case 1:
                ret = this;
                i = 0;
                break;
        }
        each(slice.call(args, i), function (j, v) {
            v && each(v, function (key, val) {
                isNull(val) || (ret[key] = val);
            });
        });
        return ret;
    };
    
    // each
    function each(obj, callback) {
        var i = 0;
        if (huiArray(obj) || isArray(obj)) {
            for (; i < obj.length; i++) {
                callback.call(obj[i], i, obj[i]);
            }
        } else if (isObject(obj)) {
            for (i in obj) {
                callback.call(obj[i], i, obj[i]);
            }
        }
        return obj;
    }
    
    //load resource
    function loadResource(type, url, success, error) {
        url = url || loc.pathname;
        var isCss = type == 'css',
            isScript = type == 'js',
            tagName = isCss ? 'link' : (isScript ? 'script' : null);
        if (isNull(tagName)) { return; }
        var node = doc.createElement(tagName),
            hnode = H(node);
        isCss ? hnode.attr('rel', 'stylesheet') : isScript && hnode.attr('script', 'type/javascript');

        isCss ? node.href = url : node.src = url;

        hnode.on('load', function () {
            success && success();
        });
        hnode.on('error', function () {
            hnode.remove();
            error && error();
        });
        H('head').append(node);
        return node;
    }
    win.$ = win.HUI = H;
    H.version = '1.0.0';
    H.extend({
        global: win,
        isString: isString,
        isFunction: isFunction,
        isArray: isArray,
        isNull: isNull,
        isObject: isObject,
        huiArray: huiArray,
        isDom: isDom,
        isNumber: isNumber,
        isWindow: isWindow,
        parseJSON: parseJSON,
        execObject: execObject,
        each: each,
        // trim
        trim: function (v) {
            return isNull(v) ? "" : isString(v) ? v.trim() : v.toString().trim();
        },
        // inArray
        inArray: function (item, array) {
            if (H.huiArray(array))
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === item) return i;
                }
            return -1;
        },
        // map
        map: function (array, callback) {
            var rs = [],
                i = 0;
            for (; array && i < array.length; i++)
                isNull(array[i]) || rs.push(callback(i, array[i]));
            return rs;
        },
        //grep
        grep: function (array, callback) {
            var rs = [];
            each(array, function (i, o) {
                (callback ? callback(i, o) : !isNull(o)) && rs.push(o);
            });
            return rs;
        },
        // param 
        param: function (array) {
            var rs = [];
            each(array, function (i, o) {
                isString(i) ? rs.push(encodeURIComponent(i) + '=' + encodeURIComponent(execObject(o))) : o.name && rs.push(encodeURIComponent(o.name) + '=' + encodeURIComponent(execObject(o.value)));
            });
            return rs.join('&');
        },
        //is iphone
        isIphone: function () {
            return /iPhone OS/.test(app);
        },
        // is andriod
        isAndroid: function () {
            return /Android/.test(app);
        },
        // is window'phone
        isWP: function () {
            return /Windows Phone/.test(app);
        },
        // is ie
        isIE: function () {
            return /MSIE/.test(app) || /Trident/.test(app);
        },
        // is firefox
        isFF: function () {
            return /Firefox/.test(app);
        },
        // is webkit
        isWK: function () {
            return /WebKit/.test(app);
        },
        // is opera
        isOpera: function () {
            return /Opera/.test(app);
        },
        //判断是否是Retinal高清屏
        isRetinal: function () {
            return (win.devicePixelRatio || 2) >= 1.5;
        },
        // load js
        getScript: function (url, success, error) {
            return loadResource("js", url, success, error);
        },
        // load css
        getCss: function (url, success, error) {
            return loadResource("css", url, success, error);
        }
    });
})();

/* 
*  DOM
*/
(function (H) {
    var win = H.global,
        doc = win.document,
        each = H.each,
        huiArray = H.huiArray,
        isString = H.isString,
        isObject = H.isObject,
        execObject = H.execObject,
        isNull = H.isNull,
        isArray = H.isArray,
        inArray = H.inArray,
        isDom = H.isDom,
        isFunction = H.isFunction,
        nodeRegExp = /^\s*(<.+>.*<\/.+>)+|(<.+\/\s*>)+\s*$/;

    function init(selector, context) {
        context = context || doc;
        if (isFunction(selector)) {
            return H(doc).ready(selector);
        }
        return isHuiArray(selector) ? selector : new query(selector, context);
    }

    var query = function (selector, context) {
        var self = this,
            r;
        self.context = context = context || doc;
        self.selector = selector;
        self.length = 0;
        if (isString(selector)) {
            if (nodeRegExp.test(selector.replace(/\n+/g, ""))) {
                var t = doc.createElement('div');
                t.innerHTML = selector;
                r = t.children;
            }
            else {
                var nodelist = find(selector, context);
                each(nodelist, function (j, dom) {
                    self._push(dom);
                });
                return self;
            }
        } else {
            r = huiArray(selector) ? selector : [selector];
        }
        for (var i = 0; i < r.length; i++) {
            self._push(r[i]);
        }
        return self;
    };
    H.extend(query.prototype, {
        _push: function (v) {
            v && (this[this.length++] = v);
        }
    });
    //判断是否是hui 生成的array
    function isHuiArray(t) {
        return t instanceof query;
    }
    // find
    function find(selector, context) {
        var result = [];
        if (!isNull(selector) && selector != '') {
            context = isString(context) ? H(context) : context;
            if (isHuiArray(context)) {
                each(context, function (i, v) {
                    isDom(v) && (result = arrayConcat(result, v.querySelectorAll(selector)));
                });
            } else {
                result = context.querySelectorAll(selector) || [];
            }
        }
        return result;
    }
    //arrayConcat
    function arrayConcat(sarray, tarray) {
        if (isArray(tarray)) {
            sarray = sarray.concat(tarray);
        } else {
            for (var i = 0; i < tarray.length; i++) {
                sarray.push(tarray[i]);
            }
        }
        return sarray;
    }
    // hui array value 
    function huiValue(t) {
        t = execObject(t);
        return isString(t) && nodeRegExp.test(t.replace(/\n+/g, "")) ? H(t) : t;
    }
    // createTextNode
    function createTextNode(t) {
        return doc.createTextNode(t);
    }
    // clone
    function clone(t, deep) {
        if (isDom(t)) {
            return H(t.cloneNode(deep == !0));
        }
        var r = [];
        each(t, function (i, o) {
            isDom(o) && r.push(clone(o, deep));
        });
        return H(r);
    }
    // append 
    function append(node, child) {

        child = huiValue(child);
        if (huiArray(node)) {
            each(node, function (i, o) {
                append(o, child);
            });
        }
        else if (isDom(node)) {
            huiArray(child) ? each(child, function (j, k) {
                append(node, k);
            }) : node.appendChild(isDom(child) ? child : createTextNode(child));
        }
    }
    // prepend 
    function prepend(node, child) {
        child = huiValue(child);
        if (huiArray(node)) {
            each(node, function (i, o) {
                prepend(o, child);
            });
        }
        else if (isDom(node)) {
            huiArray(child) ? each(child, function (j, k) {
                prepend(node, k);
            }) : node.insertBefore(isDom(child) ? child : createTextNode(child), node.firstChild);
        }
    }
    
    // hasClass
    function hasClass(d, t) {
        return isDom(d) && new RegExp('(\\s|^)' + t + '(\\s|$)').test(d.className);
    }
    //css
    function css(d, t, v) {
        //value is null
        if (isNull(v) && isString(t)) {
            return d[0].currentStyle ? d[0].currentStyle[t] : doc.defaultView.getComputedStyle(d[0], false)[t];
        }
        else {
            var r = '';
            // t is string
            if (isString(t)) {
                r = t + ':' + v + ';';
            }
            // t is object
            if (isObject(t)) {
                each(t, function (i, o) {
                    r += i + ':' + o + ';';
                });
            }
            each(d, function (i, o) {
                o.style.cssText += ';' + r;
            });
            return d;
        }
    }
    // attr 
    function attr(d, t, v) {
        if (isNull(v) && isString(t)) {
            var node = d[0];
            return node[t] || node.getAttribute(t);
        }
        else {
            if (isString(t)) {
                each(d, function (i, o) {
                    o.setAttribute(t, v);
                })
            }
            if (isObject(t)) {
                each(d, function (i, o) {
                    each(t, function (j, k) {
                        o.setAttribute(j, k);
                    });
                });
            }
            return d;
        }
    }
    //matchesSelector 
    function matchesSelector(d, t) {
        if (d) {
            d._matchesSelector = d.matchesSelector || d.msMatchesSelector || d.mozMatchesSelector || d.webkitMatchesSelector;
            return d._matchesSelector && d._matchesSelector(t);
        }
    }
    H.isHuiArray = isHuiArray;
    H.init = init;
    H.fn = query.prototype;
    H.fn.extend = function (t) {
        each(t, function (i, o) {
            query.prototype[i] = o;
        });
    };
    H.fn.extend({
        matchesSelector: matchesSelector,
        eq: function (i) {
            return H(this[i]);
        },
        first: function () {
            return H(this[0]);
        },
        last: function () {
            return H(this[this.length - 1]);
        },
        find: function (selecter) {
            return new query(selecter, this);
        },
        each: function (t) {
            each(this, t);
            return this;
        },
        clone: function (t) {
            return clone(this, t);
        },
        append: function (t) {
            each(this, function (i, o) {
                append(o, t);
            })
            //append(this, t);
            return this;
        },
        appendTo: function (t) {
            var self = this;
            each(H(t), function (i, o) {
                append(o, self);
            });
            //H(t).append(this);
            return self;
        },
        prepend: function (t) {
            each(this, function (i, o) {
                prepend(o, t);
            });
            //prepend(this, t);
            return this;
        },
        prependTo: function (t) {
            var self = this;
            each(H(t), function (i, o) {
                prepend(o, self);
            });
            //H(t).prepend(this);
            return self;
        },
        remove: function () {
            each(this, function (i, o) {
                isDom(o.parentNode) && o.parentNode.removeChild(o);
            });
            return this;
        },
        html: function (t) {
            var elem = this[0];
            if (elem.nodeType === 1 && t === undefined) {
                return elem.innerHTML;
            }
            if (elem) {
                this.empty().append(t);
                return this;
            }
        },
        val: function (t) {
            if (isNull(t)) {
                return this.attr('value') || '';
            }
            else {
                each(this, function (i, o) {
                    o.value = t;
                })
                return this;
            }
        },
        empty: function () {
            this.html('');
        },
        text: function () {
            var arg = arguments;
            if (arg.length == 0) {
                var text = '';
                each(this, function (i, o) {
                    text += o.innerText;
                });
                return text;
            }
            else {
                each(this, function (i, o) {
                    o.innerText = arg[0];
                });
                return this;
            }
        },
        hasClass: function (t) {
            return hasClass(this[0], t);
        },
        addClass: function (t) {
            each(this, function (i, o) {
                if (!hasClass(o, t)) {
                    o.className += ' ' + t;
                }
            });
            return this;
        },
        removeClass: function (t) {
            each(this, function (i, o) {
                if (hasClass(o, t)) {
                    o.className = o.className.replace(new RegExp('(\\s|^)' + t + '(\\s|$)'), ' ');
                }
            });
            return this;
        },
        css: function (t, v) {
            var r = css(this, t, v);
            return (isObject(t) || !isNull(v)) ? this : r;
        },
        attr: function (t, v) {
            var r = attr(this, t, v);
            return (isObject(t) || !isNull(v)) ? this : r;
        },
        removeAttr: function (t) {
            each(this, function (i, o) {
                o.removeAttribute(t);
            });
            return this;
        },
        show: function () {
            css(this, 'display', 'block');
            return this;
        },
        hide: function () {
            css(this, 'display', 'node');
            return this;
        },
        prev: function () {
            var r = [];
            each(this, function (i, o) {
                if (o.previousSibling) {
                    if (o.previousSibling.nodeType === 1) {
                        r.push(o.previousSibling);
                    }
                    else {
                        r.push(o.previousSibling.previousSibling);
                    }
                }
                else {
                    return true;
                }
            });
            return H(r);
        },
        next: function () {
            var r = [];
            each(this, function (i, o) {
                if (o.nextSibling) {
                    if (o.nextSibling.nodeType === 1) {
                        r.push(o.nextSibling);
                    }
                    else {
                        r.push(o.nextSibling.nextSibling);
                    }
                }
                else {
                    return true;
                }
            });
            return H(r);
        },
        siblings: function (t) {
            var r = [], self = this;
            each(self, function (i, o) {
                var parent = o.parentNode,
                    child = parent.children;
                each(child, function (j, k) {
                    if (inArray(k, r) == -1 && inArray(k, self) == -1) {
                        if (!isNull(t) && t != '') {
                            if (matchesSelector(k, t)) {
                                r.push(k);
                            }
                        }
                        else {
                            r.push(k);
                        }
                    }
                })
            })
            return H(r);
        },
        parent: function () {
            var r = [];
            each(this, function (i, o) {
                if (inArray(o.parentNode, r) == -1) {
                    r.push(o.parentNode);
                }
            });
            return H(r);
        },
        parents: function (t) {
            var r = [], self = this, cNode;
            each(self, function (i, o) {
                cNode = o;
                while (isDom(cNode)) {
                    var pNode = cNode.parentNode;
                    if (isDom(pNode) && inArray(pNode, r) == -1 && inArray(pNode, self) == -1) {
                        if (!isNull(t) && t != '') {
                            if (matchesSelector(pNode, t)) {
                                r.push(pNode);
                            }
                        }
                        else {
                            r.push(pNode);
                        }
                    }
                    cNode = pNode;
                }
            });
            return H(r);
        }
    });
})(HUI);

/**
 *  event
 */
(function (H) {
    var fn = H.fn,
        win = H.global,
        doc = win.document,
        each = H.each,
        isFunction = H.isFunction,
        matchesSelector = fn.matchesSelector,
        isNull = H.isNull,
        readyRE = /complete|loaded|interactive|loading/i;

    function setLoad(node, fn) {
        node.onreadystatechange = node.onload = node.onDOMContentLoaded = fn;
    }
    function _delete(object, name) {
        try { delete object[name]; } catch (e) { object[name] = null; }
    }
    function createEvent(type) {
        return doc.createEvent ? doc.createEvent(type) : doc.createEventObject(type);
    }
    function isSE() {
        return !isNull(doc.addEventListener);
    }
    function trigger(d, t) {
        var ev;
        if (isSE()) {
            ev = createEvent('MouseEvent');
            ev.initEvent(t, !0, !0);
            d.dispatchEvent(ev);
        }
        else {
            d.fireEvent('on' + t);
        }
    }

    function eventAdd(dom, type, fn, data, selector) {
        dom.listeners = dom.listeners || {};
        selector = selector && selector.split(',');
        var listeners = dom.listeners[type] = dom.listeners[type] || [];
        listeners.push(fn);
        if (!listeners['handler']) {
            listeners['handler'] = function (e) {
                e = fixEvent(e);
                e.currentTarget = e.target;
                e.data = data;
                if (selector) {
                    each(selector, function (i, o) {
                        if (matchesSelector(e.target, o)) {
                            for (var i = 0, fn; fn = listeners[i++];) {
                                fn.call(e.target, e);
                            }
                        }
                        else {
                            return false;
                        }
                    })
                }
                else {
                    fn.call(e.target, e);
                }
            };
            isSE() ?
                dom.addEventListener(type, listeners['handler'], false) :
                dom.attachEvent('on' + type, listeners['handler']);
        }
    }
    function eventRemove(dom, type, fn) {
        if (!dom.listeners) { return; }
        var listeners = dom.listeners && dom.listeners[type];
        // all delete
        if (isNull(type) && isNull(fn)) {
            _remove(dom);
        }
        // delete by type or fn
        else {
            if (listeners) {
                if (fn) {
                    each(listeners, function (i, o) {
                        if (o == fn) {
                            return listeners.splice(i, 1);
                        }
                    });
                }
                else {
                    _remove(dom, type);
                }
            }
        }
    }
    function _remove(dom, type) {
        if (isNull(type)) {
            if (dom.listeners) {
                each(dom.listeners, function (i, o) {
                    dom.removeEventListener ?
                        dom.removeEventListener(i, o['handler'], false) :
                        dom.detachEvent('on' + i, o['handler']);
                });
                dom.listeners && delete dom.listeners;
            }
        }
        else {
            var handler = dom.listeners[type]['handler'];
            dom.removeEventListener ?
                dom.removeEventListener(type, handler, false) :
                dom.detachEvent('on' + type, handler);
            delete dom.listeners[type];
            if (isEmptyObject(dom.listeners)) {
                delete dom.listeners;
            }
        }
    }
    function isEmptyObject(obj) {
        for (var a in obj) {
            return false;
        }
        return true;
    }
    function fixEvent(e) {
        e.preventDefault || (e.preventDefault = function () {
            this.returnValue = !1;
            if (win.event) win.event.returnValue = !1;
        });
        e.stopPropagation || (e.stopPropagation = function () {
            this.cancelBubble = !0;
        });
        e.halt = function () {
            e.preventDefault();
            e.stopPropagation();
        };
        e.target || (e.target = e.srcElement);

        return e;
    }
    H.ready = fn.ready = function (fn, context) {
        var node = context || this[0] || doc,
            state;

        function ready(e) {
            state = node.readyState;
            if (state != "loading" && !isNull(node._handles) && (readyRE.test(state) || (isNull(state) && "load" == e.type))) {
                setLoad(node, null);
                each(node._handles, function (i, val) {
                    setTimeout(function () {
                        val.call(node, H);
                    }, 5);
                });
                _delete(node, "_handles");
            }
        }
        if (readyRE.test(node.readyState)) {
            setTimeout(function () {
                fn.call(node, H);
            }, 5);
        } else {
            var hs = node._handles = node._handles || [];
            hs.push(fn);
            setLoad(node, ready);
        }
        return this;
    };
    fn.extend({
        on: function (type, selector, data, fn) {
            if (!type) { return; }
            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (!fn) { return this; }
            each(this, function (i, o) {
                eventAdd(o, type, fn, data, selector);
            });
            return this;
        },
        off: function (type, fn) {
            each(this, function (i, o) {
                eventRemove(o, type, fn);
            });
            return this;
        },
        trigger: function (type) {
            each(this, function (i, o) {
                trigger(o, type);
            });
            return this;
        }
    })
})(HUI);

/*
* ajax
*/
(function (H) {
    var win = H.global,
        loc = win.location,
        parseJSON = H.parseJSON,
        ajaxConfig = {
            type: 'GET',
            async: !0,
            dataType: 'text',
            xhrFields: {
                //withCredentials:false
            }
        };
    // create xhr object
    function createXhr() {
        return win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }
    // ajax
    function ajax(config) {
        config = H.extend(ajaxConfig, config);
        var dataType = config.dataType,
            timeout = config.timeout,
            timeCount,
            url = H.trim(config.url) || loc.pathname,
            beforeSend = config.beforeSend,
            success = config.success,
            error = config.error,
            type = config.type,
            async = config.async,
            isGet = type.toUpperCase() == 'GET',
            formData = H.param(config.data);
        var xhr = createXhr();
        if (beforeSend && !(beforeSend.call(this, xhr))) {
            return xhr.abort();
        }

        xhr.onreadystatechange = function () {
            if (4 == xhr.readyState) {
                if (200 == xhr.status) {
                    timeCount && clearTimeout(timeCount);
                    success && success(dataType == 'xml' ? xhr.responseXML
                        : (dataType == 'json' ? parseJSON(xhr.responseText) : xhr.responseText));
                } else {
                    error && error();
                }
            }
        };
        if (isGet) {
            url += (/\?/.test(url) ? "&" : "?") + formData;
        }
        H.extend(xhr, config.xhrFields || {});
        xhr.open(type, url, async);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        !isGet && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(isGet ? null : formData);
        if (timeout > 0) {
            timeCount = setTimeout(function () {
                xhr.abort();
                error && error(xhr.xhr, xhr.type);
            }, timeout);
        }
    }

    H.extend({
        ajax: ajax
    })
})(HUI);

/*
* location
*/
(function (H) {
    var win = H.global,
        doc = win.document,
        isNull = H.isNull,
        isDom = H.isDom;
        
    // 计算元素的X(水平，左)位置
    function pageX(el) {
        return el.offsetParent ? el.offsetLeft + pageX(el.offsetParent) : el.offsetLeft;
    }
    // 计算元素的Y(垂直，顶)位置
    function pageY(el) {
        return el.offsetParent ? el.offsetTop + pageY(el.offsetParent) : el.offsetTop;
    }
    // 查找元素在其父元素中的水平位置
    function parentX(el) {
        return el.parentNode == el.offsetParent ? el.offsetLeft : pageX(el) - pageX(el.parentNode);
    }
    // 查找元素在其父元素中的垂直位置
    function parentY(el) {
        return el.parentNode == el.offsetParent ? el.offsetTop : pageY(el) - pageY(el.parentNode);
    }
    H.fn.extend({
        width: function () {
            var dom = this[0];
            return isDom(dom) ? dom.offsetWidth : screen.availWidth;
        },
        height: function () {
            var dom = this[0];
            return isDom(dom) ? dom.offsetHeight : screen.availHeight;
        },
        // 获取匹配元素在当前视口的相对偏移
        offset: function () {
            if (!this[0]) return null;
            var obj = this[0].getBoundingClientRect();
            return {
                left: obj.left + win.pageXOffset,
                top: obj.top + win.pageYOffset
            };
        },
        // 获取匹配元素相对父元素的偏移。
        position: function () {
            var o = this[0];
            if (!o) return null;
            return {
                left: parentX(o),
                top: parentY(o)
            };
        },
        scrollTop: function (t) {
            if (isNull(t)) {
                return win.pageYOffset;
            }
            else {
                var y = win.pageYOffset;
                win.scrollBy(0, t - y);
                return this;
            }
        },
        scrollLeft: function (t) {
            if (isNull(t)) {
                return win.pageXOffset;
            }
            else {
                var x = win.pageXOffset;
                win.scrollBy(t - x, 0);
                return this;
            }
        },
    });
})(HUI);

/*
 * touch
 * */
(function(H){
    var touch = {}, touchTimeout, longTapDelay = 750,
        supportTouch = 'ontouchend' in document;

    function parentIfText(node) {
        return 'tagName' in node ? node : node.parentNode;
    }

    function swipeDirection(x1, x2, y1, y2) {
        var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
        return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    }

    function longTap() {
        if (touch.last && Date.now() - touch.last >= longTapDelay) {
            touch.el.trigger('longTap');
            touch = {};
        }
    }

    H(document).ready(function(){
        var now, delta,
            touchStartEvent = supportTouch ? 'touchstart' : 'mousedown',
            touchMoveEvent  = supportTouch ? 'touchmove'  : 'mousemove',
            touchEndEvent   = supportTouch ? 'touchend'   : 'mouseup';

        document.body.addEventListener(touchStartEvent, function(e){
            now = Date.now();
            delta = now - (touch.last || now);
            touch.el = $(parentIfText(supportTouch ? e.touches[0].target : e.target));
            touchTimeout && window.clearTimeout(touchTimeout);
            touch.x1 = supportTouch ? e.touches[0].pageX : e.pageX;
            touch.y1 = supportTouch ? e.touches[0].pageY : e.pageY;
            if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
            touch.last = now;
            window.setTimeout(longTap, longTapDelay);
        }, false);

        document.body.addEventListener(touchMoveEvent, function(e){
            touch.x2 = supportTouch ? e.touches[0].pageX : e.pageX;
            touch.y2 = supportTouch ? e.touches[0].pageY : e.pageY;
            if (Math.abs(touch.x1 - touch.x2) > 10) {
                e.preventDefault();
            }
        }, false);

        document.body.addEventListener(touchEndEvent, function(e){
            if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap');
                touch = {};
            } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
                touch.el.trigger('swipe');
                touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                touch = {};
            } else if ('last' in touch) {
                touchTimeout = window.setTimeout(function(){
                    touchTimeout = null;
                    touch.el.trigger('tap');
                    touch = {};
                }, 250);
            }
        }, false);

        document.body.addEventListener('touchcancel', function(){
            touch = {};
        }, false);
    });

    ['swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'doubletap', 'tap', 'longtap'].forEach(function(m){
        H.fn[m] = function(callback){
            return this.on(m,callback)
        };
    });
})(HUI);