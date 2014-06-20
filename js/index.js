window.onload = function() {
//	addjs('js/language.zn.js');
	frame.setMenu();
	frame.setSearch();
}

function addjs(js) {
	var head = document.getElementsByTagName('head')[0];
	if(typeof js === 'array') {
		for(var i=0; i < js.length; ++i) {
			var language = document.createElement('script');
			language.setAttribute('type', 'javascript');
			language.setAttribute('src', js[i]);
			head.appendChild(language);
		}
		return;
	}

	var language = document.createElement('script');
	language.setAttribute('type', 'javascript');
	language.setAttribute('src', js);
	head.appendChild(language);
}
