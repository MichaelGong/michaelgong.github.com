
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
				var parent = this[i].parentNode;
				if(parent && parent.nodeType !== 11)
					parent.removeChild(this[i]);
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
	_M.ajax = function(url,type,data,success,error,dataType){
		var dataTemp = '',i;
		if(type.toLowerCase() == 'post' && data){
			for(i in data){
				dataTemp += i + '=' + encodeURIComponent(data[i]) + '&';
			}
			dataTemp = dataTemp.substring(0,dataTemp.length-1);
		}
		data = data ? dataTemp : null;
		ajax({
			url:encodeURI(url),
			type:type,
			data:data,
			success:success,
			error:error,
			dataType:dataType || 'default'
		});
	}
	_M.get = function(url,success,error){
		ajax({
			url:encodeURI(url),
			type:'GET',
			success:success,
			error:error,
			dataType:'json'
		});
	}
	_M.post = function(url,data,success,error){
		var dataTemp = '',i;
		for(i in data){
			dataTemp += i + '=' + encodeURIComponent(data[i]) + '&';
		}
		dataTemp = dataTemp.substring(0,dataTemp.length-1);
		ajax({
			url:encodeURI(url),
			type:'POST',
			data:dataTemp,
			success:success,
			error:error,
			dataType:'default'
		});
	}
	function ajax(option){

		var defaultOption = {
			url:'',
			type:'GET',
			data:null,
			async:true,
			success:null,
			complete:null,
			error:null,
			dataType:'application/x-www-form-urlencoded',
			beforeSend:null,
		},
		option = option,
		xhrs = [
			function(){return new XMLHttpRequest();},
			function(){return new ActiveXObject('Microsoft.XMLHTTP');},
			function(){return new ActiveXObject('MSXML2.XMLHTTP');}
		],xhr,contentType;
		for(var i in defaultOption){
			if(!option[i]){
				option[i] = defaultOption[i];
			}
		}
		if(option.url.indexOf(window.location.host)<0){ //跨域
			jsonp(option.url,option.data,option.success);
			return;
		}
		if(xhr) xhr = xhr;
		else{
			for(var i=0;i<xhrs.length;i++){
				try{
					xhr = xhrs[i]();
					break;
				}catch(e){}
			}
		}
		switch(option.dataType){
			case 'text':
				contentType = 'text/plain';
				break;
			case 'json':
				contentType = 'application/json';
				break;
			case 'XML':
				contentType = 'application/xml';
				break;
			default:
				contentType = 'application/x-www-form-urlencoded';
		}

		xhr.open(option.type,option.url,option.async);

		xhr.onreadystatechange = function(){
			/** 
	         * readyState 返回当前请求的状态，只读。定义如下：<br /> 
	         * 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）<br /> 
	         * 1 (初始化) 对象已建立，尚未调用send方法<br /> 
	         * 2 (发送数据) send方法已调用，但是当前的状态及http头未知<br /> 
	         * 3 (数据传送中)已接收部分数据，因为响应及http头不全， 
	         * 这时通过responseBody和responseText获取部分数据会出现错误<br /> 
	         * 4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据<br /> 
	         */  
	        switch(xhr.readyState){
	        	case 1:
	        		option.beforeSend && option.beforeSend();
	        		break;
	        	case 4:
	        		if((xhr.status>=200&&xhr.status<300)|| xhr.status==304){ //成功
	        			option.success && option.success(JSON.parse(xhr.responseText));
	        		}else{ //失败
	        			console.error(xhr.status,xhr.responseText,xhr);
	        			option.error && option.error(xhr,xhr.status,xhr.responseText);
	        		}
	        		break;
	        }
		}
		if(option.type.toLowerCase() == 'post')
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');

		xhr.send(option.data ? option.data:null);
	}
	function jsonp(url,data,func){
		var me = this;
		//时间戳
		this.timestamp = function(){
			return (new Date()).getTime();
		}
		//获取随机长度的由数字构成的随机字符串
		this.randStr = function(){
			return Math.random().toString().substr(2);
		}
		this.removeElem = function(elem) {
	        var parent = elem.parentNode;
	        if(parent && parent.nodeType !== 11) {
	            parent.removeChild(elem);
	        }
	    }
		this.getJSON = function(url,data,func){
			var dataTemp = '',match,id,timestamp,script;
			if(typeof data == 'string'){
				dataTemp = data;
			}else{
				console.log(2);
				for(var i in data){
					dataTemp += i + '=' + encodeURIComponent(data[i]) + '&';
				}
				dataTemp = dataTemp.substring(0,dataTemp.length-1)
			}
			timestamp = me.timestamp();
			url = url + (url.indexOf('?')<0 ?'?':'&') + dataTemp + '&tag_time='+timestamp;
			id = 'jsonp_' + timestamp + '_' + me.randStr();
			url += url + '&callback='+id;

        	script = document.createElement('script');
        	script.type = 'text/javascript';
        	script.src = url;
        	script.id = id;
        	// 在head里面插入script元素
	        var head = document.getElementsByTagName("head");
	        if(head && head[0]) {
	            head[0].appendChild(script);
	        }
        	window[id] = function(data){
				window[id] = undefined;
				func(data);
				// 获取这个script的元素
            	var elem = document.getElementById(id);
            	// 删除head里面插入的script，这三步都是为了不影响污染整个DOM啊
            	me.removeElem(elem);
        	}
		}

		this.getJSON(url,data,func);
	}
	_M.prototype.init.prototype = _M.prototype;
	var $M = typeof Zepto !== 'undefined' ? Zepto : (typeof jQuery!= 'undefined' ? jQuery : _M);
	w.$ = $M;
	return new M();
}));