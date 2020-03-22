
function abc() {

	// do something...
}
function cc() {

	// do something...
}
cc.fnName = 'cc';
cc.obj = {o:{t:{name:3}}}
abc.fnName = 'abc';
abc.f = 1;
abc.arr = [1, 3, 5, cc, { t: 'tt' } ]

var arr = {

	one: [1, 2, 3, 4],
	two: {
	
		1: 1,
		2: 2,
		3: [
		
			1, 2, abc
		]
	},
	cc
};

function copy(obj, deep, reinforce, _result, _fnIdentify) {
	var k,
		length,
		toString = Object.prototype.toString,
		hasOwnProperty = Object.prototype.hasOwnProperty;
	
	switch(toString.call(obj)) {
		case '[object Array]':
			_result = [];
			k = 0;
			length = obj.length;
			
			while(k < length) {

				_result.push(deep ? copy(obj[k], deep, reinforce) : obj[k]);
				k++;
			}
			
			break;
			
		case '[object Object]':
			obj = _fnIdentify || obj;
			_result = _result || {};
			
			for (k in obj) {
				
				if (hasOwnProperty.call(obj, k)) {
					
					_result[k] = deep ? copy(obj[k], deep, reinforce) : obj[k];
				}	
			}
			
			break;
			
		case '[object Function]':
			if (reinforce) {
			
				_result = eval('('+obj.toString()+')');	
				obj = copy({}, true, true, _result, obj);	
			}
			
		default:
			_result = obj;
	}
	
	return _result;
};


function extend() {
	var options, name, src, clone, copy, copyIsArray,
	
		target = arguments[0] || {},
	
		i = 1,
		length = arguments.length,
		deep = false;

	// 要进度深度拷贝
	if ( typeof target === 'boolean' ) {
	
		// 跳过布尔和目标的值
		i = 2;
		deep = target;
		target = arguments[1] || {};
	}
	
	// 目标是一个基本类型，统一替换为{}在基本类型上设置非原生属性是没有效果的
	if ( typeof target !== 'object' && typeof target !== 'function' ) {
		target = {};
	}

	for ( ; i < length; i++ ) {
		
		// 只处理非空值与非未定义的值
		if ( (options = arguments[i] ) != null ) {
			
			for ( name in options ) {
		
				// 目标对象上有与源对象同样的属性, 合并同属性
				src = target[ name ];
				copy = options[ name ];
			
				// 防止互相引用
				if ( copy === target ){
					continue;
				}
				
				// 深度拷贝
				if ( deep && copy && (Object.prototype.toString.call(copy) === '[object Object]' || 
										(copyIsArray = Object.prototype.toString.call(copy) === '[object Array]') ) ) {
					
					// 源对象是数组
					if ( copyIsArray ) {
					
						copyIsArray = false;
						
						// 检测目标对象是否是数组如果不是设置成空数组, 如果是合并数组
						clone = src && Object.prototype.toString.call(src) === '[object Array]' ? src : [];

					}
					
					// 源对象是对象
					else {
					
						// 检测目标对象是否是平常的对象如果不是设置成空对象, 如果是合并对象
						clone = src && Object.prototype.toString.call(src) === '[object Object]' ? src : {};
					}
					
					target[ name ] = extend( true, clone, copy);
				}
				
				// 忽略未定义的值
				else if ( copy !== undefined ) {
				
					
					if ( Object.prototype.toString.call(target) === '[object Array]' && src !== copy ){
					
						target.push(copy);
					}
					
					else {
					
						target[ name ] = copy;
					}
					
				}
			}
		}
	
	}

	return target;
}


var copyArr = extend(true, {one:[2,2525, 1909, 235, 2552, 252]}, arr, {start: function(){}, end: function(){}});
console.log(copyArr);
var copyArr2 = copy(arr);
console.log(copyArr2);

function access( elems, fn, key, value, chainable, emptyGet, raw ) {
    var i = 0,
      length = elems.length,
      bulk = key == null;


    // Sets many values
    if ( key && typeof key === "object" ) {
      chainable = true;
      for ( i in key ) {
        access( elems, fn, i, key[i], true, emptyGet, raw );
      }

    // Sets one value
    } else if ( value !== undefined ) {

      chainable = true;
      if ( !(typeof ( value ) === 'function') ) {
        raw = true;
      }
	

      if ( bulk ) {
        // Bulk operations run against the entire set
        if ( raw ) {
          fn.call( elems, value );
          fn = null;

        // ...except when executing function values
        } else {
          bulk = fn;
		  
          fn = function( elem, key, value ) {
		
            return bulk.call( elem, value );
          };
        }
      }
	
      if ( fn ) {
        for ( ; i < length; i++ ) {

          fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
        }
      }
    }

    return chainable ?
      elems :

      // Gets
      bulk ?
        fn.call( elems ) :
        length ? fn( elems[0], key ) : emptyGet;
  }

function attr( elem, name, value ){

	return access( elem, function( ele ){
	
		console.log( ele );
	}, name, value, arguments.length > 2 );

}


var res = attr(document.querySelectorAll('span'), null ,{'name': 3, 'id' : 'id'});
console.log( res );


/*
function access2( fn, k, val ) {


	fn( k, val( k, fn( k, undefined, '1' ), '2' ), '3' );
};



access2( function cb( k, v, name ) {

	console.log( k, v, cb.name, name );


}, 'key', function v( k, val, name ) {


	console.log( k, val,  v.name,name );
	
} );


(function ( fn, k, v ){

	var obj = {}
	obj.fn = function ( ) {
			
		fn( k, typeof v !== 'function' ? v : v.call( this, k, fn(k) ) );
	
	}

	return obj

})(function ( k, v ) {
	
	console.log(k, v)

}, 'k', function ( k, v ) {

	console.log(this, k, v)

} )();

*/