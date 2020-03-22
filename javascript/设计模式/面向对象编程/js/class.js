(function () {


/**
 * 声明一个Book类, 增加二个公共属性
 * 私有属性, 私有方法, 公有属性, 公有方法, 特权方法, 构造器
 */

Book.effect = '我是类Book的类静态公共属性';
Book.msg = function () {
    console.log('我是类Book的类静态公共方法');
};
function Book (id, name, price) {

    // 私有属性
    var _books = ['Javascript', 'Css', 'Html'];

    // 私有方法
    function getId() {
        
        return id;
    }
    

    // 对象公有属性: 实例对象的属性
    this.about = '我是由Book构造出来的';


    // 对象公有方法
    this.setPrice = function (price) {

        this.price = price;
    }
    this.setName= function (name) {

        this.name = name;
    }
    this.setId = function (id) {

        this.id = id;
    }


    // 特权方法 - 闭包
    // 获取默认书本
    this.books = function () {

        return _books;
    }
    // 添加书本
    this.addBook = function (bookName) {

        _books.push(bookName);
    }


    // 构造器
    // 初始化对象的属性
    if (id) this.setId();
    if (price) this.setPrice();
    if (name) this.setName();
}

// 把对象赋值给原型属性
Book.prototype = {

    // 修正constructor属性指向
    // 公有属性 共有属性
    constructor: Book,
    // 公有方法 共有方法
    show () {
        console.log(this.books())
    }
};


// 实例化类
var book = new Book();
// 调用类的公共方法
book.show();
// 调用对象的方法
book.addBook('设计思想');
// 调用对象的方法
console.log(book.books());
// 调用对象的属性
console.log(book.about);
// 调用类的静态公共属性
console.log(Book.effect);
// 调用类的静态公共方法
Book.msg();




// 利用闭包封闭类的私有属性与方法
var Book2 = (function () {

    // 类的静态私有属性
    var _books = ['Javascript', 'Css', 'Html'];
    
    // 类的静态私有方法
    function _getId() {
        
        return id;
    }

    // 返回构造函数
    function Book2(id, name, price) {
        // 私有属性
        var n, p;

        // 对象公有属性: 实例对象的属性
        this.about = '我是由Book构造出来的';


        // 对象公有方法
        this.setPrice = function (price) {

            this.price = price;
        }
        this.setName= function (name) {

            this.name = name;
        }
        this.setId = function (id) {

            this.id = id;
        }


        // 特权方法 - 闭包
        // 获取默认书本
        this.books = function () {

            return _books;
        }
        // 添加书本
        this.addBook = function (bookName) {

            _books.push(bookName);
        }


        // 构造器
        // 初始化对象的属性
        if (id) this.setId();
        if (price) this.setPrice();
        if (name) this.setName();
    }

    
    // 把对象赋值给原型属性
    Book2.prototype = {

        // 修正constructor属性指向
        // 静态公有属性 共有属性
        constructor: Book2,
        // 静态公有方法 共有方法
        show () {
            console.log(this.books())
        }
    };

    // 返回类
    return Book2;
}());


var book2 = new Book2();

console.log(book2);

// 类的安全模式
function Book3(id, name, price) {

    // 安全模式, 保证类一定是用new实例化的
    if (!(this instanceof Book3)) {

        return new Book3(id, name, price);
    }

    this.id = id;
    this.name = name;
    this.price = price;
}


var book3 = Book3(1, 'Javascript', 38);

console.log(Object.getPrototypeOf(book3))
console.log(book3.id)
console.log(book3.name)
console.log(book3.price)








}());