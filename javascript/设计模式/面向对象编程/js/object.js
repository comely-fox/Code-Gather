(function (){

    // 1. 原始的
    function getName() {

        // something ...
    }

    function setName() {

        // something ...
    }

    function setAge() {

        // something ...
    }

    function getAge() {

        // something ...
    }

    // 拷贝person函数, 更准确的因该是储存person函数的内存地址
    var copy = person;

    // 2. 稍微好一些, 只有一个变量, 但是不能复制, 只此一份
    var person = {

        getName () {

            // something ...
        },

        setName () {

            // something ...
        },

        getAge () {

            // something ...
        },

        setAget () {

            // something ...
        }
    };

    // 3. 工厂函数, 可以生产一个对象, 多次利用会产生多个副本, 有弊端新对象的构造器与person没有关系
    function person() {

        // 返回对象
        return {

            getName () {

                // something ...
            },
        
            setName () {
        
                // something ...
            },
        
            getAge () {
        
                // something ...
            },
        
            setAget () {
        
                // something ...
            }
        }
    }

    console.log(person)  // { ... } 函数提升, 造成被覆盖


    var p = copy(); // 工产函数返回一个新对象
    console.log(p.constructor === copy)  // false, p对象与copy函数对象没有任何关系

    // 4. 继续改造 new操作符
    // 采用es6写法. 解决了构造器的问题
    // 浪费可耻, 每次实例化对象都会拷贝一遍方法与属性
    function person2 () {

        this.getName = () => { /* something ... */ };
        this.setName = () => { /* something ... */ };
        this.getAge = () => { /* something ... */ };
        this.setAge = () => { /* something ... */ };
    }

    var p2 = new person2();  // 实例化对象, 其实只是new新创建一个对象, 并动态的绑定了this指向这个新对象

    console.log(p2.constructor === person2 ) // true 

    // 5. 采用原型链
    // 每次实例化对象的时候没有拷贝属性与方法, 新对象的原型链指向构造函数的prototype属性上, 所有可以共用这些公共方法和属性
    function person3 () {

    }
    
    person3.prototype.getName = function () { /* something ... */ };
    person3.prototype.setName = function () { /* something ... */ };
    person3.prototype.getAge = function () { /* something ... */ };
    person3.prototype.setAge = function () { /* something ... */ };

    var p31 = new person3();
    var p32 = new person3();
    console.log(p31.constructor === person3) // true
    console.log(Object.getPrototypeOf(p31) === Object.getPrototypeOf(p32))  // true 同指向一个原型

    // 6. 继续改写, 整合一下
    // 有隐藏的问题, constructor属性的指向问题
    // 每次实例化对象的时候没有拷贝属性与方法, 新对象的原型链指向构造函数的prototype属性上, 所有可以共用这些公共方法和属性
    function person4 () {

    }
    // 有隐藏的问题, constructor属性的指向问题
    person4.prototype = {

        getName () { /* something ... */ },
        setName () { /* something ... */ },
        getAge () { /* something ... */ },
        setAge () { /* something ... */ },
    }

    var p41 = new person4();
    var p42 = new person4();
    console.log(p41.constructor === person4) // false
    console.log(p42.constructor === person4) // false
    console.log(p42.constructor === Object) // true  , 因为prototype属性是指向由Object构造函数构造出来的新对象

    // 7. 继续改写, 解决constructor属性的指向问题
    // 每次实例化对象的时候没有拷贝属性与方法, 新对象的原型链指向构造函数的prototype属性上, 所有可以共用这些公共方法和属性
    function person5 () {

    }
    // 有隐藏的问题, constructor属性的指向问题
    person5.prototype = {
        // 显式修正指向问题
        constructor: person5,
        getName () { /* something ... */ },
        setName () { /* something ... */ },
        getAge () { /* something ... */ },
        setAge () { /* something ... */ },
    }

    var p51 = new person5();
    var p52 = new person5();
    console.log(p51.constructor === person5) // true
    console.log(p52.constructor === person5) // true

    // 8. 继续改写, 实现链式调用
    // 每次实例化对象的时候没有拷贝属性与方法, 新对象的原型链指向构造函数的prototype属性上, 所有可以共用这些公共方法和属性
    function person6 () {

    }
    // 有隐藏的问题, constructor属性的指向问题
    person6.prototype = {
        // 显式修正指向问题
        constructor: person6,
        // 显式返回新new出来的对象
        getName () { /* something ... */ return this; },
        setName () { /* something ... */ return this; },
        getAge () { /* something ... */  return this; },
        setAge () { /* something ... */  return this; },
    }

    var p6 = new person6();
    var result = p6.getName().setName().getAge().getName(); // 链式调用
    console.log(result) // 打印p6这个对象

    /** 见 function.js 文件 */    
}());
