var optionsCache = { };

function createOptions(option) {
	var object = optionsCache[option] = {};
	
	option.match(/\S+/g).forEach( _ => {
	
		object[ _ ] = true;
	});

	return object;
}

function Callbacks( options ) {
	
	var options = typeof options === 'string'
			? ( optionsCache[ options ] || createOptions( options ) )
			: Object.assign( {}, options ),
		firing,
		
		// 标记fire是否已经执行过了
		fired,
		list = [],
		firingStart,
		firingIndex,
		firingLength,
		queue = !options.once && [],
		repeat,
		memory,
		now,
		
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;	
			firing = true;
			firingIndex = firingStart || -1;
			
			// memory 执行add时防止发射不完整
			firingStart = -1;

			while( list && ++firingIndex < list.length ) {
				now = list[ firingIndex ];

				if ( list[ firingIndex ].apply(data[0], data[1] ) === false && options.stopOnFalse ) {
				
					memory = false; // 防止使用add进一步调用fire
					break;
				}

			}
				
			firing = false;
			repeat = true;
			
			// 除once外的情况
			if ( queue ) {
			
				if ( queue.length ) {
					fire( queue.shift() );
				}
			}
			
			// 有'memory once'同在的情况走这里,可以清空list, 保存memory功能
			else if ( memory ) {
			
				  list = [];
			} 
			
			// once
			else {
			
				self.disable();
			}
			return this;
		},
	
		self = {
			add: function ( ) {
				if ( list ) {
					var args = Array.from( arguments );
				
					var start = list.length - 1;

					(function add(args){
					
						args.forEach( arg => {
					
							if ( typeof arg === 'function' ) {
								
								// 不能循环的引用添加
								if ( !options.unique || !self.has( arg ) ) {

									// 正在发射中阻止循环的添加
									if ( !(firing && now === arg) ) {
									
										list.push( arg );
									}
								}
							} else if ( Array.isArray(arg) ) {
							
								add(arg);
							}
						} )
					}(args));

					if ( !firing && memory ) {
					
						firingStart = start;
						fire( memory );
					}
					
					console.log(list.toString());
				}
				return this;
			},
			
			remove: function () {
				if ( list ) {
					var args = Array.from( arguments );
					args.forEach( arg => {
						var position;
						
						while ( (position = list.indexOf(arg, position)) > -1 ) {
						

							list.splice( position, 1 );
							if ( position <= firingIndex ) {
								
								firingIndex--;
							}
							
						}
						
						
						
					} );
				}
				
				return this;
			},
			
			fireWith: function( context, args ) {
				
				args = Array.from(arguments).slice(1),
				args = [context, args];
			
				
				// 在发射中, 回调中有fire就推入队列中

				if ( list && (!fired || queue) ){
				
					if ( firing ) {
					
						if ( !repeat ) {
						
							queue.push( args );
						}

					} else {
					
						fire( args );
					}
				}

			},
			
			// 查找fn是否在回调列表中, 没传fn就返回回调列表中是否有回调
			has: function( fn ) {
			
				return fn ? list.indexOf(fn) > -1 : !!( list && list.length );
			},
			
			disable: function () {

				list = memory = queue = undefined;
				return this;
			},
			
			disabled: function () {
			
				return !list;
			},
			lock: function () {
			
				queue = undefined;
				// 留下memory add可以发射
				if ( !memory ) {
					
					self.disable();
				}
				
				return this;
			},
			locked: function() {
				return !queue;
			},
			
			empty: function() {
			
				list = [];
				
				return this;
			},
			
			fired: function () {
			
				return !!fired;
			}
		};
		
	return self;
};
