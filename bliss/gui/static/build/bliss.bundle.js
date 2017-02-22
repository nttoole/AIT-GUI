/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mithril = __webpack_require__(1);

	var _mithril2 = _interopRequireDefault(_mithril);

	var _bliss = __webpack_require__(6);

	var bliss = _interopRequireWildcard(_bliss);

	var _index = __webpack_require__(14);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	bliss.gui.init();

	window.bliss = bliss;
	window.m = _mithril2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, global, module) {new function() {

	function Vnode(tag, key, attrs0, children, text, dom) {
		return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
	}
	Vnode.normalize = function(node) {
		if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
		if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
		return node
	}
	Vnode.normalizeChildren = function normalizeChildren(children) {
		for (var i = 0; i < children.length; i++) {
			children[i] = Vnode.normalize(children[i])
		}
		return children
	}
	var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
	var selectorCache = {}
	function hyperscript(selector) {
		if (selector == null || typeof selector !== "string" && typeof selector.view !== "function") {
			throw Error("The selector must be either a string or a component.");
		}
		if (typeof selector === "string" && selectorCache[selector] === undefined) {
			var match, tag, classes = [], attributes = {}
			while (match = selectorParser.exec(selector)) {
				var type = match[1], value = match[2]
				if (type === "" && value !== "") tag = value
				else if (type === "#") attributes.id = value
				else if (type === ".") classes.push(value)
				else if (match[3][0] === "[") {
					var attrValue = match[6]
					if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
					if (match[4] === "class") classes.push(attrValue)
					else attributes[match[4]] = attrValue || true
				}
			}
			if (classes.length > 0) attributes.className = classes.join(" ")
			selectorCache[selector] = function(attrs, children) {
				var hasAttrs = false, childList, text
				var className = attrs.className || attrs.class
				for (var key in attributes) attrs[key] = attributes[key]
				if (className !== undefined) {
					if (attrs.class !== undefined) {
						attrs.class = undefined
						attrs.className = className
					}
					if (attributes.className !== undefined) attrs.className = attributes.className + " " + className
				}
				for (var key in attrs) {
					if (key !== "key") {
						hasAttrs = true
						break
					}
				}
				if (Array.isArray(children) && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children
				else childList = children
				return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
			}
		}
		var attrs, children, childrenIndex
		if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !Array.isArray(arguments[1])) {
			attrs = arguments[1]
			childrenIndex = 2
		}
		else childrenIndex = 1
		if (arguments.length === childrenIndex + 1) {
			children = Array.isArray(arguments[childrenIndex]) ? arguments[childrenIndex] : [arguments[childrenIndex]]
		}
		else {
			children = []
			for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i])
		}
		if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))
		return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
	}
	hyperscript.trust = function(html) {
		if (html == null) html = ""
		return Vnode("<", undefined, undefined, html, undefined, undefined)
	}
	hyperscript.fragment = function(attrs1, children) {
		return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
	}
	var m = hyperscript
	/** @constructor */
	var PromisePolyfill = function(executor) {
		if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
		if (typeof executor !== "function") throw new TypeError("executor must be a function")
		var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
		var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
		function handler(list, shouldAbsorb) {
			return function execute(value) {
				var then
				try {
					if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
						if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
						executeOnce(then.bind(value))
					}
					else {
						callAsync(function() {
							if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
							for (var i = 0; i < list.length; i++) list[i](value)
							resolvers.length = 0, rejectors.length = 0
							instance.state = shouldAbsorb
							instance.retry = function() {execute(value)}
						})
					}
				}
				catch (e) {
					rejectCurrent(e)
				}
			}
		}
		function executeOnce(then) {
			var runs = 0
			function run(fn) {
				return function(value) {
					if (runs++ > 0) return
					fn(value)
				}
			}
			var onerror = run(rejectCurrent)
			try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
		}
		executeOnce(executor)
	}
	PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
		var self = this, instance = self._instance
		function handle(callback, list, next, state) {
			list.push(function(value) {
				if (typeof callback !== "function") next(value)
				else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
			})
			if (typeof instance.retry === "function" && state === instance.state) instance.retry()
		}
		var resolveNext, rejectNext
		var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
		handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
		return promise
	}
	PromisePolyfill.prototype.catch = function(onRejection) {
		return this.then(null, onRejection)
	}
	PromisePolyfill.resolve = function(value) {
		if (value instanceof PromisePolyfill) return value
		return new PromisePolyfill(function(resolve) {resolve(value)})
	}
	PromisePolyfill.reject = function(value) {
		return new PromisePolyfill(function(resolve, reject) {reject(value)})
	}
	PromisePolyfill.all = function(list) {
		return new PromisePolyfill(function(resolve, reject) {
			var total = list.length, count = 0, values = []
			if (list.length === 0) resolve([])
			else for (var i = 0; i < list.length; i++) {
				(function(i) {
					function consume(value) {
						count++
						values[i] = value
						if (count === total) resolve(values)
					}
					if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
						list[i].then(consume, reject)
					}
					else consume(list[i])
				})(i)
			}
		})
	}
	PromisePolyfill.race = function(list) {
		return new PromisePolyfill(function(resolve, reject) {
			for (var i = 0; i < list.length; i++) {
				list[i].then(resolve, reject)
			}
		})
	}
	if (typeof window !== "undefined") {
		if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
		var PromisePolyfill = window.Promise
	} else if (typeof global !== "undefined") {
		if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
		var PromisePolyfill = global.Promise
	} else {
	}
	var buildQueryString = function(object) {
		if (Object.prototype.toString.call(object) !== "[object Object]") return ""
		var args = []
		for (var key0 in object) {
			destructure(key0, object[key0])
		}
		return args.join("&")
		function destructure(key0, value) {
			if (Array.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					destructure(key0 + "[" + i + "]", value[i])
				}
			}
			else if (Object.prototype.toString.call(value) === "[object Object]") {
				for (var i in value) {
					destructure(key0 + "[" + i + "]", value[i])
				}
			}
			else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
		}
	}
	var _8 = function($window, Promise) {
		var callbackCount = 0
		var oncompletion
		function setCompletionCallback(callback) {oncompletion = callback}
		function finalizer() {
			var count = 0
			function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
			return function finalize(promise0) {
				var then0 = promise0.then
				promise0.then = function() {
					count++
					var next = then0.apply(promise0, arguments)
					next.then(complete, function(e) {
						complete()
						if (count === 0) throw e
					})
					return finalize(next)
				}
				return promise0
			}
		}
		function normalize(args, extra) {
			if (typeof args === "string") {
				var url = args
				args = extra || {}
				if (args.url == null) args.url = url
			}
			return args
		}
		function request(args, extra) {
			var finalize = finalizer()
			args = normalize(args, extra)
			var promise0 = new Promise(function(resolve, reject) {
				if (args.method == null) args.method = "GET"
				args.method = args.method.toUpperCase()
				var useBody = typeof args.useBody === "boolean" ? args.useBody : args.method !== "GET" && args.method !== "TRACE"
				if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
				if (typeof args.deserialize !== "function") args.deserialize = deserialize
				if (typeof args.extract !== "function") args.extract = extract
				args.url = interpolate(args.url, args.data)
				if (useBody) args.data = args.serialize(args.data)
				else args.url = assemble(args.url, args.data)
				var xhr = new $window.XMLHttpRequest()
				xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
				if (args.serialize === JSON.stringify && useBody) {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
				}
				if (args.deserialize === deserialize) {
					xhr.setRequestHeader("Accept", "application/json, text/*")
				}
				if (args.withCredentials) xhr.withCredentials = args.withCredentials
				for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
					xhr.setRequestHeader(key, args.headers[key])
				}
				if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
				xhr.onreadystatechange = function() {
					// Don't throw errors on xhr.abort(). XMLHttpRequests ends up in a state of
					// xhr.status == 0 and xhr.readyState == 4 if aborted after open, but before completion.
					if (xhr.status && xhr.readyState === 4) {
						try {
							var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
								resolve(cast(args.type, response))
							}
							else {
								var error = new Error(xhr.responseText)
								for (var key in response) error[key] = response[key]
								reject(error)
							}
						}
						catch (e) {
							reject(e)
						}
					}
				}
				if (useBody && (args.data != null)) xhr.send(args.data)
				else xhr.send()
			})
			return args.background === true ? promise0 : finalize(promise0)
		}
		function jsonp(args, extra) {
			var finalize = finalizer()
			args = normalize(args, extra)
			var promise0 = new Promise(function(resolve, reject) {
				var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
				var script = $window.document.createElement("script")
				$window[callbackName] = function(data) {
					script.parentNode.removeChild(script)
					resolve(cast(args.type, data))
					delete $window[callbackName]
				}
				script.onerror = function() {
					script.parentNode.removeChild(script)
					reject(new Error("JSONP request failed"))
					delete $window[callbackName]
				}
				if (args.data == null) args.data = {}
				args.url = interpolate(args.url, args.data)
				args.data[args.callbackKey || "callback"] = callbackName
				script.src = assemble(args.url, args.data)
				$window.document.documentElement.appendChild(script)
			})
			return args.background === true? promise0 : finalize(promise0)
		}
		function interpolate(url, data) {
			if (data == null) return url
			var tokens = url.match(/:[^\/]+/gi) || []
			for (var i = 0; i < tokens.length; i++) {
				var key = tokens[i].slice(1)
				if (data[key] != null) {
					url = url.replace(tokens[i], data[key])
				}
			}
			return url
		}
		function assemble(url, data) {
			var querystring = buildQueryString(data)
			if (querystring !== "") {
				var prefix = url.indexOf("?") < 0 ? "?" : "&"
				url += prefix + querystring
			}
			return url
		}
		function deserialize(data) {
			try {return data !== "" ? JSON.parse(data) : null}
			catch (e) {throw new Error(data)}
		}
		function extract(xhr) {return xhr.responseText}
		function cast(type0, data) {
			if (typeof type0 === "function") {
				if (Array.isArray(data)) {
					for (var i = 0; i < data.length; i++) {
						data[i] = new type0(data[i])
					}
				}
				else return new type0(data)
			}
			return data
		}
		return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
	}
	var requestService = _8(window, PromisePolyfill)
	var coreRenderer = function($window) {
		var $doc = $window.document
		var $emptyFragment = $doc.createDocumentFragment()
		var onevent
		function setEventCallback(callback) {return onevent = callback}
		//create
		function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					createNode(parent, vnode, hooks, ns, nextSibling)
				}
			}
		}
		function createNode(parent, vnode, hooks, ns, nextSibling) {
			var tag = vnode.tag
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			if (typeof tag === "string") {
				switch (tag) {
					case "#": return createText(parent, vnode, nextSibling)
					case "<": return createHTML(parent, vnode, nextSibling)
					case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
					default: return createElement(parent, vnode, hooks, ns, nextSibling)
				}
			}
			else return createComponent(parent, vnode, hooks, ns, nextSibling)
		}
		function createText(parent, vnode, nextSibling) {
			vnode.dom = $doc.createTextNode(vnode.children)
			insertNode(parent, vnode.dom, nextSibling)
			return vnode.dom
		}
		function createHTML(parent, vnode, nextSibling) {
			var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
			var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
			var temp = $doc.createElement(parent1)
			temp.innerHTML = vnode.children
			vnode.dom = temp.firstChild
			vnode.domSize = temp.childNodes.length
			var fragment = $doc.createDocumentFragment()
			var child
			while (child = temp.firstChild) {
				fragment.appendChild(child)
			}
			insertNode(parent, fragment, nextSibling)
			return fragment
		}
		function createFragment(parent, vnode, hooks, ns, nextSibling) {
			var fragment = $doc.createDocumentFragment()
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(fragment, children, 0, children.length, hooks, null, ns)
			}
			vnode.dom = fragment.firstChild
			vnode.domSize = fragment.childNodes.length
			insertNode(parent, fragment, nextSibling)
			return fragment
		}
		function createElement(parent, vnode, hooks, ns, nextSibling) {
			var tag = vnode.tag
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}
			var attrs2 = vnode.attrs
			var is = attrs2 && attrs2.is
			var element = ns ?
				is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
				is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
			vnode.dom = element
			if (attrs2 != null) {
				setAttrs(vnode, attrs2, ns)
			}
			insertNode(parent, element, nextSibling)
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else {
				if (vnode.text != null) {
					if (vnode.text !== "") element.textContent = vnode.text
					else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				}
				if (vnode.children != null) {
					var children = vnode.children
					createNodes(element, children, 0, children.length, hooks, null, ns)
					setLateAttrs(vnode)
				}
			}
			return element
		}
		function createComponent(parent, vnode, hooks, ns, nextSibling) {
			vnode.state = Object.create(vnode.tag)
			var view = vnode.tag.view
			if (view.reentrantLock != null) return $emptyFragment
			view.reentrantLock = true
			initLifecycle(vnode.tag, vnode, hooks)
			vnode.instance = Vnode.normalize(view.call(vnode.state, vnode))
			view.reentrantLock = null
			if (vnode.instance != null) {
				if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as arguments")
				var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
				insertNode(parent, element, nextSibling)
				return element
			}
			else {
				vnode.domSize = 0
				return $emptyFragment
			}
		}
		//update
		function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
			if (old === vnodes || old == null && vnodes == null) return
			else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined)
			else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
			else {
				if (old.length === vnodes.length) {
					var isUnkeyed = false
					for (var i = 0; i < vnodes.length; i++) {
						if (vnodes[i] != null && old[i] != null) {
							isUnkeyed = vnodes[i].key == null && old[i].key == null
							break
						}
					}
					if (isUnkeyed) {
						for (var i = 0; i < old.length; i++) {
							if (old[i] === vnodes[i]) continue
							else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
							else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
							else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), false, ns)
						}
						return
					}
				}
				recycling = recycling || isRecyclable(old, vnodes)
				if (recycling) old = old.concat(old.pool)
				
				var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldStart], v = vnodes[start]
					if (o === v && !recycling) oldStart++, start++
					else if (o == null) oldStart++
					else if (v == null) start++
					else if (o.key === v.key) {
						oldStart++, start++
						updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), recycling, ns)
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					}
					else {
						var o = old[oldEnd]
						if (o === v && !recycling) oldEnd--, start++
						else if (o == null) oldEnd--
						else if (v == null) start++
						else if (o.key === v.key) {
							updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
							oldEnd--, start++
						}
						else break
					}
				}
				while (oldEnd >= oldStart && end >= start) {
					var o = old[oldEnd], v = vnodes[end]
					if (o === v && !recycling) oldEnd--, end--
					else if (o == null) oldEnd--
					else if (v == null) end--
					else if (o.key === v.key) {
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
						if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
						if (o.dom != null) nextSibling = o.dom
						oldEnd--, end--
					}
					else {
						if (!map) map = getKeyMap(old, oldEnd)
						if (v != null) {
							var oldIndex = map[v.key]
							if (oldIndex != null) {
								var movable = old[oldIndex]
								updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
								insertNode(parent, toFragment(movable), nextSibling)
								old[oldIndex].skip = true
								if (movable.dom != null) nextSibling = movable.dom
							}
							else {
								var dom = createNode(parent, v, hooks, undefined, nextSibling)
								nextSibling = dom
							}
						}
						end--
					}
					if (end < start) break
				}
				createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				removeNodes(old, oldStart, oldEnd + 1, vnodes)
			}
		}
		function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			var oldTag = old.tag, tag = vnode.tag
			if (oldTag === tag) {
				vnode.state = old.state
				vnode.events = old.events
				if (shouldUpdate(vnode, old)) return
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks, recycling)
				}
				if (typeof oldTag === "string") {
					switch (oldTag) {
						case "#": updateText(old, vnode); break
						case "<": updateHTML(parent, old, vnode, nextSibling); break
						case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
						default: updateElement(old, vnode, recycling, hooks, ns)
					}
				}
				else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
			}
			else {
				removeNode(old, null)
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
		function updateText(old, vnode) {
			if (old.children.toString() !== vnode.children.toString()) {
				old.dom.nodeValue = vnode.children
			}
			vnode.dom = old.dom
		}
		function updateHTML(parent, old, vnode, nextSibling) {
			if (old.children !== vnode.children) {
				toFragment(old)
				createHTML(parent, vnode, nextSibling)
			}
			else vnode.dom = old.dom, vnode.domSize = old.domSize
		}
		function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
			updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
			var domSize = 0, children = vnode.children
			vnode.dom = null
			if (children != null) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null && child.dom != null) {
						if (vnode.dom == null) vnode.dom = child.dom
						domSize += child.domSize || 1
					}
				}
				if (domSize !== 1) vnode.domSize = domSize
			}
		}
		function updateElement(old, vnode, recycling, hooks, ns) {
			var element = vnode.dom = old.dom
			switch (vnode.tag) {
				case "svg": ns = "http://www.w3.org/2000/svg"; break
				case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
			}
			if (vnode.tag === "textarea") {
				if (vnode.attrs == null) vnode.attrs = {}
				if (vnode.text != null) {
					vnode.attrs.value = vnode.text //FIXME handle0 multiple children
					vnode.text = undefined
				}
			}
			updateAttrs(vnode, old.attrs, vnode.attrs, ns)
			if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
				setContentEditable(vnode)
			}
			else if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
			}
		}
		function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
			vnode.instance = Vnode.normalize(vnode.tag.view.call(vnode.state, vnode))
			updateLifecycle(vnode.tag, vnode, hooks, recycling)
			if (vnode.instance != null) {
				if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
				else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
				vnode.dom = vnode.instance.dom
				vnode.domSize = vnode.instance.domSize
			}
			else if (old.instance != null) {
				removeNode(old.instance, null)
				vnode.dom = undefined
				vnode.domSize = 0
			}
			else {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
			}
		}
		function isRecyclable(old, vnodes) {
			if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
				var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
				var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
				var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
				if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
					return true
				}
			}
			return false
		}
		function getKeyMap(vnodes, end) {
			var map = {}, i = 0
			for (var i = 0; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					var key2 = vnode.key
					if (key2 != null) map[key2] = i
				}
			}
			return map
		}
		function toFragment(vnode) {
			var count0 = vnode.domSize
			if (count0 != null || vnode.dom == null) {
				var fragment = $doc.createDocumentFragment()
				if (count0 > 0) {
					var dom = vnode.dom
					while (--count0) fragment.appendChild(dom.nextSibling)
					fragment.insertBefore(dom, fragment.firstChild)
				}
				return fragment
			}
			else return vnode.dom
		}
		function getNextSibling(vnodes, i, nextSibling) {
			for (; i < vnodes.length; i++) {
				if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
			}
			return nextSibling
		}
		function insertNode(parent, dom, nextSibling) {
			if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
			else parent.appendChild(dom)
		}
		function setContentEditable(vnode) {
			var children = vnode.children
			if (children != null && children.length === 1 && children[0].tag === "<") {
				var content = children[0].children
				if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
			}
			else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
		}
		//remove
		function removeNodes(vnodes, start, end, context) {
			for (var i = start; i < end; i++) {
				var vnode = vnodes[i]
				if (vnode != null) {
					if (vnode.skip) vnode.skip = false
					else removeNode(vnode, context)
				}
			}
		}
		function removeNode(vnode, context) {
			var expected = 1, called = 0
			if (vnode.attrs && vnode.attrs.onbeforeremove) {
				var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
				if (result != null && typeof result.then === "function") {
					expected++
					result.then(continuation, continuation)
				}
			}
			if (typeof vnode.tag !== "string" && vnode.tag.onbeforeremove) {
				var result = vnode.tag.onbeforeremove.call(vnode.state, vnode)
				if (result != null && typeof result.then === "function") {
					expected++
					result.then(continuation, continuation)
				}
			}
			continuation()
			function continuation() {
				if (++called === expected) {
					onremove(vnode)
					if (vnode.dom) {
						var count0 = vnode.domSize || 1
						if (count0 > 1) {
							var dom = vnode.dom
							while (--count0) {
								removeNodeFromDOM(dom.nextSibling)
							}
						}
						removeNodeFromDOM(vnode.dom)
						if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
							if (!context.pool) context.pool = [vnode]
							else context.pool.push(vnode)
						}
					}
				}
			}
		}
		function removeNodeFromDOM(node) {
			var parent = node.parentNode
			if (parent != null) parent.removeChild(node)
		}
		function onremove(vnode) {
			if (vnode.attrs && vnode.attrs.onremove) vnode.attrs.onremove.call(vnode.state, vnode)
			if (typeof vnode.tag !== "string" && vnode.tag.onremove) vnode.tag.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
			else {
				var children = vnode.children
				if (Array.isArray(children)) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i]
						if (child != null) onremove(child)
					}
				}
			}
		}
		//attrs2
		function setAttrs(vnode, attrs2, ns) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, null, attrs2[key2], ns)
			}
		}
		function setAttr(vnode, key2, old, value, ns) {
			var element = vnode.dom
			if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
			var nsLastIndex = key2.indexOf(":")
			if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
				element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
			}
			else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
			else if (key2 === "style") updateStyle(element, old, value)
			else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if (vnode.tag === "input" && key2 === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && key2 === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && key2 === "value" && vnode.dom.value === value) return
				element[key2] = value
			}
			else {
				if (typeof value === "boolean") {
					if (value) element.setAttribute(key2, "")
					else element.removeAttribute(key2)
				}
				else element.setAttribute(key2 === "className" ? "class" : key2, value)
			}
		}
		function setLateAttrs(vnode) {
			var attrs2 = vnode.attrs
			if (vnode.tag === "select" && attrs2 != null) {
				if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
				if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
			}
		}
		function updateAttrs(vnode, old, attrs2, ns) {
			if (attrs2 != null) {
				for (var key2 in attrs2) {
					setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
				}
			}
			if (old != null) {
				for (var key2 in old) {
					if (attrs2 == null || !(key2 in attrs2)) {
						if (key2 === "className") key2 = "class"
						if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
						else if (key2 !== "key") vnode.dom.removeAttribute(key2)
					}
				}
			}
		}
		function isFormAttribute(vnode, attr) {
			return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
		}
		function isLifecycleMethod(attr) {
			return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
		}
		function isAttribute(attr) {
			return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
		}
		function isCustomElement(vnode){
			return vnode.attrs.is || vnode.tag.indexOf("-") > -1
		}
		function hasIntegrationMethods(source) {
			return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
		}
		//style
		function updateStyle(element, old, style) {
			if (old === style) element.style.cssText = "", old = null
			if (style == null) element.style.cssText = ""
			else if (typeof style === "string") element.style.cssText = style
			else {
				if (typeof old === "string") element.style.cssText = ""
				for (var key2 in style) {
					element.style[key2] = style[key2]
				}
				if (old != null && typeof old !== "string") {
					for (var key2 in old) {
						if (!(key2 in style)) element.style[key2] = ""
					}
				}
			}
		}
		//event
		function updateEvent(vnode, key2, value) {
			var element = vnode.dom
			var callback = typeof onevent !== "function" ? value : function(e) {
				var result = value.call(element, e)
				onevent.call(element, e)
				return result
			}
			if (key2 in element) element[key2] = typeof value === "function" ? callback : null
			else {
				var eventName = key2.slice(2)
				if (vnode.events === undefined) vnode.events = {}
				if (vnode.events[key2] === callback) return
				if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
				if (typeof value === "function") {
					vnode.events[key2] = callback
					element.addEventListener(eventName, vnode.events[key2], false)
				}
			}
		}
		//lifecycle
		function initLifecycle(source, vnode, hooks) {
			if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
			if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
		}
		function updateLifecycle(source, vnode, hooks, recycling) {
			if (recycling) initLifecycle(source, vnode, hooks)
			else if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
		}
		function shouldUpdate(vnode, old) {
			var forceVnodeUpdate, forceComponentUpdate
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
			if (typeof vnode.tag !== "string" && typeof vnode.tag.onbeforeupdate === "function") forceComponentUpdate = vnode.tag.onbeforeupdate.call(vnode.state, vnode, old)
			if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
				vnode.dom = old.dom
				vnode.domSize = old.domSize
				vnode.instance = old.instance
				return true
			}
			return false
		}
		function render(dom, vnodes) {
			if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
			var hooks = []
			var active = $doc.activeElement
			// First time0 rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = ""
			if (!Array.isArray(vnodes)) vnodes = [vnodes]
			updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, undefined)
			dom.vnodes = vnodes
			for (var i = 0; i < hooks.length; i++) hooks[i]()
			if ($doc.activeElement !== active) active.focus()
		}
		return {render: render, setEventCallback: setEventCallback}
	}
	function throttle(callback) {
		//60fps translates to 16.6ms, round it down since setTimeout requires int
		var time = 16
		var last = 0, pending = null
		var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
		return function() {
			var now = Date.now()
			if (last === 0 || now - last >= time) {
				last = now
				callback()
			}
			else if (pending === null) {
				pending = timeout(function() {
					pending = null
					callback()
					last = Date.now()
				}, time - (now - last))
			}
		}
	}
	var _11 = function($window) {
		var renderService = coreRenderer($window)
		renderService.setEventCallback(function(e) {
			if (e.redraw !== false) redraw()
		})
		var callbacks = []
		function subscribe(key1, callback) {
			unsubscribe(key1)
			callbacks.push(key1, throttle(callback))
		}
		function unsubscribe(key1) {
			var index = callbacks.indexOf(key1)
			if (index > -1) callbacks.splice(index, 2)
		}
	    function redraw() {
	        for (var i = 1; i < callbacks.length; i += 2) {
	            callbacks[i]()
	        }
	    }
		return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
	}
	var redrawService = _11(window)
	requestService.setCompletionCallback(redrawService.redraw)
	var _16 = function(redrawService0) {
		return function(root, component) {
			if (component === null) {
				redrawService0.render(root, [])
				redrawService0.unsubscribe(root)
				return
			}
			
			if (component.view == null) throw new Error("m.mount(element, component) expects a component, not a vnode")
			
			var run0 = function() {
				redrawService0.render(root, Vnode(component))
			}
			redrawService0.subscribe(root, run0)
			redrawService0.redraw()
		}
	}
	m.mount = _16(redrawService)
	var Promise = PromisePolyfill
	var parseQueryString = function(string) {
		if (string === "" || string == null) return {}
		if (string.charAt(0) === "?") string = string.slice(1)
		var entries = string.split("&"), data0 = {}, counters = {}
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i].split("=")
			var key5 = decodeURIComponent(entry[0])
			var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
			if (value === "true") value = true
			else if (value === "false") value = false
			var levels = key5.split(/\]\[?|\[/)
			var cursor = data0
			if (key5.indexOf("[") > -1) levels.pop()
			for (var j = 0; j < levels.length; j++) {
				var level = levels[j], nextLevel = levels[j + 1]
				var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
				var isValue = j === levels.length - 1
				if (level === "") {
					var key5 = levels.slice(0, j).join()
					if (counters[key5] == null) counters[key5] = 0
					level = counters[key5]++
				}
				if (cursor[level] == null) {
					cursor[level] = isValue ? value : isNumber ? [] : {}
				}
				cursor = cursor[level]
			}
		}
		return data0
	}
	var coreRouter = function($window) {
		var supportsPushState = typeof $window.history.pushState === "function"
		var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
		function normalize1(fragment0) {
			var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
			if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
			return data
		}
		var asyncId
		function debounceAsync(callback0) {
			return function() {
				if (asyncId != null) return
				asyncId = callAsync0(function() {
					asyncId = null
					callback0()
				})
			}
		}
		function parsePath(path, queryData, hashData) {
			var queryIndex = path.indexOf("?")
			var hashIndex = path.indexOf("#")
			var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
			if (queryIndex > -1) {
				var queryEnd = hashIndex > -1 ? hashIndex : path.length
				var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
				for (var key4 in queryParams) queryData[key4] = queryParams[key4]
			}
			if (hashIndex > -1) {
				var hashParams = parseQueryString(path.slice(hashIndex + 1))
				for (var key4 in hashParams) hashData[key4] = hashParams[key4]
			}
			return path.slice(0, pathEnd)
		}
		var router = {prefix: "#!"}
		router.getPath = function() {
			var type2 = router.prefix.charAt(0)
			switch (type2) {
				case "#": return normalize1("hash").slice(router.prefix.length)
				case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
				default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
			}
		}
		router.setPath = function(path, data, options) {
			var queryData = {}, hashData = {}
			path = parsePath(path, queryData, hashData)
			if (data != null) {
				for (var key4 in data) queryData[key4] = data[key4]
				path = path.replace(/:([^\/]+)/g, function(match2, token) {
					delete queryData[token]
					return data[token]
				})
			}
			var query = buildQueryString(queryData)
			if (query) path += "?" + query
			var hash = buildQueryString(hashData)
			if (hash) path += "#" + hash
			if (supportsPushState) {
				var state = options ? options.state : null
				var title = options ? options.title : null
				$window.onpopstate()
				if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
				else $window.history.pushState(state, title, router.prefix + path)
			}
			else $window.location.href = router.prefix + path
		}
		router.defineRoutes = function(routes, resolve, reject) {
			function resolveRoute() {
				var path = router.getPath()
				var params = {}
				var pathname = parsePath(path, params, params)
				var state = $window.history.state
				if (state != null) {
					for (var k in state) params[k] = state[k]
				}
				for (var route0 in routes) {
					var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
					if (matcher.test(pathname)) {
						pathname.replace(matcher, function() {
							var keys = route0.match(/:[^\/]+/g) || []
							var values = [].slice.call(arguments, 1, -2)
							for (var i = 0; i < keys.length; i++) {
								params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
							}
							resolve(routes[route0], params, path, route0)
						})
						return
					}
				}
				reject(path, params)
			}
			if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
			else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
			resolveRoute()
		}
		return router
	}
	var _20 = function($window, redrawService0) {
		var routeService = coreRouter($window)
		var identity = function(v) {return v}
		var render1, component, attrs3, currentPath, lastUpdate
		var route = function(root, defaultRoute, routes) {
			if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
			var run1 = function() {
				if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
			}
			var bail = function(path) {
				if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
				else throw new Error("Could not resolve default route " + defaultRoute)
			}
			routeService.defineRoutes(routes, function(payload, params, path) {
				var update = lastUpdate = function(routeResolver, comp) {
					if (update !== lastUpdate) return
					component = comp != null && typeof comp.view === "function" ? comp : "div", attrs3 = params, currentPath = path, lastUpdate = null
					render1 = (routeResolver.render || identity).bind(routeResolver)
					run1()
				}
				if (payload.view) update({}, payload)
				else {
					if (payload.onmatch) {
						Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
							update(payload, resolved)
						}, bail)
					}
					else update(payload, "div")
				}
			}, bail)
			redrawService0.subscribe(root, run1)
		}
		route.set = function(path, data, options) {
			if (lastUpdate != null) options = {replace: true}
			lastUpdate = null
			routeService.setPath(path, data, options)
		}
		route.get = function() {return currentPath}
		route.prefix = function(prefix0) {routeService.prefix = prefix0}
		route.link = function(vnode1) {
			vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
			vnode1.dom.onclick = function(e) {
				if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
				e.preventDefault()
				e.redraw = false
				var href = this.getAttribute("href")
				if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
				route.set(href, undefined, undefined)
			}
		}
		route.param = function(key3) {
			if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
			return attrs3
		}
		return route
	}
	m.route = _20(window, redrawService)
	m.withAttr = function(attrName, callback1, context) {
		return function(e) {
			callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
		}
	}
	var _28 = coreRenderer(window)
	m.render = _28.render
	m.redraw = redrawService.redraw
	m.request = requestService.request
	m.jsonp = requestService.jsonp
	m.parseQueryString = parseQueryString
	m.buildQueryString = buildQueryString
	m.version = "1.0.1"
	m.vnode = Vnode
	if (true) module["exports"] = m
	else window.m = m
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(3);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.util = exports.time = exports.gui = exports.format = undefined;

	var _gui = __webpack_require__(7);

	var format = _interopRequireWildcard(_gui);

	var gui = _interopRequireWildcard(_gui);

	var _time = __webpack_require__(10);

	var time = _interopRequireWildcard(_time);

	var _util = __webpack_require__(13);

	var util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.format = format;
	exports.gui = gui;
	exports.time = time;
	exports.util = util;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Clock = __webpack_require__(8);

	Object.keys(_Clock).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _Clock[key];
	        }
	    });
	});

	var _Messages = __webpack_require__(11);

	Object.keys(_Messages).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _Messages[key];
	        }
	    });
	});

	var _TabSet = __webpack_require__(12);

	Object.keys(_TabSet).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _TabSet[key];
	        }
	    });
	});


	var Registry = {};

	// NOTE: The `exports` symbol in the two lines below used to read
	// `bliss.gui` before I moved this code inside the `bliss.gui` module.
	// Looking at the Babel ES6 => ES5 transpiled code, `exports` resolves
	// as the current module.  I'm not sure whether reyling on `exports`
	// is valid ES6, but from my quick perusal of The ECMAScript 2015
	// Language Specification, Section 9.4.6 Module Namespace Exotic
	// Objects (p. 105), it just might be valid.

	Object.keys(exports).map(function (name) {
	    Registry['bliss-' + name.toLowerCase()] = exports[name];
	});

	/**
	 * @returns a plain Javascript object representation of the HTML
	 * element attributes in a DOM NamedNodeMap.  That is:
	 *
	 *     `<... name="value" ...>`
	 *
	 * pairs become:
	 *
	 * `{ ..., name: value, ... }`
	 *
	 * pairs.
	 */
	function attrs2obj(attrs) {
	    var obj = {};

	    for (var n = 0; n < attrs.length; ++n) {
	        var item = attrs.item(n);
	        var value = item.value;

	        if (value == 'true') value = true;
	        if (value == 'false') value = false;

	        obj[item.name] = value;
	    }

	    return obj;
	}

	/**
	 * Creates a Mithril vnode for the given DOM element `elem`.
	 *
	 * @returns a Mithril vnode
	 */
	function createMithrilNode(elem) {
	    var node = null;

	    if (elem.nodeType == Node.ELEMENT_NODE) {
	        var name = elem.nodeName.toLowerCase();
	        var attrs = attrs2obj(elem.attributes);
	        var children = createMithrilNodes(elem.childNodes);

	        node = m(Registry[name] || name, attrs, children);
	    } else if (elem.nodeType == Node.TEXT_NODE) {
	        node = elem.nodeValue;
	    }

	    return node;
	}

	/**
	 * Creates a Mithril vnode for each DOM element in `elems`.
	 *
	 * @returns an array of Mithril vnodes.
	 */
	function createMithrilNodes(elems) {
	    return bliss.util.map(elems, createMithrilNode);
	}

	/**
	 * Initializes the BLISS GUI.
	 */
	function init() {
	    ready(function () {
	        var root = document.body;
	        var elems = bliss.util.map(root.childNodes, function (c) {
	            return c;
	        });
	        m.mount(root, { view: function view() {
	                return createMithrilNodes(elems);
	            } });
	    });
	}

	/**
	 * Calls the given when the HTML document is loaded and ready.
	 */
	function ready(fn) {
	    if (document.readyState !== 'loading') {
	        fn();
	    } else {
	        document.addEventListener('DOMContentLoaded', fn);
	    }
	}

	exports.init = init;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clock = undefined;

	var _mithril = __webpack_require__(1);

	var _mithril2 = _interopRequireDefault(_mithril);

	var _format = __webpack_require__(9);

	var format = _interopRequireWildcard(_format);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * BLISS Clock UI Widget
	 *
	 * The BLISS Clock UI Widget displays a clock with date and time that
	 * updates every second.  The display is configurable with at
	 * initialization time or by clicking on specific parts of the time.
	 *
	 * Configurable / Toggleable options include:
	 *
	 *   - 12-hour or 24-hour time
	 *   - Date (month and day) or Day of Year (DOY)
	 *   - UTC or localtime
	 */
	var Clock = {
	    _now: null,
	    _h24: true,
	    _utc: true,
	    _doy: false,

	    toggleH24: function toggleH24() {
	        this._h24 = !this._h24;
	    },
	    toggleUTC: function toggleUTC() {
	        this._utc = !this._utc;
	    },
	    toggleDOY: function toggleDOY() {
	        this._doy = !this._doy;
	    },
	    update: function update() {
	        this._now = new Date();
	    },


	    // Mithril lifecycle method
	    oninit: function oninit(vnode) {
	        this._h24 = vnode.attrs.h24 || Clock._h24;
	        this._utc = vnode.attrs.utc || Clock._utc;
	        this._doy = vnode.attrs.doy || Clock._doy;
	        this.update();
	    },


	    // Mithril lifecycle method
	    oncreate: function oncreate(vnode) {
	        var _this = this;

	        setInterval(function () {
	            Clock.update.call(_this);_mithril2.default.redraw();
	        }, 1000);
	    },


	    // Mithril view() method
	    view: function view(vnode) {
	        var opts = { doy: this._doy, h24: this._h24, utc: this._utc };
	        var date = format.date(this._now, opts);
	        var time = format.time(this._now, opts);
	        var tz = format.tz(this._now, opts);

	        return (0, _mithril2.default)('bliss-clock', vnode.attrs, [(0, _mithril2.default)('span.date', { onclick: Clock.toggleDOY.bind(this) }, date), ' ', (0, _mithril2.default)('span.time', { onclick: Clock.toggleH24.bind(this) }, time), ' ', (0, _mithril2.default)('span.tz', { onclick: Clock.toggleUTC.bind(this) }, tz)]);
	    }
	};

	exports.default = Clock;
	exports.Clock = Clock;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.tz = exports.time = exports.datetime = exports.date = undefined;

	var _mithril = __webpack_require__(1);

	var _mithril2 = _interopRequireDefault(_mithril);

	var _time = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function date(obj) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref$doy = _ref.doy,
	        doy = _ref$doy === undefined ? false : _ref$doy,
	        _ref$utc = _ref.utc,
	        utc = _ref$utc === undefined ? true : _ref$utc;

	    var yyyy = void 0,
	        mm = void 0,
	        dd = void 0,
	        formatted = void 0;
	    var date = normalize(obj);

	    if (utc) {
	        yyyy = date.getUTCFullYear();
	        mm = date.getUTCMonth();
	        dd = date.getUTCDate();
	    } else {
	        yyyy = date.getFullYear();
	        mm = date.getMonth();
	        dd = date.getDate();
	    }

	    if (doy) {
	        formatted = yyyy + '-' + pad3((0, _time.DOY)(yyyy, mm, dd));
	    } else {
	        formatted = yyyy + '- ' + pad2(mm + 1) + '-' + pad2(dd);
	    }

	    return formatted;
	}

	function datetime(obj) {
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    return date(obj, opts) + ' ' + time(obj, opts) + ' ' + tz(obj, opts);
	}

	/**
	 * @returns a Javascript Date object given either a date string or a
	 * Javascript Date object.
	 */
	function normalize(obj) {
	    var result = obj;

	    if (typeof obj === 'string') {
	        result = Date.parse(obj);
	    } else if (typeof obj === 'number') {
	        result = new Date(obj);
	    }

	    return result;
	}

	/**
	 * @returns the number n, as a string, padded with a leading zero if
	 * less-than 10.
	 */
	function pad2(n) {
	    return n < 10 ? '0' + n : n;
	}

	/**
	 * @returns the number n, as a string, padded with one or two leading
	 * zero if less-than 100 and 10, respectively.
	 */
	function pad3(n) {
	    return n < 100 ? '0' + pad2(n) : n;
	}

	function time(obj) {
	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref2$h = _ref2.h24,
	        h24 = _ref2$h === undefined ? true : _ref2$h,
	        _ref2$utc = _ref2.utc,
	        utc = _ref2$utc === undefined ? true : _ref2$utc;

	    var hh = void 0,
	        mm = void 0,
	        ss = void 0,
	        formatted = void 0;
	    var suffix = ' AM';
	    var time = normalize(obj);

	    if (utc) {
	        hh = time.getUTCHours();
	        mm = time.getUTCMinutes();
	        ss = time.getUTCSeconds();
	    } else {
	        hh = time.getHours();
	        mm = time.getMinutes();
	        ss = time.getSeconds();
	    }

	    if (!h24 && hh > 12) {
	        hh -= 12;
	        suffix = ' PM';
	    }

	    formatted = pad2(hh) + ':' + pad2(mm) + ':' + pad2(ss);

	    if (!h24) {
	        formatted += suffix;
	    }

	    return formatted;
	}

	function tz(obj) {
	    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref3$utc = _ref3.utc,
	        utc = _ref3$utc === undefined ? true : _ref3$utc;

	    return utc ? 'UTC' : (0, _time.timezone)(obj);
	}

	exports.date = date;
	exports.datetime = datetime;
	exports.time = time;
	exports.tz = tz;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @returns the Day Of Year (DOY) for the given date.
	 */
	function DOY(year, month, day) {
	    var days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	    var doy = days[month] + day;
	    if (isLeap(year) && month >= 2) {
	        doy += 1;
	    }

	    return doy;
	}

	/**
	 * @returns true if year is a leap year, false otherwise.
	 */
	function isLeap(year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	}

	/**
	 * @returns the timezone string for the given Javascript Date.
	 */
	function timezone(date) {
	    var match = /\((\w+)\)$/.exec(date.toString());
	    return Array.isArray(match) && match.length > 1 ? match[1] : '';
	}

	exports.DOY = DOY;
	exports.isLeap = isLeap;
	exports.timezone = timezone;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Messages = undefined;

	var _mithril = __webpack_require__(1);

	var _mithril2 = _interopRequireDefault(_mithril);

	var _format = __webpack_require__(9);

	var format = _interopRequireWildcard(_format);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Messages = {
	    _messages: [],
	    _source: null,

	    add: function add(msg) {
	        this._messages.push(this.normalizeMessage(msg));
	        _mithril2.default.redraw();
	    },
	    normalizeMessage: function normalizeMessage(msg) {
	        return {
	            timestamp: Date.parse(msg.asctime),
	            severity: msg.levelname,
	            message: msg.message
	        };
	    },
	    oninit: function oninit(vode) {
	        var _this = this;

	        this._source = new EventSource('/messages');
	        this._source.onmessage = function (event) {
	            return _this.add(JSON.parse(event.data));
	        };
	    },
	    view: function view(vnode) {
	        var rows = this._messages.map(function (msg) {
	            return (0, _mithril2.default)('tr', { class: 'log-' + msg.severity.toLowerCase() }, [(0, _mithril2.default)('td', { width: '20%' }, format.datetime(msg.timestamp)), (0, _mithril2.default)('td', { width: '10%' }, msg.levelname), (0, _mithril2.default)('td', { width: '70%' }, msg.message)]);
	        });

	        return (0, _mithril2.default)('bliss-messages', vnode.attrs, (0, _mithril2.default)('table', { class: 'table table-condensed' }, (0, _mithril2.default)('tbody', rows)));
	    }
	};

	exports.default = Messages;
	exports.Messages = Messages;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TabSet = undefined;

	var _mithril = __webpack_require__(1);

	var _mithril2 = _interopRequireDefault(_mithril);

	var _util = __webpack_require__(13);

	var util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * DragDrop
	 *
	 * DragDrop manages the drag-and-drop state and behavior for a TabSet,
	 * keeping track of the indicies of the `from` tab (i.e. the tab being
	 * dragged) and the current tab which is being dragged `over`.
	 */
	var DragDrop = {
	    _from: -1,
	    _over: -1,

	    /**
	     * Handle an HTML5 drop event for the tab at the given `index`.
	     *
	     * Calls `callback(from, to)`, where `from` is the index of the
	     * tab that was dragged and `to` is the index of the drop target
	     * tab.  In practical terms, callback is `TabSet.move(from, to)`.
	     */
	    drop: function drop(event, index, callback) {
	        if (this._from !== -1) {
	            event.preventDefault();
	            callback(this._from, index);
	        }
	    },


	    /**
	     * Handle the HTML5 `dragend` event for the tab at the given index.
	     */
	    end: function end(event, index) {
	        this._from = -1;
	        this._over = -1;
	    },


	    /**
	     * @returns true if the tab at the given index is being dragged
	     * over, false otherwise.
	     */
	    isOver: function isOver(index) {
	        return index === this._over;
	    },


	    /**
	     * Handle the HTML5 `dragover` event for the tab at the given index.
	     */
	    over: function over(event, index) {
	        event.preventDefault();
	        this._over = index;
	    },


	    /**
	     * Return CSS classes for the tab at the given index that is being
	     * dragged over.
	     *
	     * @pre  this.isOver(index) === true
	     */
	    overClass: function overClass(index) {
	        return 'drag-over-' + (this._from > index ? 'before' : 'after');
	    },


	    /**
	     * Handle the HTML5 `dragstart` event for the tab at the given index.
	     */
	    start: function start(event, index) {
	        event.dataTransfer.effectAllowed = 'move';
	        this._from = index;
	    }
	};

	/**
	 * BLISS TabSet
	 *
	 * BLISS TabSet is a Mithril UI component for a `<bliss-tabset>`,
	 * which manages a set of children `<bliss-tab>`s.  Tabs have a title
	 * attribute and their own child content.  When a TabSet is rendered
	 * to the DOM via its `view()` method, it:
	 *
	 *     1.  Uses `<bliss-tabset>` and `<bliss-tab>` HTML5 custom tags
	 *         for targeted CSS styling and customization, and
	 *
	 *     2.  Uses Bootstrap HTML structure and CSS classes
	 *
	 * A BLISS TabSet is signficantly more succinct than Bootstrap tabs.
	 * For example, compare creating a BLISS TabSet directly in HTML:
	 *
	 *     <bliss-tabset class="nav-tabs">
	 *         <bliss-tab title="Foo"> ... </bliss-tab>
	 *         <bliss-tab title="Bar"> ... </bliss-tab>
	 *         <bliss-tab title="Baz"> ... </bliss-tab>
	 *     </bliss-tab>
	 *
	 * To the corresponding Bootstrap HTML and CSS:
	 *
	 *     <ul class="nav nav-tabs">
	 *         <li> <a href="#">Foo</a> </li>
	 *         <li> <a href="#">Bar</a> </li>
	 *         <li> <a href="#">Baz</a> </li>
	 *     </ul>
	 *
	 *     <div class="tab-content">
	 *         <div class="tab-pane active"> ... </div>
	 *     </div>
	 *     <!-- Repeat for the contents of all three tabs -->
	 *
	 * Plus a BLISS TabSet only renders the contents of the active tab.
	 *
	 * Tabs may also be rendered as Bootstrap pills, stacked, justified,
	 * etc. by adding the [appropriate CSS
	 * classes](http://getbootstrap.com/components/#nav) to a
	 * <bliss-tabset>.
	 *
	 * Tabs may be reordered programmatically via `TabSet.move(from, to)`
	 * or by interactively via drag-and-drop.
	 */
	var TabSet = {
	    _active: 0, // The index of the active tab
	    _drag: null, // A DragDrop object, created in oninit()
	    _pos: [], // Maps tab position to initial DOM order
	    _uid: [], // Unique numeric ID for each tab (for Mithril keys)


	    /**
	     * Mithril `view()`-helper method
	     *
	     * Renders the `<a>` element of a Bootstrap tab.
	     *
	     * NOTE: The anchor element (`<a>`) of a tab is dragged, but it is
	     * dragged `over` and `drop`ped on parent `<li>` elements.  This
	     * is due primarily to the way Bootstrap tabs are styled and
	     * needing to accomodate CSS animations to slide tabs left or
	     * right to indicate where the dropped tab will be positioned.
	     */
	    anchor: function anchor(vnode, index) {
	        var _this = this;

	        var attrs = {
	            href: '#',
	            draggable: this.isActive(index),
	            ondragstart: function ondragstart(e) {
	                return _this._drag.start(e, index);
	            },
	            ondragend: function ondragend(e) {
	                return _this._drag.end(e, index);
	            }
	        };

	        return (0, _mithril2.default)('a', attrs, vnode.attrs.title);
	    },


	    /**
	     * Mithril `view()`-helper method
	     *
	     * Renders the content of the currently active tab using Bootstrap
	     * styling.  The passed-in `vnode` is the active `<bliss-tab>`.
	     */
	    content: function content(vnode) {
	        return (0, _mithril2.default)('bliss-tab', vnode.attrs, (0, _mithril2.default)('.tab-content', (0, _mithril2.default)('.tab-pane.active', vnode.children || vnode.text)));
	    },


	    /**
	     * @returns an array of only those Mithril `vnodes` that are
	     * `<bliss-tab>`s.
	     *
	     * This method is necessary because we cannot cache only child
	     * `<bliss-tab>` vnodes outside of a `view()` and every time the
	     * `view(vnodes)` render method is called, the passed-in `vnodes`
	     * will contain every child of a `<bliss-tabset>` (i.e. whitespace
	     * text fragments *and* `<bliss-tab>`s) in the original DOM
	     * (i.e. the HTML5 written by a user).
	     */
	    filterTabs: function filterTabs(vnodes) {
	        return vnodes.filter(function (c) {
	            return c.tag === 'bliss-tab';
	        });
	    },


	    /**
	     * @returns true if the tab at the given `index` is active, false
	     * otherwise.
	     */
	    isActive: function isActive(index) {
	        return index === this._active;
	    },


	    /**
	     * Moves the tab at index `from` to index `to`.
	     */
	    move: function move(from, to) {
	        var _this2 = this;

	        if (from === to) return;

	        var ntabs = this._pos.length;
	        var active = util.mapN(ntabs, function (index) {
	            return index === _this2._active;
	        });

	        util.move(this._pos, from, to);
	        util.move(this._uid, from, to);
	        util.move(active, from, to);

	        this._active = active.findIndex(function (elem) {
	            return elem;
	        });
	    },


	    /**
	     * Mithril lifecycle method
	     *
	     * Initializes this TabSet.
	     */
	    oninit: function oninit(vnode) {
	        var tabs = this.filterTabs(vnode.children);
	        this._pos = util.range(tabs.length);
	        this._uid = util.range(tabs.length);
	        this._drag = Object.create(DragDrop);
	    },


	    /**
	     * @returns an array of tabs, reordered according to the positions
	     * in `this._pos`.  For example, the following `pos[]` array would
	     * reverse the order of four tabs:
	     *
	     *   pos = [ 3, 2, 1, 0 ]
	     *
	     * By returning:
	     *
	     *     [ tabs[3], tabs[2], tabs[1], tabs[0] ]
	     *
	     * This method is necessary because we cannot cache child
	     * `<bliss-tab>` vnodes outside of a `view()` and every time the
	     * `view(vnodes)` render method is called, the order of
	     * `<bliss-tab>`s will be the same as the original DOM (i.e. the
	     * HTML5 written by a user).
	     */
	    reorder: function reorder(tabs) {
	        return this._pos.map(function (index) {
	            return tabs[index];
	        });
	    },


	    /**
	     * Mithril `view()`-helper method
	     *
	     * Renders the `<li>` element of a Bootstrap tab.
	     *
	     * NOTE: The anchor element (`<a>`) of a tab is dragged, but it is
	     * dragged `over` and `drop`ped on parent `<li>` elements.  This
	     * is due primarily to the way Bootstrap tabs are styled and
	     * needing to accomodate CSS animations to slide tabs left or
	     * right to indicate where the dropped tab will be positioned.
	     */
	    tab: function tab(vnode, index) {
	        var _this3 = this;

	        var move = TabSet.move.bind(this);
	        var attrs = {
	            class: this.tabClass(index),
	            key: this._uid[index],
	            onclick: function onclick() {
	                return _this3._active = index;
	            },
	            ondragover: function ondragover(e) {
	                return _this3._drag.over(e, index);
	            },
	            ondrop: function ondrop(e) {
	                return _this3._drag.drop(e, index, move);
	            }
	        };

	        return (0, _mithril2.default)('li', attrs, this.anchor(vnode, index));
	    },


	    /**
	     * @returns the CSS class(es) for the tab at the given `index`.
	     */
	    tabClass: function tabClass(index) {
	        var name = '';

	        if (this.isActive(index)) {
	            name = 'active';
	        } else if (this._drag.isOver(index)) {
	            name = this._drag.overClass(index);
	        }

	        return name;
	    },


	    /**
	     * Mithril `view()` method
	     *
	     * Renders this TabSet and its constituent tabs.
	     */
	    view: function view(vnode) {
	        var tabs = this.reorder(this.filterTabs(vnode.children));

	        return (0, _mithril2.default)('bliss-tabset', [(0, _mithril2.default)('ul.nav', vnode.attrs, tabs.map(TabSet.tab.bind(this))), this.content(tabs[this._active])]);
	    }
	};

	exports.default = TabSet;
	exports.TabSet = TabSet;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Maps the given function over the elements of `array`.
	 *
	 * This is equivalent to `array.map(fn)`.  Use this function when
	 * `array` is only *array-like* (i.e. has a length property and is
	 * integer indexable).  For example:
	 *
	 *     'Foo'.map(fn)    // TypeError: 'Foo'.map is not a function.
	 *     map('Foo', fn)   // Works!
	 */
	function map(array, fn) {
	  return Array.prototype.map.call(array, fn);
	}

	/**
	 * Maps the given function over the integers `[0, n - 1]`.  This
	 * is equivalent to:
	 *
	 *   [0, 1, 2, ..., n - 1].map(fn)
	 */
	function mapN(n, fn) {
	  var array = [];

	  for (var index = 0; index < n; ++index) {
	    array.push(fn(index));
	  }

	  return array;
	}

	/**
	 * Object.assign(target, ...sources) merges sources into target.
	 *
	 * @return target
	 */
	var merge = Object.assign;

	/**
	 * Moves array element at index `from` to index `to`, shifting all
	 * other values up and down, as appropriate.
	 */
	function move(array, from, to) {
	  array.splice(to, 0, array.splice(from, 1)[0]);
	}

	/**
	 * @returns an array in the range `[0, stop - 1]`.  This is equivalent
	 * to Python's `range()` function with a single argument.
	 */
	function range(stop) {
	  return mapN(stop, function (index) {
	    return index;
	  });
	}

	exports.map = map;
	exports.mapN = mapN;
	exports.merge = merge;
	exports.move = move;
	exports.range = range;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);