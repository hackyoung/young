/*
 * new a interface
 * sample: 
 * var sampleInterface = new Interface({
 * 		'getName':null,
 * 		'sample' : 'string',
 *		'sample2' : ['string', 'array']
 * });
 */

function Interface(it) {
	if(typeof it === 'undefined') {
		throw 'no interface asignment!';
	}
	return it;
}

/*
 * a function to create class
 * sample:
 * var SampleClass = new Class(function SampleClass() {
 * 		alert('hello world');
 * });
 *
 * 	var concrete = new SampleClass(); //nothing happened here!
 * 	concrete.init(); //alert('hello world');
 */

var Class = function(name, cl) {
	return Class.create(name, cl);
}

/*
 * record all the name of the class create by Class
 */
Class.classes = [];

/*
 * equal new Class(constructor)
 */
Class.create = function(className, func) {

	if(arguments.length < 2) {
		throw 'you need asign a class name and a constructor!'
	}
	if(typeof func !== 'function')
		throw className + ' need a constructor!';
	
	if(func.name !== '')
		throw 'constructor must a anonymous function!'
	/*
	 * t is a temp class object
	 */
	function t() {
		return t.parents[0];
	}

	t._name = className;

	Class.classes.push(t._name);

	/*
	 * record all the parents class include itself
	 */
	t.parents = [];

	t.parents[t.parents.length] = new t;

	/*
	 * bind the constructor to class t, it's conversion for
	 * child class to call the parents's constructor
	 */
	t.init = func;

	/*
	 * bind the constructor to the object of the class t
	 */
	t.prototype.init = func;

	t._this = t.parents[0];
	/*
	 * seter
	 * */

	t.prototype.set = function(name, value) {
		this[name] = value;
		return this[name];
	}

	/*
	 * geter
	 * */

	t.prototype.get = function(name) {
		var temp = this;
		for(key in this)
			if(name === key)
				return temp[name];
		if(temp = temp.getClass().getParent())
			return temp.get(temp);
		
		return false;
	}

	/*
	 * to get the constructor name
	 * so the constructor need a name same with the class var
	 */
	t.__getName = function () {
		return t._name;
	}

	/*
	 * t is a class object, the method method
	 * add method to the object
	 * sample:
	 * var SampleClass = new Class(function SampleClass () {} );
	 * SampleClass.method('setName' function(name) {
	 * 		this.name = name;
	 *		return this;
	 * });
	 */
	t.method = function (name, func) {
		t.prototype[name] = func;
		return this;
	}

	/*
	 * the function to find the right prototype method for use
	 */
	t.prototype.run = function (name) {
		for(var i = 0; i < t.parents.length; ++i) {
			if(typeof t.parents[i][name] !== 'undefined')
				return t.parents[i][name];
		}
		if(typeof t.parents[1] !== 'undefined' && t.parents[1].getClass().parents[1] !== 'undefined')
			return t.parents[1].run(name);
		throw 'no ' + name + ' exist in ' + t._name;
	}

	/*
	 * extend prototype method from parent
	 * sample:
	 * var Parent = new Class(function Parent() {});
	 * Parent.method('setName', function(name) {
	 * 		this.name = name;
	 * 		return this;
	 * });
	 * var Child = new Class(function Child() {
	 *		Parent.init();		//every Child need do this to construct Parent in Child
	 *		...
	 *	});
	 * Child.extend(Parent);
	 * var child = new Child();
	 * child.setName('hello');
	 * 
	 */
	t.extend = function (parent) {
		t.parents[t.parents.length] = new parent;
	}

	/*
	 * implement a Interface
	 * sample:
	 * 	var SampleInterface = new Interface({
	 *		'setName' : 'string',
	 *		'getName' : null,
	 *		'sayHello' : null
	 *	});
	 *	var SampleClass = new Class(function SampleClass() {});
	 * 	SampleClass.method('setName' function(name) {
	 *		this.name = name;
	 *	});
	 *	
	 *	SampleClass.implement(SampleInterface); > will throw a uncapture exception because getName, sayHello not exist in SampleClass
	 */

	t.hasParents = function() {
		return t.parents.length == 1 ? false : true;
	}

	t.getParent = function() {
		return t.hasParents() ? t.parents[1] : false;
	}

	t.implement = function(interf) {
	
		if(typeof interf != 'object') {
			throw 'interface type error';
		}

		var cs = [];

		var temp = t;

		do {
			for(key in temp.prototype)
				cs.push(key);
			temp = temp.getParent();
			if(temp != false) {
				temp = temp.getClass();
			}
		} while(temp);

		var it = [];

		for(key in interf)
			it.push(key);

		var al = '';
		for(var i = 0; i < it.length; ++i) {
			for(var j = 0; j < cs.length; ++j)
				if(it[i]===cs[j])
					break;
			if(j === cs.length)
				al += it[i] + ',';
		}	
		if(al !== '') {
			al += ' need implement in ' + t._name;
			throw al;
		}
	}
	
	t.prototype.getClass = function() {
		return t;
	}

	return t;
}

/*
 * return how many class ready to use
 */
Class.number = function() {
	return Class.classes.length;
};

/*
 * get all the class name
 */
Class.getAll = function() {
	return Class.classes;
}

/*
 * check if the class created by Class
 */
Class.exist = function(name) {
	if(name === null)
		return false;
	if(typeof name === 'function')
		name = name.__getName();
	for(var i = 0; i < Class.number(); ++i) {
		if(Class.getAll()[i] == name)
			return true;
	}
	return false;
}

Array.prototype.search = function(value) {
	for(var i = 0; i < this.length; ++i)
		if(this[i] === value)
			return i;
	return false;
}

Array.prototype.del = function(value) {
	var pos = this.search(value);
	for(var i = pos; i < this.length - 1; ++i)
		this[i] = this[i + 1];
	this.length -= 1;
}

var T = new Class('T', function() {});
T.method('hello', function() {
	alert('hello');
});
