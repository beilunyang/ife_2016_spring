var divList = document.querySelectorAll('.t div');
var root = document.getElementsByClassName('t')[0];
var bftIndex = 1;
var beSearched = false; //是否搜索到结果
var timer;

var changeColor = function(arr, isSearch) {
    var _is = isSearch || false;
	var i = 0;
	var len = arr.length;
	var _t = document.getElementsByTagName('input')[0].value;
	arr[i++].style.backgroundColor = 'blue';
	timer = setInterval(function(){
		if (i < len) {
			arr[i-1].style.backgroundColor = '#FFF';
			arr[i++].style.backgroundColor = 'blue';
		}else {
			arr[i-1].style.backgroundColor = '#FFF';
			clearInterval(timer);
			if (_is) {
			    if (beSearched) {
			        arr[i-1].style.backgroundColor = 'red';
			    }else{
			        alert('搜索结束,没有搜索到你想要的结果');
			    }
			}
		}

	},_t);
	
};

var reset = function() {
	clearInterval(timer);
	bftIndex = 1;
	beSearched = false;
	root.style.backgroundColor = '#FFF';
	for (var i = 0,len = divList.length; i<len; i++) {
		divList[i].style.backgroundColor = '#FFF';
	}

};

//深度优先遍历，类先序遍历
var dft = function(node, arr) {
    if (node) {
        arr.push(node);
        var _c = node.children;
        for (var i = 0, len = _c.length; i < len; i++){
            dft(_c[i], arr);
        }
    }
};

//广度优先遍历
var bft = function(node, arr) {
   if (node) {
       arr.push(node);
       bft(node.nextElementSibling, arr);
       node = arr[bftIndex++];
       bft(node.firstElementChild, arr);
   }
    
};


/**
 * 遍历功能
 * @param {String} type     bf或df
 * @return {Array}
 */
var traverse = function(type) {
	var arr = [];
	switch (type) {
		case 'df': 
			dft(root, arr);
			break;
		case 'bf':
		    arr.push(root);
			bft(root.firstElementChild, arr);
			break;
	}
	return arr;

};

//从遍历后的数组中搜索
var searchArray = function(arr, sValue){
    console.log(arr);
    for (var i = 0, len = arr.length; i < len; i++){
        if (arr[i].firstChild.nodeValue.trim() === sValue.trim()){
            var newArr = arr.slice(0, i+1);
            beSearched = true;
            return newArr;
        }
    }
    return arr;
}

/**
 * 搜索功能
 * @param {String} type         bf或df
 * @return {Array} 
 */
var search = function(type) {
    var arr = traverse(type);
    var sValue = document.getElementById('s').value;
    if (!sValue) {
        alert('请输入想要搜索的内容');
        return ;
    }
    return searchArray(arr, sValue);
}

/**
 * 入口函数
 * @param {String} type             bf或df
 * @param {Boolean} isSearch        是否启用搜索，默认不启用，直接遍历
 */
var init = function(type, isSearch) {
	reset();
	var arr;
	var _is = isSearch || false;
	if (_is) {
	    arr = search(type);
	    changeColor(arr, _is);
	}else{
	    arr = traverse(type); 
	    changeColor(arr);
	}
};


