var divList = document.querySelectorAll('.t div');
var root = document.getElementsByClassName('t')[0];
var btn = document.querySelectorAll('.btn-group button');
var timer;

var changeColor = function(arr) {
	var i = 0;
	var len = arr.length;
	var t = document.getElementsByTagName('input')[0].value;
	arr[i++].style.backgroundColor = 'blue';
	timer = setInterval(function(){
		if (i < len) {
			arr[i-1].style.backgroundColor = '#FFF';
			arr[i++].style.backgroundColor = 'blue';
		}else {
			arr[i-1].style.backgroundColor = '#FFF';
			clearInterval(timer);
		}

	},t);
};

var reset = function() {
	clearInterval(timer);
	root.style.backgroundColor = '#FFF';
	for (var i = 0,len = divList.length; i<len; i++) {
		divList[i].style.backgroundColor = '#FFF';
	}

};

var preOrder = function(nodeList,arr) {
	for (var i=0,len=nodeList.length;i<len;i++) {
		arr.push(nodeList[i]);
		preOrder(nodeList[i].children,arr);
	}
};

var inOrder = function(node,arr) {
	if (node) {
		inOrder(node.firstElementChild,arr);
		arr.push(node);
		inOrder(node.lastElementChild,arr);
	}
};

var postOrder = function(node,arr) {
	if (node) {
		inOrder(node.firstElementChild,arr);
		inOrder(node.lastElementChild,arr);
		arr.push(node);
	}

};

var traverse = function(type) {
	var arr = [];
	switch (type) {
		case 'pre': 
			arr.push(root);
			preOrder(root.children,arr);
			break;
		case 'in':
			inOrder(root,arr);
			break;
		case 'post':
			postOrder(root,arr);
			break; 
	}
	return arr;

};

var init = function(type) {
	reset();
	var arr = traverse(type);
	changeColor(arr);
}






