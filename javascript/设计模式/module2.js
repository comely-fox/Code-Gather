// 松扩展
var MODULE = (function (my) {
	
	my.anotherMethod = function () {
			
		// added method...
	};
	
	return my;
}(MODULE || {}));

// 紧扩展
var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;
	
	// method override
	my.moduleMethod  = function () {
			
		// method override, has access to old through old_moduleMethod...
	};
	
	return my;
}(MODULE));