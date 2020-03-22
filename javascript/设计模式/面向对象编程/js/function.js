"use strict";
// 基本数据类型: String、Number、Boolean、Symbol、Undefined、Null 
// 复杂引用类型: Object、Array、Function ...
// Function构造器的prototype属性与原型链委托于一个原始的"function"对象, 而这个原始的"function"对象没有prototype属性
// 而这个原始的"function"对象的原型链委托于Object.prototype

// 所有的函数都是Function的实例, function对象的原型链委托于Function.prototype
// 而Function.prototype的原型链委托于Object.prototype
// 而Object.prototype的原型链委托于null
// 每个函数对象有一个prototype属性, prototype属性指向一个默认对象, 
// 该对象里有一个默认属性是construct这个属性值指向函数对象本身
// 而这个默认对象的原型链委托于Object.prototype

// 1. 扩展Function原型属性
Function.prototype.addMethod = function (name, fn) {

  
    this[name] = fn;
};


var fn1 = function () { };
// 给fn1函数对象添加方法
fn1.addMethod('getName', () => { /* something ... */ })
fn1.addMethod('setName', () => { /* something ... */ })
fn1.addMethod('getAge', () => { /* something ... */ })
fn1.addMethod('setAge', () => { /* something ... */ })

// 2. 扩展Function原型属性, 链式调用addMethod方法
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn;
    return this;
};


var fn2= function () { };
// 链式给fn2函数对象添加方法
fn2.addMethod('getName', () => { /* something ... */ })
  .addMethod('setName', () => { /* something ... */ })
  .addMethod('getAge', () => { /* something ... */ })
  .addMethod('setAge', () => { /* something ... */ });


// 3. 链式使用
// 2. 扩展Function原型属性, 链式调用addMethod方法
Function.prototype.addMethod = function (name, fn) {
    // 隐藏绑定this this === 函数对象
    // 为构造函数本身添加方法
    this[name] = fn;
    return this;
};

// 函数式调用方法
var fn3 = function () { };
// 链式给fn2函数对象添加方法, 显示返回fn3函数对象本身
fn3.addMethod('getName', function () { /* something ... */ return this; })
  .addMethod('setName', function () { /* something ... */ return this;})
  .addMethod('getAge', function () { /* something ... */ return this;})
  .addMethod('setAge', function () { /* something ... */ return this;});


fn3.getName().getName().setName();  // 链式调用



// 二、 类式调用方式
Function.prototype.addMethod = function (name, fn) {
    // 隐藏绑定this this === 函数对象 注意要用new实例化
    // 给函数对象的prototype属性添加方法
    // 为构造函数原型添加方法
    this.prototype[name] = fn;
    // 为构造函数本身添加方法
    this[name] = fn;
    return this;
};

// 类式调用方式
var Fn4 = function () { };

// 链式给fn2函数对象添加方法, 显示返回fn3函数对象本身
Fn4.addMethod('getName', function () { /* something ... */ return this; })
  .addMethod('setName', function () { /* something ... */ return this;})
  .addMethod('getAge', function () { /* something ... */ return this;})
  .addMethod('setAge', function () { /* something ... */ return this;});

var fn4 = new Fn4(); // 实例化

console.log(fn4.getName().setName()); // 链式调用


