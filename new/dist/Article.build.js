webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4)
	module.exports = __webpack_require__(8)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(17)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel-loader?presets[]=es2015&plugins[]=transform-runtime!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./article.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel-loader?presets[]=es2015&plugins[]=transform-runtime!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./article.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./article.vue"], function () {
	var newOptions = require("-!babel-loader?presets[]=es2015&plugins[]=transform-runtime!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./article.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./article.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-66af0044&file=article.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./article.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=_v-66af0044&file=article.vue!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./article.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".article{\r\n    position: absolute;\r\n    left:0;\r\n    top:0;\r\n    background: #fff;\r\n    width:100%;\r\n}\r\n.content{\r\n    padding-top: 50px;\r\n}", ""]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style>
	
	// .article{
	
	//     position: absolute;
	
	//     left:0;
	
	//     top:0;
	
	//     background: #fff;
	
	//     width:100%;
	
	// }
	
	// .content{
	
	//     padding-top: 50px;
	
	// }
	
	// </style>
	
	// <template>
	
	//     <section class="article">
	
	//         <header class="navbar navbar-inverse navbar-fixed-top">
	
	//             <section class="container">
	
	//         		<div class="navbar-header">
	
	//         			<a href="javascript:window.history.go(-1);" class="navbar-brand">Michael Gong's Blog</a>
	
	//         		</div>
	
	//         	</section>
	
	//         </header>
	
	//         <section id="content" class="content">
	
	// 			<section class="container">
	
	// 				<div class="row">
	
	// 					<section class="col-md-9" rol="main">
	
	//                         <div id="md" class="bs-docs-section">
	
	//                             {{str}}
	
	//                         </div>
	
	//                     </section>
	
	//                 </div>
	
	//             </section>
	
	//         </section>
	
	//     </section>
	
	// </template>
	
	// <script type="text/javascript">
	// require('../libs/jquery.min.js');
	// require('../libs/marked.min.js');
	// require('../libs/prettify.min.js');
	// require('../libs/underscore.min.js');
	var editormd = window.editormd = __webpack_require__(9);
	var marked = window.marked = __webpack_require__(12);
	var prettifyPrint = window.prettifyPrint = __webpack_require__(13);
	__webpack_require__(15);
	exports.default = {
	    data: function data() {
	        return {
	            title: '',
	            str: ''
	        };
	    },
	    ready: function ready() {},
	
	    route: {
	        activate: function activate(transition) {
	            var me = this;
	            console.log(transition.to.params);
	            var editorMD = new editormd();
	            this.$http.get('./mark/ApplicationCache.md', function (data) {
	                // console.log(data);
	                transition.next({ str: data });
	
	                editorMD.markdownToHTML("md", {
	                    markdown: data, //+ "\r\n" + $("#append-test").text(),
	                    path: '../libs/',
	                    //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
	                    htmlDecode: "style,script,iframe", // you can filter tags decode
	                    //toc             : false,
	                    tocm: false, // Using [TOCM]
	                    //gfm             : false,
	                    //tocDropdown     : true,
	                    // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
	                    emoji: false,
	                    taskList: false
	                });
	                // me.str = data;
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*! Editor.md v1.5.0 | editormd.min.js | Open source online markdown editor. | MIT License | By: Pandao | https://github.com/pandao/editor.md | 2015-06-09 */
	!function(e){"use strict"; true?module.exports=e:"function"==typeof define?define.amd||define(["jquery"],e):window.editormd=e()}(function(){"use strict";var e="undefined"!=typeof jQuery?jQuery:Zepto;if("undefined"!=typeof e){var t=function(e,i){return new t.fn.init(e,i)};t.title=t.$name="Editor.md",t.version="1.5.0",t.homePage="https://pandao.github.io/editor.md/",t.classPrefix="editormd-",t.toolbarModes={full:["undo","redo","|","bold","del","italic","quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","|","link","reference-link","image","code","preformatted-text","code-block","table","datetime","emoji","html-entities","pagebreak","|","goto-line","watch","preview","fullscreen","clear","search","|","help","info"],simple:["undo","redo","|","bold","del","italic","quote","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","|","watch","preview","fullscreen","|","help","info"],mini:["undo","redo","|","watch","preview","|","help","info"]},t.defaults={mode:"gfm",name:"",value:"",theme:"",editorTheme:"default",previewTheme:"",markdown:"",appendMarkdown:"",width:"100%",height:"100%",path:"./lib/",pluginPath:"",delay:300,autoLoadModules:!0,watch:!0,placeholder:"Enjoy Markdown! coding now...",gotoLine:!0,codeFold:!1,autoHeight:!1,autoFocus:!0,autoCloseTags:!0,searchReplace:!0,syncScrolling:!0,readOnly:!1,tabSize:4,indentUnit:4,lineNumbers:!0,lineWrapping:!0,autoCloseBrackets:!0,showTrailingSpace:!0,matchBrackets:!0,indentWithTabs:!0,styleSelectedText:!0,matchWordHighlight:!0,styleActiveLine:!0,dialogLockScreen:!0,dialogShowMask:!0,dialogDraggable:!0,dialogMaskBgColor:"#fff",dialogMaskOpacity:.1,fontSize:"13px",saveHTMLToTextarea:!1,disabledKeyMaps:[],onload:function(){},onresize:function(){},onchange:function(){},onwatch:null,onunwatch:null,onpreviewing:function(){},onpreviewed:function(){},onfullscreen:function(){},onfullscreenExit:function(){},onscroll:function(){},onpreviewscroll:function(){},imageUpload:!1,imageFormats:["jpg","jpeg","gif","png","bmp","webp"],imageUploadURL:"",crossDomainUpload:!1,uploadCallbackURL:"",toc:!0,tocm:!1,tocTitle:"",tocDropdown:!1,tocContainer:"",tocStartLevel:1,htmlDecode:!1,pageBreak:!0,atLink:!0,emailLink:!0,taskList:!1,emoji:!1,tex:!1,flowChart:!1,sequenceDiagram:!1,previewCodeHighlight:!0,toolbar:!0,toolbarAutoFixed:!0,toolbarIcons:"full",toolbarTitles:{},toolbarHandlers:{ucwords:function(){return t.toolbarHandlers.ucwords},lowercase:function(){return t.toolbarHandlers.lowercase}},toolbarCustomIcons:{lowercase:'<a href="javascript:;" title="Lowercase" unselectable="on"><i class="fa" name="lowercase" style="font-size:24px;margin-top: -10px;">a</i></a>',ucwords:'<a href="javascript:;" title="ucwords" unselectable="on"><i class="fa" name="ucwords" style="font-size:20px;margin-top: -3px;">Aa</i></a>'},toolbarIconsClass:{undo:"fa-undo",redo:"fa-repeat",bold:"fa-bold",del:"fa-strikethrough",italic:"fa-italic",quote:"fa-quote-left",uppercase:"fa-font",h1:t.classPrefix+"bold",h2:t.classPrefix+"bold",h3:t.classPrefix+"bold",h4:t.classPrefix+"bold",h5:t.classPrefix+"bold",h6:t.classPrefix+"bold","list-ul":"fa-list-ul","list-ol":"fa-list-ol",hr:"fa-minus",link:"fa-link","reference-link":"fa-anchor",image:"fa-picture-o",code:"fa-code","preformatted-text":"fa-file-code-o","code-block":"fa-file-code-o",table:"fa-table",datetime:"fa-clock-o",emoji:"fa-smile-o","html-entities":"fa-copyright",pagebreak:"fa-newspaper-o","goto-line":"fa-terminal",watch:"fa-eye-slash",unwatch:"fa-eye",preview:"fa-desktop",search:"fa-search",fullscreen:"fa-arrows-alt",clear:"fa-eraser",help:"fa-question-circle",info:"fa-info-circle"},toolbarIconTexts:{},lang:{name:"zh-cn",description:"开源在线Markdown编辑器<br/>Open source online Markdown editor.",tocTitle:"目录",toolbar:{undo:"撤销（Ctrl+Z）",redo:"重做（Ctrl+Y）",bold:"粗体",del:"删除线",italic:"斜体",quote:"引用",ucwords:"将每个单词首字母转成大写",uppercase:"将所选转换成大写",lowercase:"将所选转换成小写",h1:"标题1",h2:"标题2",h3:"标题3",h4:"标题4",h5:"标题5",h6:"标题6","list-ul":"无序列表","list-ol":"有序列表",hr:"横线",link:"链接","reference-link":"引用链接",image:"添加图片",code:"行内代码","preformatted-text":"预格式文本 / 代码块（缩进风格）","code-block":"代码块（多语言风格）",table:"添加表格",datetime:"日期时间",emoji:"Emoji表情","html-entities":"HTML实体字符",pagebreak:"插入分页符","goto-line":"跳转到行",watch:"关闭实时预览",unwatch:"开启实时预览",preview:"全窗口预览HTML（按 Shift + ESC还原）",fullscreen:"全屏（按ESC还原）",clear:"清空",search:"搜索",help:"使用帮助",info:"关于"+t.title},buttons:{enter:"确定",cancel:"取消",close:"关闭"},dialog:{link:{title:"添加链接",url:"链接地址",urlTitle:"链接标题",urlEmpty:"错误：请填写链接地址。"},referenceLink:{title:"添加引用链接",name:"引用名称",url:"链接地址",urlId:"链接ID",urlTitle:"链接标题",nameEmpty:"错误：引用链接的名称不能为空。",idEmpty:"错误：请填写引用链接的ID。",urlEmpty:"错误：请填写引用链接的URL地址。"},image:{title:"添加图片",url:"图片地址",link:"图片链接",alt:"图片描述",uploadButton:"本地上传",imageURLEmpty:"错误：图片地址不能为空。",uploadFileEmpty:"错误：上传的图片不能为空。",formatNotAllowed:"错误：只允许上传图片文件，允许上传的图片文件格式有："},preformattedText:{title:"添加预格式文本或代码块",emptyAlert:"错误：请填写预格式文本或代码的内容。"},codeBlock:{title:"添加代码块",selectLabel:"代码语言：",selectDefaultText:"请选择代码语言",otherLanguage:"其他语言",unselectedLanguageAlert:"错误：请选择代码所属的语言类型。",codeEmptyAlert:"错误：请填写代码内容。"},htmlEntities:{title:"HTML 实体字符"},help:{title:"使用帮助"}}}},t.classNames={tex:t.classPrefix+"tex"},t.dialogZindex=99999,t.$katex=null,t.$marked=null,t.$CodeMirror=null,t.$prettyPrint=null;var i,o;t.prototype=t.fn={state:{watching:!1,loaded:!1,preview:!1,fullscreen:!1},init:function(i,o){o=o||{},"object"==typeof i&&(o=i);var r=this.classPrefix=t.classPrefix,n=this.settings=e.extend(!0,t.defaults,o);i="object"==typeof i?n.id:i;var a=this.editor=e("#"+i);this.id=i,this.lang=n.lang;var s=this.classNames={textarea:{html:r+"html-textarea",markdown:r+"markdown-textarea"}};n.pluginPath=""===n.pluginPath?n.path+"../plugins/":n.pluginPath,this.state.watching=n.watch?!0:!1,a.hasClass("editormd")||a.addClass("editormd"),a.css({width:"number"==typeof n.width?n.width+"px":n.width,height:"number"==typeof n.height?n.height+"px":n.height}),n.autoHeight&&a.css("height","auto");var l=this.markdownTextarea=a.children("textarea");l.length<1&&(a.append("<textarea></textarea>"),l=this.markdownTextarea=a.children("textarea")),l.addClass(s.textarea.markdown).attr("placeholder",n.placeholder),("undefined"==typeof l.attr("name")||""===l.attr("name"))&&l.attr("name",""!==n.name?n.name:i+"-markdown-doc");var c=[n.readOnly?"":'<a href="javascript:;" class="fa fa-close '+r+'preview-close-btn"></a>',n.saveHTMLToTextarea?'<textarea class="'+s.textarea.html+'" name="'+i+'-html-code"></textarea>':"",'<div class="'+r+'preview"><div class="markdown-body '+r+'preview-container"></div></div>','<div class="'+r+'container-mask" style="display:block;"></div>','<div class="'+r+'mask"></div>'].join("\n");return a.append(c).addClass(r+"vertical"),""!==n.theme&&a.addClass(r+"theme-"+n.theme),this.mask=a.children("."+r+"mask"),this.containerMask=a.children("."+r+"container-mask"),""!==n.markdown&&l.val(n.markdown),""!==n.appendMarkdown&&l.val(l.val()+n.appendMarkdown),this.htmlTextarea=a.children("."+s.textarea.html),this.preview=a.children("."+r+"preview"),this.previewContainer=this.preview.children("."+r+"preview-container"),""!==n.previewTheme&&this.preview.addClass(r+"preview-theme-"+n.previewTheme),"function"=="function"&&__webpack_require__(11)&&("undefined"!=typeof katex&&(t.$katex=katex),n.searchReplace&&!n.readOnly&&(t.loadCSS(n.path+"codemirror/addon/dialog/dialog"),t.loadCSS(n.path+"codemirror/addon/search/matchesonscrollbar"))), true?("undefined"!=typeof CodeMirror&&(t.$CodeMirror=CodeMirror),"undefined"!=typeof marked&&(t.$marked=marked),this.setCodeMirror().setToolbar().loadedDisplay()):this.loadQueues(),this},loadQueues:function(){var e=this,i=this.settings,o=i.path,r=function(){return t.isIE8?void e.loadedDisplay():void(i.flowChart||i.sequenceDiagram?t.loadScript(o+"raphael.min",function(){t.loadScript(o+"underscore.min",function(){!i.flowChart&&i.sequenceDiagram?t.loadScript(o+"sequence-diagram.min",function(){e.loadedDisplay()}):i.flowChart&&!i.sequenceDiagram?t.loadScript(o+"flowchart.min",function(){t.loadScript(o+"jquery.flowchart.min",function(){e.loadedDisplay()})}):i.flowChart&&i.sequenceDiagram&&t.loadScript(o+"flowchart.min",function(){t.loadScript(o+"jquery.flowchart.min",function(){t.loadScript(o+"sequence-diagram.min",function(){e.loadedDisplay()})})})})}):e.loadedDisplay())};return t.loadCSS(o+"codemirror/codemirror.min"),i.searchReplace&&!i.readOnly&&(t.loadCSS(o+"codemirror/addon/dialog/dialog"),t.loadCSS(o+"codemirror/addon/search/matchesonscrollbar")),i.codeFold&&t.loadCSS(o+"codemirror/addon/fold/foldgutter"),t.loadScript(o+"codemirror/codemirror.min",function(){t.$CodeMirror=CodeMirror,t.loadScript(o+"codemirror/modes.min",function(){t.loadScript(o+"codemirror/addons.min",function(){return e.setCodeMirror(),"gfm"!==i.mode&&"markdown"!==i.mode?(e.loadedDisplay(),!1):(e.setToolbar(),void t.loadScript(o+"marked.min",function(){t.$marked=marked,i.previewCodeHighlight?t.loadScript(o+"prettify.min",function(){r()}):r()}))})})}),this},setTheme:function(e){var t=this.editor,i=this.settings.theme,o=this.classPrefix+"theme-";return t.removeClass(o+i).addClass(o+e),this.settings.theme=e,this},setEditorTheme:function(e){var i=this.settings;return i.editorTheme=e,"default"!==e&&t.loadCSS(i.path+"codemirror/theme/"+i.editorTheme),this.cm.setOption("theme",e),this},setCodeMirrorTheme:function(e){return this.setEditorTheme(e),this},setPreviewTheme:function(e){var t=this.preview,i=this.settings.previewTheme,o=this.classPrefix+"preview-theme-";return t.removeClass(o+i).addClass(o+e),this.settings.previewTheme=e,this},setCodeMirror:function(){var e=this.settings,i=this.editor;"default"!==e.editorTheme&&t.loadCSS(e.path+"codemirror/theme/"+e.editorTheme);var o={mode:e.mode,theme:e.editorTheme,tabSize:e.tabSize,dragDrop:!1,autofocus:e.autoFocus,autoCloseTags:e.autoCloseTags,readOnly:e.readOnly?"nocursor":!1,indentUnit:e.indentUnit,lineNumbers:e.lineNumbers,lineWrapping:e.lineWrapping,extraKeys:{"Ctrl-Q":function(e){e.foldCode(e.getCursor())}},foldGutter:e.codeFold,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],matchBrackets:e.matchBrackets,indentWithTabs:e.indentWithTabs,styleActiveLine:e.styleActiveLine,styleSelectedText:e.styleSelectedText,autoCloseBrackets:e.autoCloseBrackets,showTrailingSpace:e.showTrailingSpace,highlightSelectionMatches:e.matchWordHighlight?{showToken:"onselected"===e.matchWordHighlight?!1:/\w/}:!1};return this.codeEditor=this.cm=t.$CodeMirror.fromTextArea(this.markdownTextarea[0],o),this.codeMirror=this.cmElement=i.children(".CodeMirror"),""!==e.value&&this.cm.setValue(e.value),this.codeMirror.css({fontSize:e.fontSize,width:e.watch?"50%":"100%"}),e.autoHeight&&(this.codeMirror.css("height","auto"),this.cm.setOption("viewportMargin",1/0)),e.lineNumbers||this.codeMirror.find(".CodeMirror-gutters").css("border-right","none"),this},getCodeMirrorOption:function(e){return this.cm.getOption(e)},setCodeMirrorOption:function(e,t){return this.cm.setOption(e,t),this},addKeyMap:function(e,t){return this.cm.addKeyMap(e,t),this},removeKeyMap:function(e){return this.cm.removeKeyMap(e),this},gotoLine:function(t){var i=this.settings;if(!i.gotoLine)return this;var o=this.cm,r=(this.editor,o.lineCount()),n=this.preview;if("string"==typeof t&&("last"===t&&(t=r),"first"===t&&(t=1)),"number"!=typeof t)return alert("Error: The line number must be an integer."),this;if(t=parseInt(t)-1,t>r)return alert("Error: The line number range 1-"+r),this;o.setCursor({line:t,ch:0});var a=o.getScrollInfo(),s=a.clientHeight,l=o.charCoords({line:t,ch:0},"local");if(o.scrollTo(null,(l.top+l.bottom-s)/2),i.watch){var c=this.codeMirror.find(".CodeMirror-scroll")[0],h=e(c).height(),d=c.scrollTop,u=d/c.scrollHeight;n.scrollTop(0===d?0:d+h>=c.scrollHeight-16?n[0].scrollHeight:n[0].scrollHeight*u)}return o.focus(),this},extend:function(){return"undefined"!=typeof arguments[1]&&("function"==typeof arguments[1]&&(arguments[1]=e.proxy(arguments[1],this)),this[arguments[0]]=arguments[1]),"object"==typeof arguments[0]&&"undefined"==typeof arguments[0].length&&e.extend(!0,this,arguments[0]),this},set:function(t,i){return"undefined"!=typeof i&&"function"==typeof i&&(i=e.proxy(i,this)),this[t]=i,this},config:function(t,i){var o=this.settings;return"object"==typeof t&&(o=e.extend(!0,o,t)),"string"==typeof t&&(o[t]=i),this.settings=o,this.recreate(),this},on:function(t,i){var o=this.settings;return"undefined"!=typeof o["on"+t]&&(o["on"+t]=e.proxy(i,this)),this},off:function(e){var t=this.settings;return"undefined"!=typeof t["on"+e]&&(t["on"+e]=function(){}),this},showToolbar:function(t){var i=this.settings;return i.readOnly?this:(i.toolbar&&(this.toolbar.length<1||""===this.toolbar.find("."+this.classPrefix+"menu").html())&&this.setToolbar(),i.toolbar=!0,this.toolbar.show(),this.resize(),e.proxy(t||function(){},this)(),this)},hideToolbar:function(t){var i=this.settings;return i.toolbar=!1,this.toolbar.hide(),this.resize(),e.proxy(t||function(){},this)(),this},setToolbarAutoFixed:function(t){var i=this.state,o=this.editor,r=this.toolbar,n=this.settings;"undefined"!=typeof t&&(n.toolbarAutoFixed=t);var a=function(){var t=e(window),i=t.scrollTop();return n.toolbarAutoFixed?void r.css(i-o.offset().top>10&&i<o.height()?{position:"fixed",width:o.width()+"px",left:(t.width()-o.width())/2+"px"}:{position:"absolute",width:"100%",left:0}):!1};return!i.fullscreen&&!i.preview&&n.toolbar&&n.toolbarAutoFixed&&e(window).bind("scroll",a),this},setToolbar:function(){var e=this.settings;if(e.readOnly)return this;var i=this.editor,o=(this.preview,this.classPrefix),r=this.toolbar=i.children("."+o+"toolbar");if(e.toolbar&&r.length<1){var n='<div class="'+o+'toolbar"><div class="'+o+'toolbar-container"><ul class="'+o+'menu"></ul></div></div>';i.append(n),r=this.toolbar=i.children("."+o+"toolbar")}if(!e.toolbar)return r.hide(),this;r.show();for(var a="function"==typeof e.toolbarIcons?e.toolbarIcons():"string"==typeof e.toolbarIcons?t.toolbarModes[e.toolbarIcons]:e.toolbarIcons,s=r.find("."+this.classPrefix+"menu"),l="",c=!1,h=0,d=a.length;d>h;h++){var u=a[h];if("||"===u)c=!0;else if("|"===u)l+='<li class="divider" unselectable="on">|</li>';else{var f=/h(\d)/.test(u),g=u;"watch"!==u||e.watch||(g="unwatch");var p=e.lang.toolbar[g],m=e.toolbarIconTexts[g],w=e.toolbarIconsClass[g];p="undefined"==typeof p?"":p,m="undefined"==typeof m?"":m,w="undefined"==typeof w?"":w;var v=c?'<li class="pull-right">':"<li>";"undefined"!=typeof e.toolbarCustomIcons[u]&&"function"!=typeof e.toolbarCustomIcons[u]?v+=e.toolbarCustomIcons[u]:(v+='<a href="javascript:;" title="'+p+'" unselectable="on">',v+='<i class="fa '+w+'" name="'+u+'" unselectable="on">'+(f?u.toUpperCase():""===w?m:"")+"</i>",v+="</a>"),v+="</li>",l=c?v+l:l+v}}return s.html(l),s.find('[title="Lowercase"]').attr("title",e.lang.toolbar.lowercase),s.find('[title="ucwords"]').attr("title",e.lang.toolbar.ucwords),this.setToolbarHandler(),this.setToolbarAutoFixed(),this},dialogLockScreen:function(){return e.proxy(t.dialogLockScreen,this)(),this},dialogShowMask:function(i){return e.proxy(t.dialogShowMask,this)(i),this},getToolbarHandles:function(e){var i=this.toolbarHandlers=t.toolbarHandlers;return e&&"undefined"!=typeof toolbarIconHandlers[e]?i[e]:i},setToolbarHandler:function(){var i=this,o=this.settings;if(!o.toolbar||o.readOnly)return this;var r=this.toolbar,n=this.cm,a=this.classPrefix,s=this.toolbarIcons=r.find("."+a+"menu > li > a"),l=this.getToolbarHandles();return s.bind(t.mouseOrTouch("click","touchend"),function(t){var r=e(this).children(".fa"),a=r.attr("name"),s=n.getCursor(),c=n.getSelection();return""!==a?(i.activeIcon=r,"undefined"!=typeof l[a]?e.proxy(l[a],i)(n):"undefined"!=typeof o.toolbarHandlers[a]&&e.proxy(o.toolbarHandlers[a],i)(n,r,s,c),"link"!==a&&"reference-link"!==a&&"image"!==a&&"code-block"!==a&&"preformatted-text"!==a&&"watch"!==a&&"preview"!==a&&"search"!==a&&"fullscreen"!==a&&"info"!==a&&n.focus(),!1):void 0}),this},createDialog:function(i){return e.proxy(t.createDialog,this)(i)},createInfoDialog:function(){var e=this,i=this.editor,o=this.classPrefix,r=['<div class="'+o+"dialog "+o+'dialog-info" style="">','<div class="'+o+'dialog-container">','<h1><i class="editormd-logo editormd-logo-lg editormd-logo-color"></i> '+t.title+"<small>v"+t.version+"</small></h1>","<p>"+this.lang.description+"</p>",'<p style="margin: 10px 0 20px 0;"><a href="'+t.homePage+'" target="_blank">'+t.homePage+' <i class="fa fa-external-link"></i></a></p>','<p style="font-size: 0.85em;">Copyright &copy; 2015 <a href="https://github.com/pandao" target="_blank" class="hover-link">Pandao</a>, The <a href="https://github.com/pandao/editor.md/blob/master/LICENSE" target="_blank" class="hover-link">MIT</a> License.</p>',"</div>",'<a href="javascript:;" class="fa fa-close '+o+'dialog-close"></a>',"</div>"].join("\n");i.append(r);var n=this.infoDialog=i.children("."+o+"dialog-info");return n.find("."+o+"dialog-close").bind(t.mouseOrTouch("click","touchend"),function(){e.hideInfoDialog()}),n.css("border",t.isIE8?"1px solid #ddd":"").css("z-index",t.dialogZindex).show(),this.infoDialogPosition(),this},infoDialogPosition:function(){var t=this.infoDialog,i=function(){t.css({top:(e(window).height()-t.height())/2+"px",left:(e(window).width()-t.width())/2+"px"})};return i(),e(window).resize(i),this},showInfoDialog:function(){e("html,body").css("overflow-x","hidden");var i=this.editor,o=this.settings,r=this.infoDialog=i.children("."+this.classPrefix+"dialog-info");return r.length<1&&this.createInfoDialog(),this.lockScreen(!0),this.mask.css({opacity:o.dialogMaskOpacity,backgroundColor:o.dialogMaskBgColor}).show(),r.css("z-index",t.dialogZindex).show(),this.infoDialogPosition(),this},hideInfoDialog:function(){return e("html,body").css("overflow-x",""),this.infoDialog.hide(),this.mask.hide(),this.lockScreen(!1),this},lockScreen:function(e){return t.lockScreen(e),this.resize(),this},recreate:function(){var e=this.editor,t=this.settings;return this.codeMirror.remove(),this.setCodeMirror(),t.readOnly||(e.find(".editormd-dialog").length>0&&e.find(".editormd-dialog").remove(),t.toolbar&&(this.getToolbarHandles(),this.setToolbar())),this.loadedDisplay(!0),this},previewCodeHighlight:function(){var e=this.settings,t=this.previewContainer;return e.previewCodeHighlight&&(t.find("pre").addClass("prettyprint linenums"),"undefined"!=typeof prettyPrint&&prettyPrint()),this},katexRender:function(){return null===i?this:(this.previewContainer.find("."+t.classNames.tex).each(function(){var i=e(this);t.$katex.render(i.text(),i[0]),i.find(".katex").css("font-size","1.6em")}),this)},flowChartAndSequenceDiagramRender:function(){var i=this,r=this.settings,n=this.previewContainer;if(t.isIE8)return this;if(r.flowChart){if(null===o)return this;n.find(".flowchart").flowChart()}r.sequenceDiagram&&n.find(".sequence-diagram").sequenceDiagram({theme:"simple"});var a=i.preview,s=i.codeMirror,l=s.find(".CodeMirror-scroll"),c=l.height(),h=l.scrollTop(),d=h/l[0].scrollHeight,u=0;a.find(".markdown-toc-list").each(function(){u+=e(this).height()});var f=a.find(".editormd-toc-menu").height();return f=f?f:0,a.scrollTop(0===h?0:h+c>=l[0].scrollHeight-16?a[0].scrollHeight:(a[0].scrollHeight+u+f)*d),this},registerKeyMaps:function(i){var o=this,r=this.cm,n=this.settings,a=t.toolbarHandlers,s=n.disabledKeyMaps;if(i=i||null){for(var l in i)if(e.inArray(l,s)<0){var c={};c[l]=i[l],r.addKeyMap(i)}}else{for(var h in t.keyMaps){var d=t.keyMaps[h],u="string"==typeof d?e.proxy(a[d],o):e.proxy(d,o);if(e.inArray(h,["F9","F10","F11"])<0&&e.inArray(h,s)<0){var f={};f[h]=u,r.addKeyMap(f)}}e(window).keydown(function(t){var i={120:"F9",121:"F10",122:"F11"};if(e.inArray(i[t.keyCode],s)<0)switch(t.keyCode){case 120:return e.proxy(a.watch,o)(),!1;case 121:return e.proxy(a.preview,o)(),!1;case 122:return e.proxy(a.fullscreen,o)(),!1}})}return this},bindScrollEvent:function(){var i=this,o=this.preview,r=this.settings,n=this.codeMirror,a=t.mouseOrTouch;if(!r.syncScrolling)return this;var s=function(){n.find(".CodeMirror-scroll").bind(a("scroll","touchmove"),function(t){var n=e(this).height(),a=e(this).scrollTop(),s=a/e(this)[0].scrollHeight,l=0;o.find(".markdown-toc-list").each(function(){l+=e(this).height()});var c=o.find(".editormd-toc-menu").height();c=c?c:0,o.scrollTop(0===a?0:a+n>=e(this)[0].scrollHeight-16?o[0].scrollHeight:(o[0].scrollHeight+l+c)*s),e.proxy(r.onscroll,i)(t)})},l=function(){n.find(".CodeMirror-scroll").unbind(a("scroll","touchmove"))},c=function(){o.bind(a("scroll","touchmove"),function(t){var o=e(this).height(),a=e(this).scrollTop(),s=a/e(this)[0].scrollHeight,l=n.find(".CodeMirror-scroll");l.scrollTop(0===a?0:a+o>=e(this)[0].scrollHeight?l[0].scrollHeight:l[0].scrollHeight*s),e.proxy(r.onpreviewscroll,i)(t)})},h=function(){o.unbind(a("scroll","touchmove"))};return n.bind({mouseover:s,mouseout:l,touchstart:s,touchend:l}),"single"===r.syncScrolling?this:(o.bind({mouseover:c,mouseout:h,touchstart:c,touchend:h}),this)},bindChangeEvent:function(){var e=this,t=this.cm,o=this.settings;return o.syncScrolling?(t.on("change",function(t,r){o.watch&&e.previewContainer.css("padding",o.autoHeight?"20px 20px 50px 40px":"20px"),i=setTimeout(function(){clearTimeout(i),e.save(),i=null},o.delay)}),this):this},loadedDisplay:function(t){t=t||!1;var i=this,o=this.editor,r=this.preview,n=this.settings;return this.containerMask.hide(),this.save(),n.watch&&r.show(),o.data("oldWidth",o.width()).data("oldHeight",o.height()),this.resize(),this.registerKeyMaps(),e(window).resize(function(){i.resize()}),this.bindScrollEvent().bindChangeEvent(),t||e.proxy(n.onload,this)(),this.state.loaded=!0,this},width:function(e){return this.editor.css("width","number"==typeof e?e+"px":e),this.resize(),this},height:function(e){return this.editor.css("height","number"==typeof e?e+"px":e),this.resize(),this},resize:function(t,i){t=t||null,i=i||null;var o=this.state,r=this.editor,n=this.preview,a=this.toolbar,s=this.settings,l=this.codeMirror;if(t&&r.css("width","number"==typeof t?t+"px":t),!s.autoHeight||o.fullscreen||o.preview?(i&&r.css("height","number"==typeof i?i+"px":i),o.fullscreen&&r.height(e(window).height()),s.toolbar&&!s.readOnly?l.css("margin-top",a.height()+1).height(r.height()-a.height()):l.css("margin-top",0).height(r.height())):(r.css("height","auto"),l.css("height","auto")),s.watch)if(l.width(r.width()/2),n.width(o.preview?r.width():r.width()/2),this.previewContainer.css("padding",s.autoHeight?"20px 20px 50px 40px":"20px"),s.toolbar&&!s.readOnly?n.css("top",a.height()+1):n.css("top",0),!s.autoHeight||o.fullscreen||o.preview){var c=s.toolbar&&!s.readOnly?r.height()-a.height():r.height();n.height(c)}else n.height("");else l.width(r.width()),n.hide();return o.loaded&&e.proxy(s.onresize,this)(),this},save:function(){if(null===i)return this;var r=this,n=this.state,a=this.settings,s=this.cm,l=s.getValue(),c=this.previewContainer;if("gfm"!==a.mode&&"markdown"!==a.mode)return this.markdownTextarea.val(l),this;var h=t.$marked,d=this.markdownToC=[],u=this.markedRendererOptions={toc:a.toc,tocm:a.tocm,tocStartLevel:a.tocStartLevel,pageBreak:a.pageBreak,taskList:a.taskList,emoji:a.emoji,tex:a.tex,atLink:a.atLink,emailLink:a.emailLink,flowChart:a.flowChart,sequenceDiagram:a.sequenceDiagram,previewCodeHighlight:a.previewCodeHighlight},f=this.markedOptions={renderer:t.markedRenderer(d,u),gfm:!0,tables:!0,breaks:!0,pedantic:!1,sanitize:a.htmlDecode?!1:!0,smartLists:!0,smartypants:!0};h.setOptions(f);var g=t.$marked(l,f);if(g=t.filterHTMLTags(g,a.htmlDecode),this.markdownTextarea.text(l),s.save(),a.saveHTMLToTextarea&&this.htmlTextarea.text(g),a.watch||!a.watch&&n.preview){if(c.html(g),this.previewCodeHighlight(),a.toc){var p=""===a.tocContainer?c:e(a.tocContainer),m=p.find("."+this.classPrefix+"toc-menu");p.attr("previewContainer",""===a.tocContainer?"true":"false"),""!==a.tocContainer&&m.length>0&&m.remove(),t.markdownToCRenderer(d,p,a.tocDropdown,a.tocStartLevel),(a.tocDropdown||p.find("."+this.classPrefix+"toc-menu").length>0)&&t.tocDropdownMenu(p,""!==a.tocTitle?a.tocTitle:this.lang.tocTitle),""!==a.tocContainer&&c.find(".markdown-toc").css("border","none")}a.tex&&(!t.kaTeXLoaded&&a.autoLoadModules?t.loadKaTeX(function(){t.$katex=katex,t.kaTeXLoaded=!0,r.katexRender()}):(t.$katex=katex,this.katexRender())),(a.flowChart||a.sequenceDiagram)&&(o=setTimeout(function(){clearTimeout(o),r.flowChartAndSequenceDiagramRender(),o=null},10)),n.loaded&&e.proxy(a.onchange,this)()}return this},focus:function(){return this.cm.focus(),this},setCursor:function(e){return this.cm.setCursor(e),this},getCursor:function(){return this.cm.getCursor()},setSelection:function(e,t){return this.cm.setSelection(e,t),this},getSelection:function(){return this.cm.getSelection()},setSelections:function(e){return this.cm.setSelections(e),this},getSelections:function(){return this.cm.getSelections()},replaceSelection:function(e){return this.cm.replaceSelection(e),this},insertValue:function(e){return this.replaceSelection(e),this},appendMarkdown:function(e){var t=(this.settings,this.cm);return t.setValue(t.getValue()+e),this},setMarkdown:function(e){return this.cm.setValue(e||this.settings.markdown),this},getMarkdown:function(){return this.cm.getValue()},getValue:function(){return this.cm.getValue()},setValue:function(e){return this.cm.setValue(e),this},clear:function(){return this.cm.setValue(""),this},getHTML:function(){return this.settings.saveHTMLToTextarea?this.htmlTextarea.val():(alert("Error: settings.saveHTMLToTextarea == false"),!1)},getTextareaSavedHTML:function(){return this.getHTML()},getPreviewedHTML:function(){return this.settings.watch?this.previewContainer.html():(alert("Error: settings.watch == false"),!1)},watch:function(t){var o=this.settings;if(e.inArray(o.mode,["gfm","markdown"])<0)return this;if(this.state.watching=o.watch=!0,this.preview.show(),this.toolbar){var r=o.toolbarIconsClass.watch,n=o.toolbarIconsClass.unwatch,a=this.toolbar.find(".fa[name=watch]");a.parent().attr("title",o.lang.toolbar.watch),a.removeClass(n).addClass(r)}return this.codeMirror.css("border-right","1px solid #ddd").width(this.editor.width()/2),i=0,this.save().resize(),o.onwatch||(o.onwatch=t||function(){}),e.proxy(o.onwatch,this)(),this},unwatch:function(t){var i=this.settings;if(this.state.watching=i.watch=!1,this.preview.hide(),this.toolbar){var o=i.toolbarIconsClass.watch,r=i.toolbarIconsClass.unwatch,n=this.toolbar.find(".fa[name=watch]");n.parent().attr("title",i.lang.toolbar.unwatch),n.removeClass(o).addClass(r)}return this.codeMirror.css("border-right","none").width(this.editor.width()),this.resize(),i.onunwatch||(i.onunwatch=t||function(){}),e.proxy(i.onunwatch,this)(),this},show:function(t){t=t||function(){};var i=this;return this.editor.show(0,function(){e.proxy(t,i)()}),this},hide:function(t){t=t||function(){};var i=this;return this.editor.hide(0,function(){e.proxy(t,i)()}),this},previewing:function(){var i=this,o=this.editor,r=this.preview,n=this.toolbar,a=this.settings,s=this.codeMirror,l=this.previewContainer;if(e.inArray(a.mode,["gfm","markdown"])<0)return this;a.toolbar&&n&&(n.toggle(),n.find(".fa[name=preview]").toggleClass("active")),s.toggle();var c=function(e){e.shiftKey&&27===e.keyCode&&i.previewed()};"none"===s.css("display")?(this.state.preview=!0,this.state.fullscreen&&r.css("background","#fff"),o.find("."+this.classPrefix+"preview-close-btn").show().bind(t.mouseOrTouch("click","touchend"),function(){i.previewed()}),a.watch?l.css("padding",""):this.save(),l.addClass(this.classPrefix+"preview-active"),r.show().css({position:"",top:0,width:o.width(),height:a.autoHeight&&!this.state.fullscreen?"auto":o.height()}),this.state.loaded&&e.proxy(a.onpreviewing,this)(),e(window).bind("keyup",c)):(e(window).unbind("keyup",c),this.previewed())},previewed:function(){var i=this.editor,o=this.preview,r=this.toolbar,n=this.settings,a=this.previewContainer,s=i.find("."+this.classPrefix+"preview-close-btn");return this.state.preview=!1,this.codeMirror.show(),n.toolbar&&r.show(),o[n.watch?"show":"hide"](),s.hide().unbind(t.mouseOrTouch("click","touchend")),a.removeClass(this.classPrefix+"preview-active"),n.watch&&a.css("padding","20px"),o.css({background:null,position:"absolute",width:i.width()/2,height:n.autoHeight&&!this.state.fullscreen?"auto":i.height()-r.height(),top:n.toolbar?r.height():0}),this.state.loaded&&e.proxy(n.onpreviewed,this)(),this},fullscreen:function(){var t=this,i=this.state,o=this.editor,r=(this.preview,this.toolbar),n=this.settings,a=this.classPrefix+"fullscreen";r&&r.find(".fa[name=fullscreen]").parent().toggleClass("active");var s=function(e){e.shiftKey||27!==e.keyCode||i.fullscreen&&t.fullscreenExit()};return o.hasClass(a)?(e(window).unbind("keyup",s),this.fullscreenExit()):(i.fullscreen=!0,e("html,body").css("overflow","hidden"),o.css({width:e(window).width(),height:e(window).height()}).addClass(a),this.resize(),e.proxy(n.onfullscreen,this)(),e(window).bind("keyup",s)),this},fullscreenExit:function(){var t=this.editor,i=this.settings,o=this.toolbar,r=this.classPrefix+"fullscreen";return this.state.fullscreen=!1,o&&o.find(".fa[name=fullscreen]").parent().removeClass("active"),e("html,body").css("overflow",""),t.css({width:t.data("oldWidth"),height:t.data("oldHeight")}).removeClass(r),this.resize(),e.proxy(i.onfullscreenExit,this)(),this},executePlugin:function(i,o){var r=this,n=this.cm,a=this.settings;return o=a.pluginPath+o, true?"undefined"==typeof this[i]?(alert("Error: "+i+" plugin is not found, you are not load this plugin."),this):(this[i](n),this):(e.inArray(o,t.loadFiles.plugin)<0?t.loadPlugin(o,function(){t.loadPlugins[i]=r[i],r[i](n)}):e.proxy(t.loadPlugins[i],this)(n),this)},search:function(e){var t=this.settings;return t.searchReplace?(t.readOnly||this.cm.execCommand(e||"find"),this):(alert("Error: settings.searchReplace == false"),this)},searchReplace:function(){return this.search("replace"),this},searchReplaceAll:function(){return this.search("replaceAll"),this}},t.fn.init.prototype=t.fn,t.dialogLockScreen=function(){var t=this.settings||{dialogLockScreen:!0};t.dialogLockScreen&&(e("html,body").css("overflow","hidden"),this.resize())},t.dialogShowMask=function(t){var i=this.editor,o=this.settings||{dialogShowMask:!0};t.css({top:(e(window).height()-t.height())/2+"px",left:(e(window).width()-t.width())/2+"px"}),o.dialogShowMask&&i.children("."+this.classPrefix+"mask").css("z-index",parseInt(t.css("z-index"))-1).show()},t.toolbarHandlers={undo:function(){this.cm.undo()},redo:function(){this.cm.redo()},bold:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection("**"+i+"**"),""===i&&e.setCursor(t.line,t.ch+2)},del:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection("~~"+i+"~~"),""===i&&e.setCursor(t.line,t.ch+2)},italic:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection("*"+i+"*"),""===i&&e.setCursor(t.line,t.ch+1)},quote:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("> "+i),e.setCursor(t.line,t.ch+2)):e.replaceSelection("> "+i)},ucfirst:function(){var e=this.cm,i=e.getSelection(),o=e.listSelections();e.replaceSelection(t.firstUpperCase(i)),e.setSelections(o)},ucwords:function(){var e=this.cm,i=e.getSelection(),o=e.listSelections();e.replaceSelection(t.wordsFirstUpperCase(i)),e.setSelections(o)},uppercase:function(){var e=this.cm,t=e.getSelection(),i=e.listSelections();e.replaceSelection(t.toUpperCase()),e.setSelections(i)},lowercase:function(){var e=this.cm,t=(e.getCursor(),e.getSelection()),i=e.listSelections();e.replaceSelection(t.toLowerCase()),e.setSelections(i)},h1:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("# "+i),e.setCursor(t.line,t.ch+2)):e.replaceSelection("# "+i)},h2:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),
	e.replaceSelection("## "+i),e.setCursor(t.line,t.ch+3)):e.replaceSelection("## "+i)},h3:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("### "+i),e.setCursor(t.line,t.ch+4)):e.replaceSelection("### "+i)},h4:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("#### "+i),e.setCursor(t.line,t.ch+5)):e.replaceSelection("#### "+i)},h5:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("##### "+i),e.setCursor(t.line,t.ch+6)):e.replaceSelection("##### "+i)},h6:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();0!==t.ch?(e.setCursor(t.line,0),e.replaceSelection("###### "+i),e.setCursor(t.line,t.ch+7)):e.replaceSelection("###### "+i)},"list-ul":function(){var e=this.cm,t=(e.getCursor(),e.getSelection());if(""===t)e.replaceSelection("- "+t);else{for(var i=t.split("\n"),o=0,r=i.length;r>o;o++)i[o]=""===i[o]?"":"- "+i[o];e.replaceSelection(i.join("\n"))}},"list-ol":function(){var e=this.cm,t=(e.getCursor(),e.getSelection());if(""===t)e.replaceSelection("1. "+t);else{for(var i=t.split("\n"),o=0,r=i.length;r>o;o++)i[o]=""===i[o]?"":o+1+". "+i[o];e.replaceSelection(i.join("\n"))}},hr:function(){{var e=this.cm,t=e.getCursor();e.getSelection()}e.replaceSelection((0!==t.ch?"\n\n":"\n")+"------------\n\n")},tex:function(){if(!this.settings.tex)return alert("settings.tex === false"),this;var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection("$$"+i+"$$"),""===i&&e.setCursor(t.line,t.ch+2)},link:function(){this.executePlugin("linkDialog","link-dialog/link-dialog")},"reference-link":function(){this.executePlugin("referenceLinkDialog","reference-link-dialog/reference-link-dialog")},pagebreak:function(){if(!this.settings.pageBreak)return alert("settings.pageBreak === false"),this;{var e=this.cm;e.getSelection()}e.replaceSelection("\r\n[========]\r\n")},image:function(){this.executePlugin("imageDialog","image-dialog/image-dialog")},code:function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection("`"+i+"`"),""===i&&e.setCursor(t.line,t.ch+1)},"code-block":function(){this.executePlugin("codeBlockDialog","code-block-dialog/code-block-dialog")},"preformatted-text":function(){this.executePlugin("preformattedTextDialog","preformatted-text-dialog/preformatted-text-dialog")},table:function(){this.executePlugin("tableDialog","table-dialog/table-dialog")},datetime:function(){var e=this.cm,i=(e.getSelection(),new Date,this.settings.lang.name),o=t.dateFormat()+" "+t.dateFormat("zh-cn"===i||"zh-tw"===i?"cn-week-day":"week-day");e.replaceSelection(o)},emoji:function(){this.executePlugin("emojiDialog","emoji-dialog/emoji-dialog")},"html-entities":function(){this.executePlugin("htmlEntitiesDialog","html-entities-dialog/html-entities-dialog")},"goto-line":function(){this.executePlugin("gotoLineDialog","goto-line-dialog/goto-line-dialog")},watch:function(){this[this.settings.watch?"unwatch":"watch"]()},preview:function(){this.previewing()},fullscreen:function(){this.fullscreen()},clear:function(){this.clear()},search:function(){this.search()},help:function(){this.executePlugin("helpDialog","help-dialog/help-dialog")},info:function(){this.showInfoDialog()}},t.keyMaps={"Ctrl-1":"h1","Ctrl-2":"h2","Ctrl-3":"h3","Ctrl-4":"h4","Ctrl-5":"h5","Ctrl-6":"h6","Ctrl-B":"bold","Ctrl-D":"datetime","Ctrl-E":function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();return this.settings.emoji?(e.replaceSelection(":"+i+":"),void(""===i&&e.setCursor(t.line,t.ch+1))):void alert("Error: settings.emoji == false")},"Ctrl-Alt-G":"goto-line","Ctrl-H":"hr","Ctrl-I":"italic","Ctrl-K":"code","Ctrl-L":function(){var e=this.cm,t=e.getCursor(),i=e.getSelection(),o=""===i?"":' "'+i+'"';e.replaceSelection("["+i+"]("+o+")"),""===i&&e.setCursor(t.line,t.ch+1)},"Ctrl-U":"list-ul","Shift-Ctrl-A":function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();return this.settings.atLink?(e.replaceSelection("@"+i),void(""===i&&e.setCursor(t.line,t.ch+1))):void alert("Error: settings.atLink == false")},"Shift-Ctrl-C":"code","Shift-Ctrl-Q":"quote","Shift-Ctrl-S":"del","Shift-Ctrl-K":"tex","Shift-Alt-C":function(){var e=this.cm,t=e.getCursor(),i=e.getSelection();e.replaceSelection(["```",i,"```"].join("\n")),""===i&&e.setCursor(t.line,t.ch+3)},"Shift-Ctrl-Alt-C":"code-block","Shift-Ctrl-H":"html-entities","Shift-Alt-H":"help","Shift-Ctrl-E":"emoji","Shift-Ctrl-U":"uppercase","Shift-Alt-U":"ucwords","Shift-Ctrl-Alt-U":"ucfirst","Shift-Alt-L":"lowercase","Shift-Ctrl-I":function(){var e=this.cm,t=e.getCursor(),i=e.getSelection(),o=""===i?"":' "'+i+'"';e.replaceSelection("!["+i+"]("+o+")"),""===i&&e.setCursor(t.line,t.ch+4)},"Shift-Ctrl-Alt-I":"image","Shift-Ctrl-L":"link","Shift-Ctrl-O":"list-ol","Shift-Ctrl-P":"preformatted-text","Shift-Ctrl-T":"table","Shift-Alt-P":"pagebreak",F9:"watch",F10:"preview",F11:"fullscreen"};var r=function(e){return String.prototype.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};t.trim=r;var n=function(e){return e.toLowerCase().replace(/\b(\w)|\s(\w)/g,function(e){return e.toUpperCase()})};t.ucwords=t.wordsFirstUpperCase=n;var a=function(e){return e.toLowerCase().replace(/\b(\w)/,function(e){return e.toUpperCase()})};return t.firstUpperCase=t.ucfirst=a,t.urls={atLinkBase:"https://github.com/"},t.regexs={atLink:/@(\w+)/g,email:/(\w+)@(\w+)\.(\w+)\.?(\w+)?/g,emailLink:/(mailto:)?([\w\.\_]+)@(\w+)\.(\w+)\.?(\w+)?/g,emoji:/:([\w\+-]+):/g,emojiDatetime:/(\d{2}:\d{2}:\d{2})/g,twemoji:/:(tw-([\w]+)-?(\w+)?):/g,fontAwesome:/:(fa-([\w]+)(-(\w+)){0,}):/g,editormdLogo:/:(editormd-logo-?(\w+)?):/g,pageBreak:/^\[[=]{8,}\]$/},t.emoji={path:"http://www.emoji-cheat-sheet.com/graphics/emojis/",ext:".png"},t.twemoji={path:"http://twemoji.maxcdn.com/36x36/",ext:".png"},t.markedRenderer=function(i,o){var n={toc:!0,tocm:!1,tocStartLevel:1,pageBreak:!0,atLink:!0,emailLink:!0,taskList:!1,emoji:!1,tex:!1,flowChart:!1,sequenceDiagram:!1},a=e.extend(n,o||{}),s=t.$marked,l=new s.Renderer;i=i||[];var c=t.regexs,h=c.atLink,d=c.emoji,u=c.email,f=c.emailLink,g=c.twemoji,p=c.fontAwesome,m=c.editormdLogo,w=c.pageBreak;return l.emoji=function(e){e=e.replace(t.regexs.emojiDatetime,function(e){return e.replace(/:/g,"&#58;")});var i=e.match(d);if(!i||!a.emoji)return e;for(var o=0,r=i.length;r>o;o++)":+1:"===i[o]&&(i[o]=":\\+1:"),e=e.replace(new RegExp(i[o]),function(e,i){var o=e.match(p),r=e.replace(/:/g,"");if(o)for(var n=0,a=o.length;a>n;n++){var s=o[n].replace(/:/g,"");return'<i class="fa '+s+' fa-emoji" title="'+s.replace("fa-","")+'"></i>'}else{var l=e.match(m),c=e.match(g);if(l)for(var h=0,d=l.length;d>h;h++){var u=l[h].replace(/:/g,"");return'<i class="'+u+'" title="Editor.md logo ('+u+')"></i>'}else{if(!c){var f="+1"===r?"plus1":r;return f="black_large_square"===f?"black_square":f,f="moon"===f?"waxing_gibbous_moon":f,'<img src="'+t.emoji.path+f+t.emoji.ext+'" class="emoji" title="&#58;'+r+'&#58;" alt="&#58;'+r+'&#58;" />'}for(var w=0,v=c.length;v>w;w++){var k=c[w].replace(/:/g,"").replace("tw-","");return'<img src="'+t.twemoji.path+k+t.twemoji.ext+'" title="twemoji-'+k+'" alt="twemoji-'+k+'" class="emoji twemoji" />'}}}});return e},l.atLink=function(i){return h.test(i)?(a.atLink&&(i=i.replace(u,function(e,t,i,o){return e.replace(/@/g,"_#_&#64;_#_")}),i=i.replace(h,function(e,i){return'<a href="'+t.urls.atLinkBase+i+'" title="&#64;'+i+'" class="at-link">'+e+"</a>"}).replace(/_#_&#64;_#_/g,"@")),a.emailLink&&(i=i.replace(f,function(t,i,o,r,n){return!i&&e.inArray(n,"jpg|jpeg|png|gif|webp|ico|icon|pdf".split("|"))<0?'<a href="mailto:'+t+'">'+t+"</a>":t})),i):i},l.link=function(e,t,i){if(this.options.sanitize){try{var o=decodeURIComponent(unescape(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(r){return""}if(0===o.indexOf("javascript:"))return""}var n='<a href="'+e+'"';return h.test(t)||h.test(i)?(t&&(n+=' title="'+t.replace(/@/g,"&#64;")),n+'">'+i.replace(/@/g,"&#64;")+"</a>"):(t&&(n+=' title="'+t+'"'),n+=">"+i+"</a>")},l.heading=function(e,t,o){var n=e,a=/\s*\<a\s*href\=\"(.*)\"\s*([^\>]*)\>(.*)\<\/a\>\s*/;if(a.test(e)){var s=[];e=e.split(/\<a\s*([^\>]+)\>([^\>]*)\<\/a\>/);for(var l=0,c=e.length;c>l;l++)s.push(e[l].replace(/\s*href\=\"(.*)\"\s*/g,""));e=s.join(" ")}e=r(e);var h=e.toLowerCase().replace(/[^\w]+/g,"-"),d={text:e,level:t,slug:h},u=/^[\u4e00-\u9fa5]+$/.test(e),f=u?escape(e).replace(/\%/g,""):e.toLowerCase().replace(/[^\w]+/g,"-");i.push(d);var g="<h"+t+' id="h'+t+"-"+this.options.headerPrefix+f+'">';return g+='<a name="'+e+'" class="reference-link"></a>',g+='<span class="header-link octicon octicon-link"></span>',g+=this.atLink(a?this.emoji(n):this.emoji(e)),g+="</h"+t+">"},l.pageBreak=function(e){return w.test(e)&&a.pageBreak&&(e='<hr style="page-break-after:always;" class="page-break editormd-page-break" />'),e},l.paragraph=function(e){var i=/\$\$(.*)\$\$/g.test(e),o=/^\$\$(.*)\$\$$/.test(e),r=o?' class="'+t.classNames.tex+'"':"",n=a.tocm?/^(\[TOC\]|\[TOCM\])$/.test(e):/^\[TOC\]$/.test(e),s=/^\[TOCM\]$/.test(e);e=!o&&i?e.replace(/(\$\$([^\$]*)\$\$)+/g,function(e,i){return'<span class="'+t.classNames.tex+'">'+i.replace(/\$/g,"")+"</span>"}):o?e.replace(/\$/g,""):e;var l='<div class="markdown-toc editormd-markdown-toc">'+e+"</div>";return n?s?'<div class="editormd-toc-menu">'+l+"</div><br/>":l:w.test(e)?this.pageBreak(e):"<p"+r+">"+this.atLink(this.emoji(e))+"</p>\n"},l.code=function(e,i,o){return"seq"===i||"sequence"===i?'<div class="sequence-diagram">'+e+"</div>":"flow"===i?'<div class="flowchart">'+e+"</div>":"math"===i||"latex"===i||"katex"===i?'<p class="'+t.classNames.tex+'">'+e+"</p>":s.Renderer.prototype.code.apply(this,arguments)},l.tablecell=function(e,t){var i=t.header?"th":"td",o=t.align?"<"+i+' style="text-align:'+t.align+'">':"<"+i+">";return o+this.atLink(this.emoji(e))+"</"+i+">\n"},l.listitem=function(e){return a.taskList&&/^\s*\[[x\s]\]\s*/.test(e)?(e=e.replace(/^\s*\[\s\]\s*/,'<input type="checkbox" class="task-list-item-checkbox" /> ').replace(/^\s*\[x\]\s*/,'<input type="checkbox" class="task-list-item-checkbox" checked disabled /> '),'<li style="list-style: none;">'+this.atLink(this.emoji(e))+"</li>"):"<li>"+this.atLink(this.emoji(e))+"</li>"},l},t.markdownToCRenderer=function(e,t,i,o){var r="",n=0,a=this.classPrefix;o=o||1;for(var s=0,l=e.length;l>s;s++){var c=e[s].text,h=e[s].level;o>h||(r+=h>n?"":n>h?new Array(n-h+2).join("</ul></li>"):"</ul></li>",r+='<li><a class="toc-level-'+h+'" href="#'+c+'" level="'+h+'">'+c+"</a><ul>",n=h)}var d=t.find(".markdown-toc");if(d.length<1&&"false"===t.attr("previewContainer")){var u='<div class="markdown-toc '+a+'markdown-toc"></div>';u=i?'<div class="'+a+'toc-menu">'+u+"</div>":u,t.html(u),d=t.find(".markdown-toc")}return i&&d.wrap('<div class="'+a+'toc-menu"></div><br/>'),d.html('<ul class="markdown-toc-list"></ul>').children(".markdown-toc-list").html(r.replace(/\r?\n?\<ul\>\<\/ul\>/g,"")),d},t.tocDropdownMenu=function(t,i){i=i||"Table of Contents";var o=400,r=t.find("."+this.classPrefix+"toc-menu");return r.each(function(){var t=e(this),r=t.children(".markdown-toc"),n='<i class="fa fa-angle-down"></i>',a='<a href="javascript:;" class="toc-menu-btn">'+n+i+"</a>",s=r.children("ul"),l=s.find("li");r.append(a),l.first().before("<li><h1>"+i+" "+n+"</h1></li>"),t.mouseover(function(){s.show(),l.each(function(){var t=e(this),i=t.children("ul");if(""===i.html()&&i.remove(),i.length>0&&""!==i.html()){var r=t.children("a").first();r.children(".fa").length<1&&r.append(e(n).css({"float":"right",paddingTop:"4px"}))}t.mouseover(function(){i.css("z-index",o).show(),o+=1}).mouseleave(function(){i.hide()})})}).mouseleave(function(){s.hide()})}),r},t.filterHTMLTags=function(t,i){if("string"!=typeof t&&(t=new String(t)),"string"!=typeof i)return t;for(var o=i.split("|"),r=o[0].split(","),n=o[1],a=0,s=r.length;s>a;a++){var l=r[a];t=t.replace(new RegExp("<s*"+l+"s*([^>]*)>([^>]*)<s*/"+l+"s*>","igm"),"")}if("undefined"!=typeof n){var c=/\<(\w+)\s*([^\>]*)\>([^\>]*)\<\/(\w+)\>/gi;t="*"===n?t.replace(c,function(e,t,i,o,r){return"<"+t+">"+o+"</"+r+">"}):"on*"===n?t.replace(c,function(t,i,o,r,n){var a=e("<"+i+">"+r+"</"+n+">"),s=e(t)[0].attributes,l={};e.each(s,function(e,t){'"'!==t.nodeName&&(l[t.nodeName]=t.nodeValue)}),e.each(l,function(e){0===e.indexOf("on")&&delete l[e]}),a.attr(l);var c="undefined"!=typeof a[1]?e(a[1]).text():"";return a[0].outerHTML+c}):t.replace(c,function(t,i,o,r){var a=n.split(","),s=e(t);return s.html(r),e.each(a,function(e){s.attr(a[e],null)}),s[0].outerHTML})}return t},t.markdownToHTML=function(i,o){var r={gfm:!0,toc:!0,tocm:!1,tocStartLevel:1,tocTitle:"目录",tocDropdown:!1,tocContainer:"",markdown:"",markdownSourceCode:!1,htmlDecode:!1,autoLoadKaTeX:!0,pageBreak:!0,atLink:!0,emailLink:!0,tex:!1,taskList:!1,emoji:!1,flowChart:!1,sequenceDiagram:!1,previewCodeHighlight:!0};t.$marked=marked;var n=e("#"+i),a=n.settings=e.extend(!0,r,o||{}),s=n.find("textarea");s.length<1&&(n.append("<textarea></textarea>"),s=n.find("textarea"));var l=""===a.markdown?s.val():a.markdown,c=[],h={toc:a.toc,tocm:a.tocm,tocStartLevel:a.tocStartLevel,taskList:a.taskList,emoji:a.emoji,tex:a.tex,pageBreak:a.pageBreak,atLink:a.atLink,emailLink:a.emailLink,flowChart:a.flowChart,sequenceDiagram:a.sequenceDiagram,previewCodeHighlight:a.previewCodeHighlight},d={renderer:t.markedRenderer(c,h),gfm:a.gfm,tables:!0,breaks:!0,pedantic:!1,sanitize:a.htmlDecode?!1:!0,smartLists:!0,smartypants:!0};l=new String(l);var u=marked(l,d);u=t.filterHTMLTags(u,a.htmlDecode),a.markdownSourceCode?s.text(l):s.remove(),n.addClass("markdown-body "+this.classPrefix+"html-preview").append(u);var f=""!==a.tocContainer?e(a.tocContainer):n;if(""!==a.tocContainer&&f.attr("previewContainer",!1),a.toc&&(n.tocContainer=this.markdownToCRenderer(c,f,a.tocDropdown,a.tocStartLevel),(a.tocDropdown||n.find("."+this.classPrefix+"toc-menu").length>0)&&this.tocDropdownMenu(n,a.tocTitle),""!==a.tocContainer&&n.find(".editormd-toc-menu, .editormd-markdown-toc").remove()),a.previewCodeHighlight&&(n.find("pre").addClass("prettyprint linenums"),prettyPrint()),t.isIE8||(a.flowChart&&n.find(".flowchart").flowChart(),a.sequenceDiagram&&n.find(".sequence-diagram").sequenceDiagram({theme:"simple"})),a.tex){var g=function(){n.find("."+t.classNames.tex).each(function(){var t=e(this);katex.render(t.html().replace(/&lt;/g,"<").replace(/&gt;/g,">"),t[0]),t.find(".katex").css("font-size","1.6em")})};!a.autoLoadKaTeX||t.$katex||t.kaTeXLoaded?g():this.loadKaTeX(function(){t.$katex=katex,t.kaTeXLoaded=!0,g()})}return n.getMarkdown=function(){return s.val()},n},t.themes=["default","dark"],t.previewThemes=["default","dark"],t.editorThemes=["default","3024-day","3024-night","ambiance","ambiance-mobile","base16-dark","base16-light","blackboard","cobalt","eclipse","elegant","erlang-dark","lesser-dark","mbo","mdn-like","midnight","monokai","neat","neo","night","paraiso-dark","paraiso-light","pastel-on-dark","rubyblue","solarized","the-matrix","tomorrow-night-eighties","twilight","vibrant-ink","xq-dark","xq-light"],t.loadPlugins={},t.loadFiles={js:[],css:[],plugin:[]},t.loadPlugin=function(e,i,o){i=i||function(){},this.loadScript(e,function(){t.loadFiles.plugin.push(e),i()},o)},t.loadCSS=function(e,i,o){o=o||"head",i=i||function(){};var r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.onload=r.onreadystatechange=function(){t.loadFiles.css.push(e),i()},r.href=e+".css","head"===o?document.getElementsByTagName("head")[0].appendChild(r):document.body.appendChild(r)},t.isIE="Microsoft Internet Explorer"==navigator.appName,t.isIE8=t.isIE&&"8."==navigator.appVersion.match(/8./i),t.loadScript=function(e,i,o){o=o||"head",i=i||function(){};var r=null;r=document.createElement("script"),r.id=e.replace(/[\./]+/g,"-"),r.type="text/javascript",r.src=e+".js",t.isIE8?r.onreadystatechange=function(){r.readyState&&("loaded"===r.readyState||"complete"===r.readyState)&&(r.onreadystatechange=null,t.loadFiles.js.push(e),i())}:r.onload=function(){t.loadFiles.js.push(e),i()},"head"===o?document.getElementsByTagName("head")[0].appendChild(r):document.body.appendChild(r)},t.katexURL={css:"//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min",js:"//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min"},t.kaTeXLoaded=!1,t.loadKaTeX=function(e){t.loadCSS(t.katexURL.css,function(){t.loadScript(t.katexURL.js,e||function(){})})},t.lockScreen=function(t){e("html,body").css("overflow",t?"hidden":"")},t.createDialog=function(i){var o={name:"",width:420,height:240,title:"",drag:!0,closed:!0,content:"",mask:!0,maskStyle:{backgroundColor:"#fff",opacity:.1},lockScreen:!0,footer:!0,buttons:!1};i=e.extend(!0,o,i);var r=this,n=this.editor,a=t.classPrefix,s=(new Date).getTime(),l=""===i.name?a+"dialog-"+s:i.name,c=t.mouseOrTouch,h='<div class="'+a+"dialog "+l+'">';""!==i.title&&(h+='<div class="'+a+'dialog-header"'+(i.drag?' style="cursor: move;"':"")+">",h+='<strong class="'+a+'dialog-title">'+i.title+"</strong>",h+="</div>"),i.closed&&(h+='<a href="javascript:;" class="fa fa-close '+a+'dialog-close"></a>'),h+='<div class="'+a+'dialog-container">'+i.content,(i.footer||"string"==typeof i.footer)&&(h+='<div class="'+a+'dialog-footer">'+("boolean"==typeof i.footer?"":i.footer)+"</div>"),h+="</div>",h+='<div class="'+a+"dialog-mask "+a+'dialog-mask-bg"></div>',h+='<div class="'+a+"dialog-mask "+a+'dialog-mask-con"></div>',h+="</div>",n.append(h);var d=n.find("."+l);d.lockScreen=function(t){return i.lockScreen&&(e("html,body").css("overflow",t?"hidden":""),r.resize()),d},d.showMask=function(){return i.mask&&n.find("."+a+"mask").css(i.maskStyle).css("z-index",t.dialogZindex-1).show(),d},d.hideMask=function(){return i.mask&&n.find("."+a+"mask").hide(),d},d.loading=function(e){var t=d.find("."+a+"dialog-mask");return t[e?"show":"hide"](),d},d.lockScreen(!0).showMask(),d.show().css({zIndex:t.dialogZindex,border:t.isIE8?"1px solid #ddd":"",width:"number"==typeof i.width?i.width+"px":i.width,height:"number"==typeof i.height?i.height+"px":i.height});var u=function(){d.css({top:(e(window).height()-d.height())/2+"px",left:(e(window).width()-d.width())/2+"px"})};if(u(),e(window).resize(u),d.children("."+a+"dialog-close").bind(c("click","touchend"),function(){d.hide().lockScreen(!1).hideMask()}),"object"==typeof i.buttons){var f=d.footer=d.find("."+a+"dialog-footer");for(var g in i.buttons){var p=i.buttons[g],m=a+g+"-btn";f.append('<button class="'+a+"btn "+m+'">'+p[0]+"</button>"),p[1]=e.proxy(p[1],d),f.children("."+m).bind(c("click","touchend"),p[1])}}if(""!==i.title&&i.drag){var w,v,k=d.children("."+a+"dialog-header");i.mask||k.bind(c("click","touchend"),function(){t.dialogZindex+=2,d.css("z-index",t.dialogZindex)}),k.mousedown(function(e){e=e||window.event,w=e.clientX-parseInt(d[0].style.left),v=e.clientY-parseInt(d[0].style.top),document.onmousemove=y});var b=function(e){e.removeClass(a+"user-unselect").off("selectstart")},x=function(e){e.addClass(a+"user-unselect").on("selectstart",function(e){return!1})},y=function(t){t=t||window.event;var i,o,r=parseInt(d[0].style.left),n=parseInt(d[0].style.top);r>=0?r+d.width()<=e(window).width()?i=t.clientX-w:(i=e(window).width()-d.width(),document.onmousemove=null):(i=0,document.onmousemove=null),n>=0?o=t.clientY-v:(o=0,document.onmousemove=null),document.onselectstart=function(){return!1},x(e("body")),x(d),d[0].style.left=i+"px",d[0].style.top=o+"px"};document.onmouseup=function(){b(e("body")),b(d),document.onselectstart=null,document.onmousemove=null},k.touchDraggable=function(){var t=null,i=function(i){var o=i.originalEvent,r=e(this).parent().position();t={x:o.changedTouches[0].pageX-r.left,y:o.changedTouches[0].pageY-r.top}},o=function(i){i.preventDefault();var o=i.originalEvent;e(this).parent().css({top:o.changedTouches[0].pageY-t.y,left:o.changedTouches[0].pageX-t.x})};this.bind("touchstart",i).bind("touchmove",o)},k.touchDraggable()}return t.dialogZindex+=2,d},t.mouseOrTouch=function(e,t){e=e||"click",t=t||"touchend";var i=e;try{document.createEvent("TouchEvent"),i=t}catch(o){}return i},t.dateFormat=function(e){e=e||"";var t=function(e){return 10>e?"0"+e:e},i=new Date,o=i.getFullYear(),r=o.toString().slice(2,4),n=t(i.getMonth()+1),a=t(i.getDate()),s=i.getDay(),l=t(i.getHours()),c=t(i.getMinutes()),h=t(i.getSeconds()),d=t(i.getMilliseconds()),u="",f=r+"-"+n+"-"+a,g=o+"-"+n+"-"+a,p=l+":"+c+":"+h;switch(e){case"UNIX Time":u=i.getTime();break;case"UTC":u=i.toUTCString();break;case"yy":u=r;break;case"year":case"yyyy":u=o;break;case"month":case"mm":u=n;break;case"cn-week-day":case"cn-wd":var m=["日","一","二","三","四","五","六"];u="星期"+m[s];break;case"week-day":case"wd":var w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];u=w[s];break;case"day":case"dd":u=a;break;case"hour":case"hh":u=l;break;case"min":case"ii":u=c;break;case"second":case"ss":u=h;break;case"ms":u=d;break;case"yy-mm-dd":u=f;break;case"yyyy-mm-dd":u=g;break;case"yyyy-mm-dd h:i:s ms":case"full + ms":u=g+" "+p+" "+d;break;case"full":case"yyyy-mm-dd h:i:s":default:u=g+" "+p}return u},t}});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked v0.3.3 - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else{if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else{if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose){loose=next}}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);
	this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if((!bq&&top)&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else{if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else{if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else{if(this.options.pedantic){this.rules=inline.pedantic}}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else{if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue
	}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants){return text}return text.replace(/--/g,"\u2014").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201c").replace(/"/g,"\u201d").replace(/\.{3}/g,"\u2026")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>0.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})
	}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body);case"blockquote_start":var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body);case"list_start":var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered);case"list_item_start":var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body);case"loose_item_start":var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body);case"html":var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon"){return":"}if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name){return new RegExp(regex,opt)}val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending){return done()}for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return --pending||done()}return highlight(token.text,token.lang,function(err,code){if(err){return done(err)}if(code==null||code===token.text){return --pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt){opt=merge({},marked.defaults,opt)}return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(true){module.exports=marked}else{if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (C) 2006 Google Inc.
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//      http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	
	var IN_GLOBAL_SCOPE=true;window["PR_SHOULD_USE_CONTINUATION"]=true;var prettyPrintOne;var prettyPrint;(function(){var P=window;var i=["break,continue,do,else,for,if,return,while"];var u=[i,"auto,case,char,const,default,"+"double,enum,extern,float,goto,inline,int,long,register,short,signed,"+"sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];var p=[u,"catch,class,delete,false,import,"+"new,operator,private,protected,public,this,throw,true,try,typeof"];var l=[p,"alignof,align_union,asm,axiom,bool,"+"concept,concept_map,const_cast,constexpr,decltype,delegate,"+"dynamic_cast,explicit,export,friend,generic,late_check,"+"mutable,namespace,nullptr,property,reinterpret_cast,static_assert,"+"static_cast,template,typeid,typename,using,virtual,where"];var y=[p,"abstract,assert,boolean,byte,extends,final,finally,implements,import,"+"instanceof,interface,null,native,package,strictfp,super,synchronized,"+"throws,transient"];var U=[y,"as,base,by,checked,decimal,delegate,descending,dynamic,event,"+"fixed,foreach,from,group,implicit,in,internal,into,is,let,"+"lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,"+"sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,"+"var,virtual,where"];var r="all,and,by,catch,class,else,extends,false,finally,"+"for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,"+"throw,true,try,unless,until,when,while,yes";var x=[p,"debugger,eval,export,function,get,null,set,undefined,var,with,"+"Infinity,NaN"];var s="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,"+"goto,if,import,last,local,my,next,no,our,print,package,redo,require,"+"sub,undef,unless,until,use,wantarray,while,BEGIN,END";var K=[i,"and,as,assert,class,def,del,"+"elif,except,exec,finally,from,global,import,in,is,lambda,"+"nonlocal,not,or,pass,print,raise,try,with,yield,"+"False,True,None"];var g=[i,"alias,and,begin,case,class,"+"def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,"+"rescue,retry,self,super,then,true,undef,unless,until,when,yield,"+"BEGIN,END"];var z=[i,"as,assert,const,copy,drop,"+"enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,"+"pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"];var J=[i,"case,done,elif,esac,eval,fi,"+"function,in,local,set,then,until"];var C=[l,U,x,s,K,g,J];var e=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;var E="str";var B="kwd";var j="com";var R="typ";var I="lit";var N="pun";var H="pln";var m="tag";var G="dec";var L="src";var S="atn";var n="atv";var Q="nocode";var O="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*";function k(ac){var ag=0;var V=false;var af=false;for(var Y=0,X=ac.length;Y<X;++Y){var ah=ac[Y];if(ah.ignoreCase){af=true}else{if(/[a-z]/i.test(ah.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){V=true;af=false;break}}}var ab={"b":8,"t":9,"n":10,"v":11,"f":12,"r":13};function ae(ak){var aj=ak.charCodeAt(0);if(aj!==92){return aj}var ai=ak.charAt(1);aj=ab[ai];if(aj){return aj}else{if("0"<=ai&&ai<="7"){return parseInt(ak.substring(1),8)}else{if(ai==="u"||ai==="x"){return parseInt(ak.substring(2),16)}else{return ak.charCodeAt(1)}}}}function W(ai){if(ai<32){return(ai<16?"\\x0":"\\x")+ai.toString(16)}var aj=String.fromCharCode(ai);return(aj==="\\"||aj==="-"||aj==="]"||aj==="^")?"\\"+aj:aj}function aa(ao){var at=ao.substring(1,ao.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}"+"|\\\\x[0-9A-Fa-f]{2}"+"|\\\\[0-3][0-7]{0,2}"+"|\\\\[0-7]{1,2}"+"|\\\\[\\s\\S]"+"|-"+"|[^-\\\\]","g"));var ai=[];var aq=at[0]==="^";var ap=["["];if(aq){ap.push("^")}for(var au=aq?1:0,am=at.length;au<am;++au){var ak=at[au];if(/\\[bdsw]/i.test(ak)){ap.push(ak)}else{var aj=ae(ak);var an;if(au+2<am&&"-"===at[au+1]){an=ae(at[au+2]);au+=2}else{an=aj}ai.push([aj,an]);if(!(an<65||aj>122)){if(!(an<65||aj>90)){ai.push([Math.max(65,aj)|32,Math.min(an,90)|32])}if(!(an<97||aj>122)){ai.push([Math.max(97,aj)&~32,Math.min(an,122)&~32])}}}}ai.sort(function(ax,aw){return(ax[0]-aw[0])||(aw[1]-ax[1])});var al=[];var ar=[];for(var au=0;au<ai.length;++au){var av=ai[au];if(av[0]<=ar[1]+1){ar[1]=Math.max(ar[1],av[1])}else{al.push(ar=av)}}for(var au=0;au<al.length;++au){var av=al[au];ap.push(W(av[0]));if(av[1]>av[0]){if(av[1]+1>av[0]){ap.push("-")}ap.push(W(av[1]))}}ap.push("]");return ap.join("")}function Z(ao){var am=ao.source.match(new RegExp("(?:"+"\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]"+"|\\\\u[A-Fa-f0-9]{4}"+"|\\\\x[A-Fa-f0-9]{2}"+"|\\\\[0-9]+"+"|\\\\[^ux0-9]"+"|\\(\\?[:!=]"+"|[\\(\\)\\^]"+"|[^\\x5B\\x5C\\(\\)\\^]+"+")","g"));var ak=am.length;var aq=[];for(var an=0,ap=0;an<ak;++an){var aj=am[an];if(aj==="("){++ap}else{if("\\"===aj.charAt(0)){var ai=+aj.substring(1);if(ai){if(ai<=ap){aq[ai]=-1}else{am[an]=W(ai)}}}}}for(var an=1;an<aq.length;++an){if(-1===aq[an]){aq[an]=++ag}}for(var an=0,ap=0;an<ak;++an){var aj=am[an];if(aj==="("){++ap;if(!aq[ap]){am[an]="(?:"}}else{if("\\"===aj.charAt(0)){var ai=+aj.substring(1);if(ai&&ai<=ap){am[an]="\\"+aq[ai]}}}}for(var an=0;an<ak;++an){if("^"===am[an]&&"^"!==am[an+1]){am[an]=""}}if(ao.ignoreCase&&V){for(var an=0;an<ak;++an){var aj=am[an];var al=aj.charAt(0);if(aj.length>=2&&al==="["){am[an]=aa(aj)}else{if(al!=="\\"){am[an]=aj.replace(/[a-zA-Z]/g,function(ar){var at=ar.charCodeAt(0);return"["+String.fromCharCode(at&~32,at|32)+"]"})}}}}return am.join("")}var ad=[];for(var Y=0,X=ac.length;Y<X;++Y){var ah=ac[Y];if(ah.global||ah.multiline){throw new Error(""+ah)}ad.push("(?:"+Z(ah)+")")}return new RegExp(ad.join("|"),af?"gi":"g")}function b(ab,Z){var X=/(?:^|\s)nocode(?:\s|$)/;var ac=[];var aa=0;var Y=[];var W=0;function V(ae){var ad=ae.nodeType;if(ad==1){if(X.test(ae.className)){return}for(var ah=ae.firstChild;ah;ah=ah.nextSibling){V(ah)}var ag=ae.nodeName.toLowerCase();if("br"===ag||"li"===ag){ac[W]="\n";Y[W<<1]=aa++;Y[(W++<<1)|1]=ae}}else{if(ad==3||ad==4){var af=ae.nodeValue;if(af.length){if(!Z){af=af.replace(/[ \t\r\n]+/g," ")}else{af=af.replace(/\r\n?/g,"\n")}ac[W]=af;Y[W<<1]=aa;aa+=af.length;Y[(W++<<1)|1]=ae}}}}V(ab);return{sourceCode:ac.join("").replace(/\n$/,""),spans:Y}}function D(V,X,Z,W){if(!X){return}var Y={sourceCode:X,basePos:V};Z(Y);W.push.apply(W,Y.decorations)}var v=/\S/;function o(V){var Y=undefined;for(var X=V.firstChild;X;X=X.nextSibling){var W=X.nodeType;Y=(W===1)?(Y?V:X):(W===3)?(v.test(X.nodeValue)?V:Y):Y}return Y===V?undefined:Y}function f(X,W){var V={};var Y;(function(){var ag=X.concat(W);var ak=[];var aj={};for(var ae=0,ac=ag.length;ae<ac;++ae){var ab=ag[ae];var af=ab[3];if(af){for(var ah=af.length;--ah>=0;){V[af.charAt(ah)]=ab}}var ai=ab[1];var ad=""+ai;if(!aj.hasOwnProperty(ad)){ak.push(ai);aj[ad]=null}}ak.push(/[\0-\uffff]/);Y=k(ak)})();var aa=W.length;var Z=function(ak){var ac=ak.sourceCode,ab=ak.basePos;var ag=[ab,H];var ai=0;var aq=ac.match(Y)||[];var am={};for(var ah=0,au=aq.length;ah<au;++ah){var aj=aq[ah];var at=am[aj];var al=void 0;var ap;if(typeof at==="string"){ap=false}else{var ad=V[aj.charAt(0)];if(ad){al=aj.match(ad[1]);at=ad[0]}else{for(var ar=0;ar<aa;++ar){ad=W[ar];al=aj.match(ad[1]);if(al){at=ad[0];break}}if(!al){at=H}}ap=at.length>=5&&"lang-"===at.substring(0,5);if(ap&&!(al&&typeof al[1]==="string")){ap=false;at=L}if(!ap){am[aj]=at}}var ae=ai;ai+=aj.length;if(!ap){ag.push(ab+ae,at)}else{var ao=al[1];var an=aj.indexOf(ao);var af=an+ao.length;if(al[2]){af=aj.length-al[2].length;an=af-ao.length}var av=at.substring(5);D(ab+ae,aj.substring(0,an),Z,ag);D(ab+ae+an,ao,q(av,ao),ag);D(ab+ae+af,aj.substring(af),Z,ag)}}ak.decorations=ag};return Z}function h(af){var X=[],ab=[];if(af["tripleQuotedStrings"]){X.push([E,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""])}else{if(af["multiLineStrings"]){X.push([E,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"])}else{X.push([E,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"])}}if(af["verbatimStrings"]){ab.push([E,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null])}var ad=af["hashComments"];if(ad){if(af["cStyleComments"]){if(ad>1){X.push([j,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"])}else{X.push([j,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"])}ab.push([E,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])}else{X.push([j,/^#[^\r\n]*/,null,"#"])}}if(af["cStyleComments"]){ab.push([j,/^\/\/[^\r\n]*/,null]);ab.push([j,/^\/\*[\s\S]*?(?:\*\/|$)/,null])}var W=af["regexLiterals"];if(W){var Y=W>1?"":"\n\r";var aa=Y?".":"[\\S\\s]";var Z=("/(?=[^/*"+Y+"])"+"(?:[^/\\x5B\\x5C"+Y+"]"+"|\\x5C"+aa+"|\\x5B(?:[^\\x5C\\x5D"+Y+"]"+"|\\x5C"+aa+")*(?:\\x5D|$))+"+"/");ab.push(["lang-regex",RegExp("^"+O+"("+Z+")")])}var ae=af["types"];if(ae){ab.push([R,ae])}var ac=(""+af["keywords"]).replace(/^ | $/g,"");if(ac.length){ab.push([B,new RegExp("^(?:"+ac.replace(/[\s,]+/g,"|")+")\\b"),null])}X.push([H,/^\s+/,null," \r\n\t\xA0"]);var V="^.[^\\s\\w.$@'\"`/\\\\]*";if(af["regexLiterals"]){V+="(?!s*/)"}ab.push([I,/^@[a-z_$][a-z_$@0-9]*/i,null],[R,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[H,/^[a-z_$][a-z_$@0-9]*/i,null],[I,new RegExp("^(?:"+"0x[a-f0-9]+"+"|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)"+"(?:e[+\\-]?\\d+)?"+")"+"[a-z]*","i"),null,"0123456789"],[H,/^\\[\s\S]?/,null],[N,new RegExp(V),null]);return f(X,ab)}var M=h({"keywords":C,"hashComments":true,"cStyleComments":true,"multiLineStrings":true,"regexLiterals":true});function T(X,ai,ab){var W=/(?:^|\s)nocode(?:\s|$)/;var ad=/\r\n?|\n/;var ae=X.ownerDocument;var ah=ae.createElement("li");while(X.firstChild){ah.appendChild(X.firstChild)}var Y=[ah];function ag(ao){var an=ao.nodeType;if(an==1&&!W.test(ao.className)){if("br"===ao.nodeName){af(ao);if(ao.parentNode){ao.parentNode.removeChild(ao)}}else{for(var aq=ao.firstChild;aq;aq=aq.nextSibling){ag(aq)}}}else{if((an==3||an==4)&&ab){var ap=ao.nodeValue;var al=ap.match(ad);if(al){var ak=ap.substring(0,al.index);ao.nodeValue=ak;var aj=ap.substring(al.index+al[0].length);if(aj){var am=ao.parentNode;am.insertBefore(ae.createTextNode(aj),ao.nextSibling)}af(ao);if(!ak){ao.parentNode.removeChild(ao)}}}}}function af(am){while(!am.nextSibling){am=am.parentNode;if(!am){return}}function ak(an,au){var at=au?an.cloneNode(false):an;var aq=an.parentNode;if(aq){var ar=ak(aq,1);var ap=an.nextSibling;ar.appendChild(at);for(var ao=ap;ao;ao=ap){ap=ao.nextSibling;ar.appendChild(ao)}}return at}var aj=ak(am.nextSibling,0);for(var al;(al=aj.parentNode)&&al.nodeType===1;){aj=al}Y.push(aj)}for(var aa=0;aa<Y.length;++aa){ag(Y[aa])}if(ai===(ai|0)){Y[0].setAttribute("value",ai)}var ac=ae.createElement("ol");ac.className="linenums";var Z=Math.max(0,((ai-1))|0)||0;for(var aa=0,V=Y.length;aa<V;++aa){ah=Y[aa];ah.className="L"+((aa+Z)%10);if(!ah.firstChild){ah.appendChild(ae.createTextNode("\xA0"))}ac.appendChild(ah)}X.appendChild(ac)}function F(ag){var Y=/\bMSIE\s(\d+)/.exec(navigator.userAgent);Y=Y&&+Y[1]<=8;var ap=/\n/g;var ao=ag.sourceCode;var aq=ao.length;var Z=0;var ae=ag.spans;var W=ae.length;var ak=0;var ab=ag.decorations;var ac=ab.length;var ad=0;ab[ac]=aq;var aw,au;for(au=aw=0;au<ac;){if(ab[au]!==ab[au+2]){ab[aw++]=ab[au++];ab[aw++]=ab[au++]}else{au+=2}}ac=aw;for(au=aw=0;au<ac;){var ax=ab[au];var af=ab[au+1];var aa=au+2;while(aa+2<=ac&&ab[aa+1]===af){aa+=2}ab[aw++]=ax;ab[aw++]=af;au=aa}ac=ab.length=aw;var av=ag.sourceNode;var al;if(av){al=av.style.display;av.style.display="none"}try{var ai=null;while(ak<W){var aj=ae[ak];var V=ae[ak+2]||aq;var at=ab[ad+2]||aq;var aa=Math.min(V,at);var an=ae[ak+1];var X;if(an.nodeType!==1&&(X=ao.substring(Z,aa))){if(Y){X=X.replace(ap,"\r")}an.nodeValue=X;var am=an.ownerDocument;var ar=am.createElement("span");ar.className=ab[ad+1];var ah=an.parentNode;ah.replaceChild(ar,an);ar.appendChild(an);if(Z<V){ae[ak+1]=an=am.createTextNode(ao.substring(aa,V));ah.insertBefore(an,ar.nextSibling)}}Z=aa;if(Z>=V){ak+=2}if(Z>=at){ad+=2}}}finally{if(av){av.style.display=al}}}var t={};function c(X,Y){for(var V=Y.length;--V>=0;){var W=Y[V];if(!t.hasOwnProperty(W)){t[W]=X}else{if(P["console"]){console["warn"]("cannot override language handler %s",W)}}}}function q(W,V){if(!(W&&t.hasOwnProperty(W))){W=/^\s*</.test(V)?"default-markup":"default-code"}return t[W]}c(M,["default-code"]);c(f([],[[H,/^[^<?]+/],[G,/^<!\w[^>]*(?:>|$)/],[j,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[N,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);c(f([[H,/^[\s]+/,null," \t\r\n"],[n,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[m,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[S,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[N,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);c(f([],[[n,/^[\s\S]+/]]),["uq.val"]);c(h({"keywords":l,"hashComments":true,"cStyleComments":true,"types":e}),["c","cc","cpp","cxx","cyc","m"]);c(h({"keywords":"null,true,false"}),["json"]);c(h({"keywords":U,"hashComments":true,"cStyleComments":true,"verbatimStrings":true,"types":e}),["cs"]);c(h({"keywords":y,"cStyleComments":true}),["java"]);c(h({"keywords":J,"hashComments":true,"multiLineStrings":true}),["bash","bsh","csh","sh"]);c(h({"keywords":K,"hashComments":true,"multiLineStrings":true,"tripleQuotedStrings":true}),["cv","py","python"]);c(h({"keywords":s,"hashComments":true,"multiLineStrings":true,"regexLiterals":2}),["perl","pl","pm"]);c(h({"keywords":g,"hashComments":true,"multiLineStrings":true,"regexLiterals":true}),["rb","ruby"]);c(h({"keywords":x,"cStyleComments":true,"regexLiterals":true}),["javascript","js"]);c(h({"keywords":r,"hashComments":3,"cStyleComments":true,"multilineStrings":true,"tripleQuotedStrings":true,"regexLiterals":true}),["coffee"]);c(h({"keywords":z,"cStyleComments":true,"multilineStrings":true}),["rc","rs","rust"]);c(f([],[[E,/^[\s\S]+/]]),["regex"]);function d(Y){var X=Y.langExtension;try{var V=b(Y.sourceNode,Y.pre);var W=V.sourceCode;Y.sourceCode=W;Y.spans=V.spans;Y.basePos=0;q(X,W)(Y);F(Y)}catch(Z){if(P["console"]){console["log"](Z&&Z["stack"]||Z)}}}function A(Z,Y,X){var V=document.createElement("div");V.innerHTML="<pre>"+Z+"</pre>";V=V.firstChild;if(X){T(V,X,true)}var W={langExtension:Y,numberLines:X,sourceNode:V,pre:1};d(W);return V.innerHTML}function w(al,ab){var ah=ab||document.body;var ao=ah.ownerDocument||document;function aa(aq){return ah.getElementsByTagName(aq)}var ad=[aa("pre"),aa("code"),aa("xmp")];var ae=[];for(var ak=0;ak<ad.length;++ak){for(var aj=0,ag=ad[ak].length;aj<ag;++aj){ae.push(ad[ak][aj])}}ad=null;var ap=Date;if(!ap["now"]){ap={"now":function(){return +(new Date)}}}var ai=0;var ac;var X=/\blang(?:uage)?-([\w.]+)(?!\S)/;var an=/\bprettyprint\b/;var W=/\bprettyprinted\b/;var Z=/pre|xmp/i;var V=/^code$/i;var Y=/^(?:pre|code|xmp)$/i;var am={};function af(){var ay=(P["PR_SHOULD_USE_CONTINUATION"]?ap["now"]()+250:Infinity);for(;ai<ae.length&&ap["now"]()<ay;ai++){var aA=ae[ai];var aH=am;for(var ax=aA;(ax=ax.previousSibling);){var aE=ax.nodeType;var aF=(aE===7||aE===8)&&ax.nodeValue;if(aF?!/^\??prettify\b/.test(aF):(aE!==3||/\S/.test(ax.nodeValue))){break}if(aF){aH={};aF.replace(/\b(\w+)=([\w:.%+-]+)/g,function(aJ,aI,aK){aH[aI]=aK});break}}var aB=aA.className;if((aH!==am||an.test(aB))&&!W.test(aB)){var aD=false;for(var au=aA.parentNode;au;au=au.parentNode){var aG=au.tagName;if(Y.test(aG)&&au.className&&an.test(au.className)){aD=true;break}}if(!aD){aA.className+=" prettyprinted";var aw=aH["lang"];if(!aw){aw=aB.match(X);var ar;if(!aw&&(ar=o(aA))&&V.test(ar.tagName)){aw=ar.className.match(X)}if(aw){aw=aw[1]}}var av;if(Z.test(aA.tagName)){av=1}else{var at=aA["currentStyle"];var az=ao.defaultView;var aq=(at?at["whiteSpace"]:(az&&az.getComputedStyle)?az.getComputedStyle(aA,null).getPropertyValue("white-space"):0);av=aq&&"pre"===aq.substring(0,3)}var aC=aH["linenums"];if(!(aC=aC==="true"||+aC)){aC=aB.match(/\blinenums\b(?::(\d+))?/);aC=aC?aC[1]&&aC[1].length?+aC[1]:true:false}if(aC){T(aA,aC,av)}ac={langExtension:aw,sourceNode:aA,numberLines:aC,pre:av};d(ac)}}}if(ai<ae.length){setTimeout(af,250)}else{if("function"===typeof al){al()}}}af()}var a=P["PR"]={"createSimpleLexer":f,"registerLangHandler":c,"sourceDecorator":h,"PR_ATTRIB_NAME":S,"PR_ATTRIB_VALUE":n,"PR_COMMENT":j,"PR_DECLARATION":G,"PR_KEYWORD":B,"PR_LITERAL":I,"PR_NOCODE":Q,"PR_PLAIN":H,"PR_PUNCTUATION":N,"PR_SOURCE":L,"PR_STRING":E,"PR_TAG":m,"PR_TYPE":R,"prettyPrintOne":IN_GLOBAL_SCOPE?(P["prettyPrintOne"]=A):(prettyPrintOne=A),"prettyPrint":prettyPrint=IN_GLOBAL_SCOPE?(P["prettyPrint"]=w):(prettyPrint=w)};if("function"==="function"&&__webpack_require__(14)["amd"]){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return a}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}})();

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./article.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./article.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "body{\r\n\tbackground:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVFREE2QTFENjc3MTFFMDg0RDg4QURBN0E4NTA4NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVFREE2QTJENjc3MTFFMDg0RDg4QURBN0E4NTA4NTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNTQwMEVFNkQ1OTUxMUUwODREODhBREE3QTg1MDg1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUVEQTZBMEQ2NzcxMUUwODREODhBREE3QTg1MDg1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu1CJBoAAAVwSURBVHja7FwNb9s2FLRlO4kbtFuwrViHYgP2/3/TsHVtsqUfadOlTuKv+bQ878rqUSfJdj76CASiTN6JIXgUec90/+TP309/fP7LtLdKxy9+2/vp51+vkX998nJ09P3T2XC0t/z44WyAzx5/czSfTa/7Z29Ohz88e15i/nr5x6gOb/ffPX02KwaDpcqd8tXhcf3w7s1g72C8HD86XDThNj4Vj9RfLpevepFapSK6oEPnYcjaDeffvf57iKGK/MU/5wX+kL+6nPQxtKswHh7p7enJcDGf901a4Em5UR+4Kj4FjwSpTT5dlPe4mvRUbhVfynY+mx1jHsENCCyPyjZfGXFVPS/P+DoMc6fPVZ7ptS3XJuU5df9TzHldZMtDkfMYrixbkwk+s6GcYjy8SY2lYWXgZdl63Ao+bSuXAcvTjcet4pGGh4+fzO2G83hVF8V/dff3D5aWxxVlVRgPj3SA+5vhz2Wj0V5vcPN5jlvBp239jHt1PRC4VXzItqts7c1ibxce/jaUMXxtKOMzy6cYD5+WAe9xswQ9bg+flnFbU26eHjzuHL7svGt6MOe9tFjMe7PZtBKTw2OOskYBD566xHwqfrFY9KfTcuPQwxX3dc9h7ib4kG0X2bK0+O3IedTx6in4XL0ct/KcFJ/mFW7vOTl82Xlnb0/X2sfG1/Ln7/9fDkwmF338GQHKeHVeh0d6T8sBlZv50M46/PredggiN/NhXlPwIdswBm6x8+DHeZt8G8p4rfMGmesxHh5ZFd7uTXZsGuS4Uz7De22z3YK3sc9xGx/jc20L2YZs76Cfh+G7Cz8PEtmFnwfszvw81TPr6ufV+Yib9POaPif8vPDz7rGfNx4frofqNv08SGL8qLcTP+/Jt0fh58VS5aEtVbzQY245oS5V2nAr+HSpoXKnOx4F/8VSJRea4+WA95r38HXLBI9beU7dMkrhzi1bPHzMeV1ly69fznsxDPQ+y0TBmxx4OcBLDS9OwHwK3nYFvNQwCeZiGMyt4svOwzeC7Ibzbm+vXuPD4agSk8NjuNvwB56XMV5iPhVfFMUSSwxbauC+7jnM3QQfsu0iWzW8VxWOSzEePleWhveacqeYNm1Vuble2Xle6JDDexyOU0OPaXjQCx1yeC/HreDTtn7GvcLy0snjVvEh266y9cJ2TcJ7dfg6jBLWVPGcz7VJeU7d/1Rw6JDzXngPc8Dq1V5UYTw8EocOgV+boWpYU8DbMobNTN4hKGFNFR+yDWPgjhgDXjhuE6FH3tir3G1Cj7yxb8IdoceQ7T2VLb/dtunneWHNTft5alhzI35eG8+tjZ/XxnNr4+ep7Qs/L/y8B+LnsWe3TT/PvLNt+3nAepjw88LPe4B+nnlb2/bzrGwXfl6aDz8vdhj3qPOuEmkoZiiXKfhcPfWsRBM8z1lNz2Go+LLzLj6edzqHoeCRLleTbZdzGAq+7OSry/Wc1eYchoqPOS/mvFvsPDYz0zMZVYYj5h52FxR8amYCb3OYarQq+NTMxNW2eKrRquJDtiHbOyhblgYPZVW2jM/JjqWR41bwOdkBq0wJKj5kG7K9xc7zzlHkYhjKOYw0huGdo8jFCZRzGGkMwztHkYthKOcwKmMYl5NPx/s3piMqW96LE5RblsW8Z2WM8fBVZTAmjc+4U1yOO4fnMm6rF7fIcXv4mPM2aYayHHO/q+L99omHT+up3N5vn3j4KhNX4U75FHzZealT0DQpv8ViJmr69a0mid2OumQb+zaJzdC6FLINP+8O+HnsV23Tz8P8tQs/D9fw82KH8ZUZA7vw83K/fbJJPw9Y/hZY+Hkh2wfu5/EX/rbp56Wb7236eWk+/LyQbXTeV5H+FWAA7eqC0D2aO2cAAAAASUVORK5CYII=);\r\n\tfont-family: \"Helvetica Neue\", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif ;\r\n\tfont-size:16px;\r\n}\r\nheader{\r\tbackground: -webkit-linear-gradient(#2f2f2f, #151515);\n\tbackground: -moz-linear-gradient(#2f2f2f, #151515);\n\tbackground: -o-linear-gradient(#2f2f2f, #151515);\n\tbackground: -webkit-gradient(linear, 0 0, 0 100%, from(#2f2f2f), to(#151515));\n\tbackground: linear-gradient(#2f2f2f, #151515);\r\n}\r\n.h1, .h2, .h3, h1, h2, h3 {\r\n\tfont-weight: 700;\r\n\tborder-bottom: 1px dashed #999;\r\n\tpadding-bottom: 9px;\t\r\n}\r\n.page-header{\r\n\tborder-bottom: 1px dashed #999;\r\n}\r\n.bs-docs-section {\r\n\tmargin-bottom: 60px;\r\n}\r\nh1[id] {\r\n\tpadding-top: 20px;\r\n\tmargin-top: 0;\r\n}\r\nh1 {\r\n\tpadding-top: 20px;\r\n\tmargin-top: 0;\r\n}\r\n.zero-clipboard {\r\n\tposition: relative;\r\n\tdisplay: none;\r\n}\r\n@media screen and (min-width: 768px){\r\n\t.zero-clipboard {\r\n\t\tdisplay: block;\r\n\t}\r\n}\r\n\r\n.btn-clipboard {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tz-index: 10;\r\n\tdisplay: block;\r\n\tpadding: 5px 8px;\r\n\tfont-size: 12px;\r\n\tcolor: #767676;\r\n\tcursor: pointer;\r\n\tbackground-color: #fff;\r\n\tborder: 1px solid #e1e1e8;\r\n\tborder-radius: 0 4px 0 4px;\r\n}\r\n.btn-clipboard-hover{\r\n\tcolor:#fff;\r\n\tbackground-color:#563d7c;\r\n\tborder-color:#563d7c;\r\n}\r\n.bs-docs-section > p, \r\n.bs-docs-section > ul, \r\n.bs-docs-section > ol, \r\n.bs-callout > p, .bs-callout > ol, \r\n.bs-callout > ul {\r\n\tfont-size: 16px;\r\n\tline-height: 1.75;\r\n\tmargin-bottom: 1em;\r\n}\r\n\r\ninput[type=range]{\r\n\t-webkit-appearance: none;\r\n\twidth:100%;\r\n\toutline: none;\r\n}\r\ninput[type=range]::-webkit-slider-runnable-track{\r\n\twidth:100%;\r\n\theight: 10px;\r\n\tbackground: #337ab7;\r\n\tborder-radius: 15px;\r\n}\r\ninput[type=range]::-webkit-slider-thumb{\r\n\t-webkit-appearance: none;\r\n\tcursor: pointer;\r\n\twidth:12px;\r\n\theight:25px;\r\n\tborder-radius: 15px;\r\n\tbackground: #ccc;\r\n\tmargin-top:-8px;\r\n}\r\n.w-100{\r\n\twidth:100%;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<section class=\"article\">\r\n        <header class=\"navbar navbar-inverse navbar-fixed-top\">\r\n            <section class=\"container\">\r\n        \t\t<div class=\"navbar-header\">\r\n        \t\t\t<a href=\"javascript:window.history.go(-1);\" class=\"navbar-brand\">Michael Gong's Blog</a>\r\n        \t\t</div>\r\n        \t</section>\r\n        </header>\r\n        <section id=\"content\" class=\"content\">\r\n\t\t\t<section class=\"container\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<section class=\"col-md-9\" rol=\"main\">\r\n                        <div id=\"md\" class=\"bs-docs-section\">\r\n                            {{str}}\r\n                        </div>\r\n                    </section>\r\n                </div>\r\n            </section>\r\n        </section>\r\n\r\n    </section>";

/***/ }
]);
//# sourceMappingURL=Article.build.js.map