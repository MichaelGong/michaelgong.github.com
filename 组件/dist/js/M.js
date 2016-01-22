
(function(window,document,factory){
    if(typeof define === 'function' && define.amd){ //AMD
        define(function(){
            return factory(window,document);
        });
    }else if(typeof module !== 'undefined' && module.exports){ //cmd
        module.exports = factory(window,document);
    }else {
        window.M = factory(window,document);
    }
}(window,document,function(window,document,undefined){

	var w = window,
		doc = document;
		
	var M = function(str){
		this.init(3);
	}
	M.prototype = {
		init:function(str){
			console.log(str);
			return this;
		},
		log:function(str){
			console.log(str);
			return this;
		}
	}

	var _M = function(selector){
		return new _M.prototype.init(selector);
	}

	_M.prototype = {
		constructor : _M,
		length : 0,
		splice: [].splice,
		selector : '',
		/**
		 * 选择器
		 * @param  {[type]} selector [字符串选择器 或者 function]
		 * @return {[type]}          [description]
		 */
		init:function(selector){
			if(!selector) return this;
			if(typeof selector == 'function'){
				_M.ready(selector);
				return;
			}else{
				this.selector = selector;
				if(typeof selector == 'object'){
					if(_M.isArray(selector)){
						for (var i = 0; i < selector.length; i++) {
							this[i] = selector[i];
						}
						this.length = selector.length;
						return this;
					}else{
						this[0] = selector;
						this.length = 1;
						return this;
					}
				}
				var selector = selector.trim();
				//以#开头 && 中间不包含空格 && 不包含多选择符（不包含逗号）
				if(selector.charAt(0)=='#' && !selector.match('\\s') && selector.indexOf(',')<0){
					var selector = selector.substring(1);
					this[0] = doc.getElementById(selector);
					this.length = 1;
					return this;
				}else{
					var elm = doc.querySelectorAll(selector);
					for(var i=0;i<elm.length;i++){
						this[i] = elm[i];
					}
					this.length = elm.length;
					return this;
				}	
			} 	
		},
		hasClass:function(className){
			var className = className.trim(),
				reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			for(var i=0;i<this.length;i++){
				var elm = this[i];
				if(elm.classList){
					if(elm.classList.contains(className)) 
						return true;
				}else{
					if(elm.className.match(reg))
						return true;
				}
			}
			return false;
		},
		addClass:function(className){
			var className = className.trim(),
				reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			for(var i=0;i<this.length;i++){
				var elm = this[i];
				if(elm.classList){
					if(!elm.classList.contains(className))
						elm.classList.add(className);
				}else{
					if(!elm.className.match(reg))
						elm.className += ' '+className;
				}
			}
			return this;
		},
		removeClass:function(className){
			var className = className.trim(),
				reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			for(var i=0;i<this.length;i++){
				var elm = this[i];
				if(elm.classList){
					if(elm.classList.contains(className))
						elm.classList.remove(className);
				}else{
					if(elm.className.match(reg))
						elm.className = elm.className.replace(' '+className,'');
				}
			}
			return this;
		},
		toggleClass:function(className){
			var className = className.trim(),
				reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			for(var i=0;i<this.length;i++){
				var elm = this[i];
				if(elm.classList){
					if(elm.classList.contains(className))
						elm.classList.remove(className);
					else
						elm.classList.add(className);
				}else{
					if(elm.className.match(reg))
						elm.className = elm.className.replace(' '+className,'');
					else
						elm.className += ' '+className;
				}
			}
			return this;
		},
		attr:function(name,val){
			var me = this;
			if(arguments.length==1){ 
				if(typeof name == 'object'){  //设置属性
					for(var i=0;i<this.length;i++){
						(function(i){
							_M.each(name,function(j,elem){
								me[i].setAttribute(j,elem);
							});
						})(i)
					}
				}else
					return this[0].getAttribute(name);//获取属性，只能返回第一个匹配元素的属性值
			}else{
				for(var i=0;i<this.length;i++){
					this[i].setAttribute(name,val);
				}
			}
			return this;
		},
		data:function(name,val){
			if(arguments.length==2){
				this.attr('data-'+name,val);
				return this;
			}else{
				return this.attr('data-'+name);
			}
			
		},
		each:function(cb){
			return _M.each(this.splice(0,this.length),cb);
		},
		sibling:function(dom,type){
			while((dom = dom[type]) && dom.nodeType !== 1){};
			return dom;
		},
		next:function(){
			return this.sibling(this[0],'nextSibling');
		},
		prev:function(){
			return this.sibling(this[0],'previousSibling');
		},
		parent:function(){
			var parent = this[0].parentNode;
			return _M(parent);
		},
		css:function(attr,val){
			if(arguments.length==1){
				if(typeof attr == 'string'){ //获取元素
					return w.getComputedStyle(this[0],null).getPropertyValue(attr);
				}else if(typeof attr == 'object'){ //对象，设置属性
					for(var i=0;i<this.length;i++){
						for(var j in attr){
							this[i].style.cssText += j+':'+attr[j];
						}
					}
				}	
			}else{ //两个参数
				for(var i=0;i<this.length;i++){
					this[i].style[attr] = val;
				}
			}
			return this;
		},
		html:function(str){
			if(str === undefined){
				return this[0].innerHTML;
			}else{
				for(var i=0;i<this.length;i++){
					this[i].innerHTML = str;
				}
			}
			return this;
		},
		prepend:function(str){
			for(var i=0;i<this.length;i++){
				_M.insert(this[i],'afterBegin',str);
			}
			return this;
		},
		append:function(str){
			for(var i=0;i<this.length;i++){
				_M.insert(this[i],'beforeEnd',str);
			}
			return this;
		},
		before:function(str){
			for(var i=0;i<this.length;i++){
				_M.insert(this[i],'beforeBegin',str);
			}
			return this;
		},
		after:function(str){
			for(var i=0;i<this.length;i++){
				_M.insert(this[0],'afterEnd',str);
			}
			return this;
		},
		remove:function(){
			for(var i=0;i<this.length;i++){
				this[i].parentNode.removeChild(this[i]);
			}
			return this;
		},
		eq:function(index){
			var index = index < 0 ? (this.length + index) : index;
			return _M(this[index]);
		},
		get:function(index){
			var index = index < 0 ? (this.length + index) : index;
			return this[index];
		},
		find:function(selector){
			var arr = [],
				i = 0;
			for(;i<this.length;i++){
				var temp = this[i].querySelectorAll(selector)
				for(var j=0;j<temp.length;j++){
					arr.push(temp[j])
				}
			}
			return _M(arr);
		},
		hide:function(){
			for(var i=0;i<this.length;i++){
				var elem = this[i],
					eqelem = this.eq(i),
					olddisplay = eqelem.css('display');
				if(olddisplay !== 'none'){
					eqelem.data(_M.OLDDISPLAY,olddisplay);
					elem.style.display = 'none';
				}
			}
			return this;
		},
		show:function(){
			for(var i=0;i<this.length;i++){
				var elem = this[i],
					eqelem = this.eq(i),
					olddisplay = eqelem.data(_M.OLDDISPLAY),
					nowdisplay = eqelem.css('display');
				if(olddisplay && (olddisplay != nowdisplay))
					elem.style.display = olddisplay;
				else{
					elem.style.display = (nowdisplay==='none')?_M.getDefaultDisplay(elem.nodeName):'';
				}
			}
			return this;
		}


	}
	_M.OLDDISPLAY = 'Molddisplay';
	_M.ready = function(fn){
		function _fn(){
			fn && fn();
			doc.removeEventListener('DOMContentLoaded',_fn,true);
		}
		doc.addEventListener('DOMContentLoaded',_fn,false);
	}
	_M.isArray = function(arr){
		return Object.prototype.toString.call(arr) === '[object Array]';
	}
	_M.each = function(obj,cb){
		var value,i = 0;
		if(this.isArray(obj)){
			for(;i<obj.length;i++){
				value = cb.call(obj[i],i,obj[i]);
				if(value === false){
					break;
				}
			}
		}else{
			for(i in obj){
				value = cb.call(obj[i],i,obj[i]);
				if(value === false){
					break;
				}
			}
		}
		return obj;
	}
	_M.insert = function(elm,type,str){
		elm.insertAdjacentHTML(type,str);
	}
	_M.getDefaultDisplay = function(tagName){
		var elem = doc.createElement(tagName),
			parentElem = doc.createElement('div');
		parentElem.style.display = 'none';
		parentElem.appendChild(elem);
		doc.body.appendChild(parentElem);
		var d = w.getComputedStyle(elem,null).getPropertyValue('display');
		document.body.removeChild(parentElem);
		return d;
	}
	_M.prototype.init.prototype = _M.prototype;
	var $M = typeof Zepto !== 'undefined' ? Zepto : (typeof jQuery!= 'undefined' ? jQuery : _M);
	w.$ = $M;
	return new M();
}));