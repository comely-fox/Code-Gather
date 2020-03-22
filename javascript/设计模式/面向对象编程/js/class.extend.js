(function (){
// 1. 类式继承
// 父类
function SuperBook() {

    // 父类实例对象公有属性
    this.superBook = 'Javascript';
}

// 为父类添加公有方法
SuperBook.prototype.getSuperBook = function () {

    console.log(this.superBook);
};

function SubBook() {
    
    this.subBook = 'Html';
}

// "类式继承", 继承父类, 有问题, 原型上复制了父类构造函数里的属性与方法
//   并不是子类的实例复制了父类构造函数的公共属性与公共方法, 且是引用类型的话子类的实例修改去影响其它子类的实例
// 而且不能像父类传递参数, 无法对父类构造函数内的属性初始化
// , 而且constructor被父类覆盖
// 子类的原型可以访问父类的原型的属性与方法
// 与从父类构造函数中复制出来的属性与方法
SubBook.prototype = new SuperBook();
// 为子类添加公有方法
SubBook.prototype.getSubBook = function () {

    console.log(this.subBook);
}

// 实例化子类
var obj = new SubBook();
obj.getSuperBook();
obj.getSubBook();
// 通过对象的原型链来判断是否继承某个类
console.log(obj instanceof SubBook) // true
console.log(obj instanceof SuperBook) // true
console.log(SubBook instanceof SuperBook) // false, SubBook的原型链委托于Function.prototype
console.log(SubBook.prototype instanceof SuperBook) // true, SubBook.prototype是SuperBook的实例
console.log(SubBook instanceof Object) // true, 所有对象的原型链都是Object的后代

// 2. 构造函数继承, 无法继承父类的原型
// 声明父类
function SuperClass(id) {

    this.books = ['html', 'css', 'javascript'];
    this.id = id;
}
// 为父类的原型添加公共方法
SuperClass.prototype.showBooks = function () {

    console.log(this.books);
};

// 声明子类
function SubClass(id) {

    // 构造函数式继承父类, 改变父类里面的this指向为指向实例对象
    // 向子类的实例对象复制父类的构造函数里面的公共属性与方法
    SuperClass.call(this, id);
}

// 实例化子类
var instanceof1 = new SubClass(1);
var instanceof2 = new SubClass(2);

instanceof1.books.push('node');
console.log(instanceof1.books) // ['html', 'css', 'javascript', 'node']
console.log(instanceof1.id) // 1
console.log(instanceof2.books) // ['html', 'css', 'javascript']
console.log(instanceof2.id) // 2


// 3. 组合式继承
// 声明父类
function Super(name) {

    this.books = ['html', 'css', 'javascript'];
    this.name = name;
}

// 父类原型共有方法
Super.prototype.showBooks = function () {

    console.log(this.books);
};

// 声明子类
function Sub(name, time) {

    Super.call(this, name);

    // 增加子类独有的实例对象的公有属性
    this.time = time;
}

// 子类的原型继承父类, 类式继承
Sub.prototype = new Super();

// 为子类原型添加独有的共有方法
Sub.prototype.getTime = function () {

    console.log(this.time);
}

// 实例化子类
var ins = new Sub('jock', 2018);
ins.books.push('node');
// 调用父类原型对象的方法
ins.showBooks(); // [ "html", "css", "javascript", "node" ]
// 调用子类原型对象的方法
ins.getTime(); // 2018
console.log(ins.name)  // jock


// 实例化子类
var ins = new Sub('lisa', 2019);
// 调用父类原型对象的方法
ins.showBooks(); // [ "html", "css", "javascript" ]
// 调用子类原型对象的方法
ins.getTime(); // 2019
console.log(ins.name)  // lisa


// 4. 洁净的继承者：原型式继承
function inheritObject(o) {

    // 创建一个过渡式的构造函数
    function F(){ }
    // F构造函数的原型指向o对象
    F.prototype = o;
    // 返回F构造函数的实例
    return new F();
}

var Books = {

    books: ['Javascript', 'Css', 'Html'],
    name: 'Jock'
};

// 新对象继承Books
var b1 = inheritObject(Books);
var b2 = inheritObject(Books);
b1.books.push('Node');
b1.name = 'Lisa';  // 向b1对象添加自有属性name与继承的name属性不是同一个
// 因为都是指向同一个对象
console.log(b1.books);   // ['Javascript', 'Css', 'Html', 'Node']
console.log(b1.name); // Lisa, 访问自有的属性
console.log(b2.books);   // ['Javascript', 'Css', 'Html', 'Node']
console.log(b2.name);   // Jock, 访问原型链的name属性

// 5.寄生式继承
// 声明基对象
var book = {

    name: 'js book',
    alikeBook: ['css book', 'html book']
};

function createBook(obj) {

    // 原型式继承, 创建一个新对象
    var o = new inheritObject(obj);
    // 为新对象增添方法
    o.show = function () {

        console.log(this.alikeBook);
    };

    // 返回寄生后的对象
    return o;
}

var parasite = createBook(book);

parasite.show();  // ["css book", "html book"]

// 6.寄生组合式继承
function SuperClass2(name) {

    // 父类公有属性
    this.name = name;
    this.books = ['Javascript', 'Html', 'Css'];
}

SuperClass2.prototype = {

    // 修改指向
    constructor: SuperClass2,
    // 父类原型公共静态方法
    getBooks  () {

        console.log(this.books);
    },

    // 父类原型公共静态属性
    number: [1, 2, 3]
};

// 创建子类
function SubClass2(name, time) {

    // 构造函数式继承
    SuperClass2.call(this, name);

    // 为子类添加自有的公共属性
    this.time = time;
}
function inheritObject(obj) {

    function F() { }
    F.prototype = obj;

    return new F();
}
function inheritPrototype(subClass, superClass) {

    // 原型式继承
    var p = inheritObject(superClass.prototype);
    // 修正子类constructor指向问题
    // 在新对象上添加自定义属性constructor
    p.constructor = subClass;
    subClass.prototype = p;
}

// 子类原型继承父类原型

inheritPrototype(SubClass2, SuperClass2);
// 为子类添加原型公有方法
SubClass2.prototype.getTime = function () {

    console.log(this.time);
};

var instan1 = new SubClass2('js book', 2018);
var instan2 = new SubClass2('js book', 2019);

instan1.books.push('Node');
console.log(instan1.books) // [ "Javascript", "Html", "Css", "Node" ]
console.log(instan1.constructor === SubClass2) // true
console.log(instan2.books) // [ "Javascript", "Html", "Css" ]

console.log(instan1.number)  // [1, 2, 3]
instan1.number.push(4);
console.log(instan2.number) // [1, 2, 3, 4], 因为是原型链上的公共引用类型属性, 不是对象自有属性



// 二、 多继承, 浅复制
// 1. 单继承
function extend(target, source) {

    if (!target) return target;

    for(var property in source) {

        target[property] = source[property];
    }

    return target;
}

var source = {

    id: 1,
    book: 'javascript',
    outher: ['html', 'css']
};

var target = {

    author: 'Bremdan Eich',
    
};

// 复制源对象到目标对象
extend(target, source);

target.outher.push('nodejs');

// 引入类型
console.log(target.outher) // [ "html", "css", "nodejs" ]
console.log(source.outher) // [ "html", "css", "nodejs" ]

// 多继承, 浅复制
function mixnis() {
    var target = arguments[0],
        i = 1,
        source = null,
        property,
        length = arguments.length;

    for(; i < length; i++) {

        source = arguments[i];

        for(property in source) {

            target[property] = source[property];
        }
    }

    return target;
}

var target = {

    '0': 'zero'
};
mixnis(target, {'1': 'one'}, {'2': 'two'});

console.log(JSON.stringify(target)) // {"0":"zero","1":"one","2":"two"}


// 多态

function C() {
    
    this.add = function () {
        var length = arguments.length;
        
        // switch(length) {
        //     // 没有参数
        //     case 0:
        //         return 0;
        //     // 一个参数
        //     case 1:
        //         return arguments[0];
        //     // 二个参数
        //     case 2:
        //         return arguments[0] + [1];
        // }

        var result = 0;

        for(var i = 0; i < length; i++) {

            result += arguments[i];
        }

        return result;
    }
}

var a = new C();

console.log(a.add()); // 0
console.log(a.add(1)); // 1
console.log(a.add(1,2)); // 3
console.log(a.add(1,2,3)); // 6
})();