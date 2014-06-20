var frame = {
	__search:"search",
	__MenuItem:["help", "person", "home", "article"],

   setSearch: function() {
		var target = get('id', 'searchButton');
		target.value = frame.__search;
	},

	setMenu: function() {
		var root = get('id', 'hright');
		var target = get('tagName', 'a', root);
		return set(target, frame.__MenuItem);
	},
};

function get(type, target, root = document) {
	if(type === 'id') {
		return root.getElementById(target);
	} else if(type === 'tagName') {
		return root.getElementsByTagName(target);
	} else
		return null;
}

function set(target, data) {
	if(typeof target === 'object') {
		for(var i = 0; i < target.length; ++i)
			target[i].innerHTML = data[i];
	} else {
		target.innerHTML = data;
	}
}

function setChild(target, data) {

	var temp = target.firstChild;
	var i = 0;
	while(temp !== null && i++ < data.length) {
		temp.innerHTML = data[i];
		temp = temp.nextSibling;
	}
}
