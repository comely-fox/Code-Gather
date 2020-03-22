// 松扩展
var MODULE = (function (my) {
	
	var privateVariable = 1;
		

	function privateMethod() {
		
		// do something...
	}
	
	my.moduleProperty = 1;
	my.moduleMethod = function () {
		
		
		// do something...
	};
	
	return my;
}(MODULE || {}));

// 紧扩展
var MODULE = (function () {
	var my = {},
		privateVariable = 1;
 
	function privateMethod() {
		// ...
	}
 
	my.moduleProperty = 1;
	my.moduleMethod = function () {
		// ...
	};
 
	return my;
}());


// 复制和继承
var MODULE_TWO = (function (old) {
	var my = {},
		key;
	
	// shallow copy
	for (key in old) {
		if (old.hasOwnProperty(key)) {
			my[key] = old[key];
		}
	}
 
	var super_moduleMethod = old.moduleMethod;
	my.moduleMethod = function () {
		// override method on the clone, access to super through super_moduleMethod
	};
 
	return my;
}(MODULE));