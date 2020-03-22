var S = {
	
	// 清除空格
	trim: function( string, direction ) {	
		var r_blank = '[\\s\\xA0\\uFEFF]+';
			
		switch ( direction ) {
			case 'l':
				
				r_blank = '^' + r_blank;
				break;	
			case 'r':
				
				r_blank = r_blank + '$';
				break;
			case true:
				break;
			default:
			
				r_blank = '^' + r_blank + '|' + r_blank + '$';
		}
		
		return typeof string === 'string' ? 
			string.replace( new RegExp( r_blank, 'g' ), '' ) : 
			'';
	},
	
	// 清除所有空格
	trimAll: function( string ) {
		return this.trim( string, true );
	},
	
	// 清除左空格
	trimLeft: function( string ) {	
		return this.trim( string, 'l' );
	},
	
	// 清空右空格
	trimRight: function( string ) {		
		return this.trim( string, 'r' );
	},
	
	// 遍历字符串
	each: function ( string, callback, start, end ) {

		var i = oi = -1,
		
			length = typeof string === 'string' ? string.length : 0,
		
			// 当前的字符
			char,
			
			// 当前的unicode代码点
			codePoint,
			
			// 辅助平面字符的另一个代理位unicode代码点
			anotherProxyCode,
			
			// 辅助平面字符的另一个代理位的索引
			anotherProxyIndex,
			
			// 回调函数的字符在整个字符串中的索引
			k = 0,
			
			// 回调函数的当前字符是否是辅助平面字符
			beyond = false, 
			
			// 回调函数的返回值
			callbackReturn,
			
			// 辅助平面字符错误提示
			error = {
				
				prop: '',
				hint: {

					high: '高代理项后面没有紧跟着低代理项',
					low: '低代理项没有紧跟在高代理项后面'
				}
			};

		if ( typeof start === 'number' && start > i ) {
			
			i = start - 1;
		}
		
		if ( typeof end === 'number' && end < length ) {
			
			length = end;
		}

		while ( ++i < length ) {

			codePoint = string.charCodeAt( i );
			char = string.charAt( i );
			beyond = false;
			oi = i;

			// 辅助平面
			if ( 0xD800 <= codePoint && codePoint <= 0xDFFF ) {

				// 现在在高代理位
				if ( codePoint <= 0xDB00 ) {
					
					// 低代理索引
					anotherProxyIndex = i + 1;
					error.prop = 'high';
				}
				
				// 现在在低代理位
				else {
					
					// 高代理索引
					anotherProxyIndex = i - 1;
					error.prop = 'low';
				}
				
				anotherProxyCode = string.charCodeAt( anotherProxyIndex );

				// 在平面
				if ( isNaN( anotherProxyCode) ||
					anotherProxyCode < 0xDC00 ||
					anotherProxyCode > 0xDFFF ) {
					
					// 不符合规则
					throw error.hint[ error.prop ];
				}

				// 拼接成辅助位的字符
				char += string.charAt( ++i );
				
				// 计算出的unicode代码值
				codePoint = ( ( codePoint - 0xD800 + 64 ) << 10 ) + ( anotherProxyCode - 0xDC00 );
				beyond = true;
			}
			
			// ( 字符, 字符, 索引, 代码点, 是否是0xFFFF之上的字符, 原始的索引 )
			callbackReturn = callback.call( char, char, k++, codePoint, beyond, oi );

			if ( callbackReturn === 'continue' ) {
				continue;
			}
			else if ( callbackReturn === false ) {
				break;
			}
			
		}
		
		return string;
	},
	
	// 求字符串的字符个数
	size: function ( string ) {

		return typeof string !== 'string' ?
			undefined :
			(function ( s, self ) {
				var count;
				
				self.each( s, function ( _, i ) {
					
					count = i;
				});
				
				return count === undefined ? 0 : count + 1;
			})( string, this );
	},
	
	// 从字符串指定索引处截取指定数目的子字符
	substr: function ( string, index, cutLength ) {
		var string = String( string ),
			stringLength = string.length;
			
		index = ( isNaN( index ) ?
			0 :
			( index < 0 ?
				index + string.length:
				index ) ) | 0;
				
		cutLength = cutLength === undefined ?
			stringLength :
			cutLength | 0;
		
		// 截取的索引超出, 截取的长度<=0
		if ( index >= stringLength || 0 >= cutLength ) {
	
			return '';
		}
		
		return string.substring( index, index + cutLength );
	},

	// 字符串替换
	replace: function ( string, substr, replacement ) {
		var // 当前需要被替换的位置
			index = -1,
			
			// 被替换的子字符串长度
			howmany,
			
			// 新的子字符串
			newString,
			
			// 是否贪婪
			r_global,
			
			// 匹配结果
			r_res,

			// 处理替换后的字符串合并
			_fnReplace = ( function ( self ) {
				return function ( args ) {
					// args = [...] replacement回调的参数
					try {
						// is "function".
						newString = replacement.apply( string, args );
					}
					catch( e ) {
						// is not "function".
						newString = replacement;
					}
					
					// 替换后的新字符串
					return self.splice( string, index, howmany, '' + newString );
				}
			}( this ));
			
		string = String( string );
			
		// 正则匹配
		if ( substr && typeof substr.exec === 'function' ) {
				
			r_global = substr.global;
				
			while ( ( r_res = substr.exec( string ) ) !== null ) {	
				index = r_res.index;
				howmany = r_res[ 0 ].length;
				string = _fnReplace( r_res.concat( index, string, howmany ) );	
				substr.lastIndex += newString.length - 1;
				
				// 非贪婪模式 not g修饰符
				if ( !r_global ) {
						
					break;
				}
			}
		}
		
		// 普通匹配
		else {	
			substr = String( substr );
			howmany = substr.length;
			
			if ( ( index = string.indexOf( substr ) ) !== -1 ) {

				string = _fnReplace( [ substr, index, string, howmany ] );
			}
		}
		
		// 返回替换后的字符串, 
		// 如没有匹配成功, 则返回的是原始字符串
		return string;
	},
	
	// 取字符在字符串中首次出现的位置
	indexOf: function ( string, search, fromIndex ) {
		var index = -1,
			size = this.size( string ),
			searchLength,
			self = this;
		
		search = String( search );
		fromIndex = ( isNaN( fromIndex ) || fromIndex < 0 ? 
			0 :
			( fromIndex >= size ? 
				size : 
				fromIndex ) ) | 0;
		
		// 被查找的字符串是一个空字符串
		if ( search === '' ) {
				
			return fromIndex;	
		}
		
		// 被查找的位置小于字符串长度
		if ( fromIndex < size ){
			searchLength = search.length;
				
			this.each( string, function ( char, i, _, _, oi ) {
				if ( fromIndex <= i && self.at( search, 0 ) === char ) {
		
					var c = self.substr( string, oi, searchLength );
					if ( c === search ) {
								
						index = i;
						return false;
					}
				}	
			});
		}
		
		return index;
	},
	
	// 根据索引取出对应的字符
	at: function ( string /*, indexes... */ ) {
		var chars = [],
			i = 0,
			index,
			length = arguments.length;
		
		
		if ( 0 > index || index >= this.size( string ) ) {
			return '';
		}
		
		while ( ++i < length ) {
			
			index = +arguments[ i ] || 0;
			this.each( string, function ( c, i ) {
				if ( index === i ) {
				
					chars.push( c )
					return false;
				}
			});
		}
	
		return chars.join('');
	},
	
	// 根据索引取出对应字符的代码点
	codePointAt: function ( string, index ) {
		var codePoint;
		index = ( isNaN( index ) ? 0 : index ) | 0;
		
		// 索引不在范围内
		if ( 0 > index || index >= this.size( string ) ) {
			return undefined;
		}
		
		this.each( string, function ( _, i, code ) {
			if ( i === index ) {
				
				codePoint = code;
				return false;
			}
		});
		
		return codePoint;
	},
	
	// 根据给定的代码点取出unicode对应的字符
	fromCodePoint: function ( /* codePoint... */ ) {
		
		var length = arguments.length,
			MAX_SIZE = 0x4000,
			k = i = 0,
			h,
			l,
			codePoint,
			codeUnits = [],
			chars = '';
		
		while ( i < length ) {
			
			codePoint = +arguments[ i++ ];

			// 不是一个有效的整数
			if ( !isFinite( codePoint ) ||
				0 > codePoint ||
				codePoint > 0x10FFFF ||
				( codePoint | 0 ) !== codePoint ) {
					
				throw new RangeError( codePoint + ' is not a valid code point' )
			}
			
			// 基本平面字符
			if ( 0xFFFF >= codePoint ) {
				
				codeUnits.push( codePoint );
				k += 1;
			}
			
			// 辅助平面字符
			else {
				
				codePoint -= 0x10000;
				
				h = ( codePoint >> 10 ) + 0xD800;
				l = codePoint % 0x400 + 0xDC00;
				
				codeUnits.push( h, l );
				k += 2;
			}
			
			if ( i === length || k > MAX_SIZE ) {
				
				chars += String.fromCharCode.apply( null, codeUnits );
				codeUnits.length = 0;
				k = 0;
			}
		}
		
		return chars;
	},
	
	// 把字符串转换为utf-8编码 ( 要转换的字符串, 索引, 是否返回数组形式的utf-8编码 )
	toUtf8: function ( string, at, returnCode ) {
		
		var result = {},
		
			// 字节数
			byteSize = 0,
			
			// 只返回某个字符的utf-8编码
			only = false;
		
		
		if ( typeof string !== 'string' ) {
			
			return null;
		}
	
		// 调换位置
		if ( typeof at === 'boolean' ) {
			
			returnCode = at;
		}

		else {
			
			returnCode = !!returnCode;
			
			// 取某一个字符的utf-8编码
			if ( at != null ) {
				
				at = isNaN( at ) ? 
					0 : 
					( at < 0 ? 
						at + this.size( string ) : 
						+at );
				
				only = true;
			}
		}

		this.each( string, function ( char, index, codePoint ) {

			if ( only && at !== index ) {
				
				return 'continue';
			}

			// 1 byte
			if ( 0x00 <= codePoint && codePoint <= 0x7F ) {
				
				result[ index ] = {
					
					'char': char,
					'utf-8': [ codePoint.toString( 16 ) ],
					'byteSize': 1
				}
				
				byteSize += 1;
			}
			
			// 2 byte
			else if ( 0x80 <= codePoint && codePoint <= 0xfFF ) {
				
				result[ index ] = {
					
					'char': char,
					'utf-8': [
						( 0xc0 | ( 0x1f & ( codePoint >> 6 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & codePoint ) ).toString( 16 ) ],
					'byteSize': 2
				}
				
				byteSize += 2;
			}
			
			// 3 byte
			else if ( ( 0x800 <= codePoint && codePoint <= 0xD7FF ) ||
				0xE000 <= codePoint && codePoint <= 0xFFFF ) {
				result[ index ] = {
					
					'char': char,
					'utf-8': [
						( 0xe0 | ( 0xf & ( codePoint >> 12 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & ( codePoint >> 6 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & codePoint ) ).toString( 16 ) ],
					'byteSize': 3
				}
				
				byteSize += 3;
			}
			
			// 4 byte
			else if ( 0x10000 <= codePoint && codePoint <= 0x10FFFF ) {
				
				result[ index ] = {
					
					'char': char,
					'utf-8': [
						( 0xf0 | ( 7 & ( codePoint >> 18 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & ( codePoint >> 12 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & ( codePoint >> 6 ) ) ).toString( 16 ),
						( 0x80 | ( 0x3f & codePoint ) ).toString( 16 ) ],
					'byteSize': 4
				};
				
				byteSize += 4;
			}
			
			if ( only ) {
				
				return false;
			}
		});

		// 只需要编码
		if ( returnCode ) {
			
			var arr = [];
			
			for ( var k in result ) {

				[].push.apply( arr, result[ k ][ 'utf-8' ] );
			}
			
			return arr;
		}
		
		// 详细
		else {	
			
			if ( !only ) {
			
				result.byteSize = byteSize;	
			}

			return only ? result[ at ] : result;
		}
	},
	
	// 解析utf-8编码
	parseUtf8: function ( arr ) {

		var length = arr && arr.length,
			i = -1,
			
			// unicode代码点
			codePoint,
			
			// utf8编码二进制
			binary,
			
			// 多字节的数组
			bytes,
			
			// 遍历多字节时的索引
			k,
			
			// 多字节的长度
			size,
			
			// 提取多字节的位置
			start,
			
			// 多字节的原始unicode代码点二进制
			originBinary,
			
			// 最后需要的代码点集合
			codes = [];

		// 排除非数组或空数组
		if ( typeof arr !== 'object' ||
			typeof length !== 'number' ||
			!( length - 1 in arr ) ||
			length === 0 ) {
			
			return '';
		}
	
		while ( ++i < length ) {
			
			codePoint = +( '0x' + arr[ i ] );
			binary = codePoint.toString( 2 );
			bytes = /^1+?(?=0)/.exec( binary );
			
			// 多字节
			if ( bytes && binary.length === 8 ) {
				size = start = bytes[ 0 ].length;
				originBinary = '';
				
				// 拼合二进制
				for ( k = 0; k < size; k++ ) {
					
					originBinary += Number( '0x' + arr[ i + k ] ).toString( 2 ).slice( start );
					start = 2;
				}
				
				codePoint = parseInt( originBinary, 2 );
				i += size - 1;
			}

			codes.push( codePoint );
		}
		
		// 返回utf-8编码对应的字符串
		return this.fromCodePoint.apply( null, codes );
	},
	
	// 向字符串中添加/删除字符，然后返回被添加/删除后的新字符串
	splice: function ( string, index, howmany, item ) {
		var // string删除和追加后的新字符串
			newString = '',
			i = 2,
			length = item !== undefined ?
				arguments.length : 
				3;
		// string.split('').splice	
		string = String( string );
		index = index | 0;
		
		// 负数从后往前取
		if ( index < 0 ) {
			
			index = string.length + index;
		}
		
		// 最小是0
		howmany = ( isNaN( howmany ) || 0 >= howmany ?
			0 :
			howmany ) | 0;
		
		// 左边的字符串
		if ( index > 0 ) {	
			newString += string.substring( 0, index );
		}
		
		// 要追加的字符串
		while ( ++i < length ) {
			
			newString += arguments[ i ];
		}
	
		// 右边的字符串
		if ( howmany < string.length - index ) {
			newString += string.substring( index + howmany );
		}
		
		return  newString;
	},
	
	// 多功能整合字符串
	concat: function () {
		var target = arguments[ 0 ],
			i = 0,
			origin,
			type,
			length = arguments.length;
		
		if ( typeof this === 'string' ) {
			
			target = this;
			i = -1;
		}
		
		else if ( target && typeof target !== 'string' ) {
			
			return '';
		}

		while ( ++i < length ) {
			
			origin = arguments[ i ];
			type = typeof origin;
			
			if ( type === 'object' ){
				
				if ( {}.toString.call( origin ) === '[object Object]' ) {
					
					origin = {}._toArray.call( origin, origin );
				}

				target += this.concat.apply( this, origin );
			}
			
			else {

				target += origin;
			}
			
		}	
		
		return target;
	},
	
	// 检测当前字符串是否是以给定的字符串search开始
	startsWith: function ( string, search, begin ) {
		var stringLength,
			
			// 匹配的结束位置
			end;
		
		// 没传参
		if ( string == null ) {
			
			throw TypeError();
		}
		
		if ( search === '' ) {
			
			return true;
		}
		
		string = String( string );
		search = String( search );
		stringLength = string.length;
		
		// 开始位置最小不能小于0
		begin = isNaN( begin ) || begin <= 0 ? 
			0 : 
			begin | 0;

		end = begin + search.length;
		
		// 匹配长度超出
		if ( stringLength < end ) {
			
			return false;
		}
		
		return string.substring( begin, end ) === search;
	},
	
	// 检测当前字符串是否是以给定的字符串search结尾
	endsWith: function ( string, search, stringLength ) {
		var searchLength, 
			
			// 匹配的开始位置
			begin;
		
		// 没传参
		if ( string == null ) {
			
			throw TypeError();
		}
		
		if ( search === '' ) {
			
			return true;
		}
		
		string = String( string );
		search = String( search );
		searchLength = search.length;
		
		// 字符串最长不超过原始长度
		stringLength = isNaN( stringLength ) || stringLength >= string.length ? 
			string.length : 
			stringLength | 0;
			
		begin = stringLength - searchLength;

		// 匹配长度超出
		if ( begin < searchLength ) {
			
			return false;
		}
	
		return string.substring( begin, stringLength ) === search;
	},
	
	// 检测当前字符串是否包含给定的字符串search
	includes: function ( string, search, start ) {
		var include = false;
		
		search = String( search );
		start = isNaN( start ) ? 0 : +start;
		
		// 长度不超过当前字符串
		if ( start + search.length <= string.length ) {
			
			include = this.indexOf( string, search, start ) !== -1;
		}
		
		return include;
	},
	
	// 检测给定的字符串search在当前字符串出现了多少次
	count: function ( string, search ) {
		var pos = -1, count = 0;
		search = String( search );
		
		if ( search === '' ) {
			
			return this.size( string );
		}
		
		else {
	
			while ( ( pos = this.indexOf( string, search, pos + 1 ) ) !== -1 ) {
				
				++count;
			}
		}
		
		return count;
	},
	
	// 填补成指定长度的字符串, 默认填充右边
	pad: function ( string, expectLength, padString, direction ) {
		var length = String( string ).length,
		
			pads = padString,
			
			// 需要增加的长度
			lengthen = ( expectLength | 0 ) - length,
			
			// 填补字符串的长度
			padLength,
			
			// 长度不够, 重复次数
			count = 0;
		
	
		if ( lengthen <= 0 ) {
			
			return string;
		}
			
		padString = padString === undefined ? 
				'\x20' : 
				String( padString );
				
		padLength = padString.length;
		count = ( lengthen / padLength ) | 0;
			
		// 填补的字符串本身长度不够, 需要填补
		while ( lengthen >  padLength ) {
	
			if ( !!count ) {
				
				padString = this.repeat( padString, count );
				padLength = padString.length;
				count = false;
			}
			
			// 补尾差, count是小数时
			else {
				
				padString += pads.substring( 0, lengthen - padLength );
				break;
			}
			
		}
		
		// 返回目标长度的字符串
		return direction ?
			// left side
			padString + string:
			// right side
			string + padString;
	},
	
	// 填补成指定长度的字符串,在原始字符串右边填充
	padEnd: function ( string, expectLength, padString ) {
		return this.pad( string, expectLength, padString, false );
	},
	
	// 填补成指定长度的字符串,在原始字符串左边填充
	padStart: function ( string, expectLength, padString ) {
		return this.pad( string, expectLength, padString, true );
	},
	
	// 重复字符串为指定次数
	repeat: function ( string, count ) {
		var repeat = '';
		count = count | 0;
		
		// 确保 count 是一个 31 位的整数
		// 绝大多数浏览器都不能支持 1 << 28 长的字符串
		if ( string.length * count >= 1 << 28 ) {
			throw new RangeError( 'repeat count must not overflow maximum string size' );
		}
		
		// 优化算法
		while ( true ) {
			
			if ( ( count & 1  ) === 1 ) {

				repeat += string;
			}
			
			count >>>= 1;
			
			if ( count === 0 ) {
				
				break;
			}
			string += string;
		}
		
		return repeat;
	},

	
};

// extend String/String.prototype
// fromCodePoint parseUtf8 排除
const exclude = 'fromCodePoint parseUtf8'.split( ' ' );
mixin( String.prototype, S, function ( name, fn, ...args ) {
	args = [ this.toString(), ...args ];
	if ( exclude.indexOf( name ) !== -1 ) {
		args.shift( 0 );
	}
	return fn( ...args );
});

/*
( function () {
	'use strict';
	
	// fromCodePoint parseUtf8 排除
	const exclude = 'fromCodePoint parseUtf8'.split( ' ' );

	for ( let k in S ) {
	
		if ( {}.hasOwnProperty.call( S, k ) ) {
		
			var descriptor = Object.getOwnPropertyDescriptor( S, k );
			descriptor.value = function () {
				const args = [ this.toString(), ...arguments ];
				
				if ( exclude.indexOf( k ) !== -1 ) {
					
					args.shift( this.toString() );
				}

				return S[ k ]( ...args );
			};
			
			//if ( String.prototype.hasOwnProperty( k ) ) {
				
			//	k = "_" + k;
			//}
			
			Object.defineProperty( String.prototype, '_' + k, descriptor );
			
			if ( exclude.indexOf( k ) !== -1 ) {
						
				Object.defineProperty( String, k, descriptor );
			}
		}
		
	}
	
}());
*/

var O = {
	
	// 把对象转换为数组
	toArray: function ( ) {
		
		var i = 0, object, k, v, arr = [],
			base = arguments[ 0 ];
		
		// 默认多维数组
		if ( typeof base !== 'boolean' ) {

			base = false;
			i = -1;
		}
		
		while ( i++ < arguments.length ) {
			object = arguments[ i ];
			
			for ( k in  object ) {
				v = object[ k ];
				
				if ( {}.hasOwnProperty.call( object, k ) ) {
					
					if ( typeof v === 'object' ) {
						
						// 多维
						if ( !base ) {
							arr.push( this.toArray( v ) );
						}
						
						// 一维
						else {
							
							arr = arr.concat( this.toArray( base, v ) );
						}
					}
					
					else {
						
						arr.push( v );
					}
				}
			}
		}
	
		return arr;
	}
};

mixin( Object.prototype, O, function ( name, fn, ...args ) {

	return fn( ...args );
});

// 混合
function mixin( ) {
	var target = arguments[ 0 ],
		i = 0,
		object,
		value,
		length = arguments.length,
		callback = arguments[ length - 1 ],
		useCallback = false;
	
	if ( typeof callback === 'function' ) {
		
		length -= 1;
		useCallback = true;
	}
	
	while ( ++i < length ) {
		object = arguments[ i ];
		for ( let k in object ) {
			
			if ( {}.hasOwnProperty.call( object, k ) ) {
				value = object[ k ];
	
				if ( useCallback ) {
					
					value = function ( ) {
						
						return callback.call( this, k, object[ k ].bind( object ), ...arguments );
					}
				}
		
				Object.defineProperty( target, '_' + k, {
					value,
					writable: false,
					enumerable: false,
					configurable: false
				});
			}
		
		}
	}
	
}


function slice() {
	
	return Function.prototype.call.apply( [].slice, arguments );
}








var M = {
	
	sqt: function ( number, base ) {
		
		if ( typeof number !== 'number' ) {
			
			return NaN;
		}
		
		else {
			
			base = base && !isFinite( base ) ?
				2 :
				+base;

			if ( base < 2 ) {
				
				return NaN;
			}
					
			return Math.log( number ) / Math.log( base );
		}
	}
	
};

mixin( Math, M );



function unionSet( a, b ) {
	
	a.forEach( v => {
		
		if ( b.indexOf( v ) === -1 ) {
			
			b.push( v )
		}
		
	});
	return b.sort( ( a, b ) => a - b );
}




















