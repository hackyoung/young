/*
 *  this is the young's base class
 *  the root object of the packege
 *  method:
 *  	getId: get the identify
 *  	setId: set the identify
 *  	empty: check the value if it is null
 *  	generateId: generate id
 */

/*
 * AUTHOR: YOUNG
 * MAIL: hackyoung110@gmail.com
 * GPL PROGRAM
 */

function base()
{
	var _this = this;
	var _id;

	_this.getId = function() {
		return _id;
	}

	_this.empty(target) {
		return (target === null || typeof target === 'undefined' || target === '');
	}

	_this.generateId() {
		return _getRamdomString(32);
	}

	function _getRandomString(len) {
    	len = len || 32;
    	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = chars.length;
		var pwd = '';
    	for (i = 0; i < len; i++) {
        	pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    	}
    	return pwd;
	}

	function init() {

		if(_this.empty(_id)) {
			_id = _this.generateId();
		}
	}

	init(id);
}
