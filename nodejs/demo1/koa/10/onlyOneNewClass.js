

class Person {
    constructor( name ){
        this.name2 = name;
        Person.count++;
        console.log( Person.count );

    }
    name(  ){
        console.log( this.name2 );
    }
}
Person.count = 0;
let obj;
const E = function( name ){
    if ( !obj ){
        obj = new Person( name );
    }
    obj.name2 = name;
    return obj;
};


 E('jock').name() ;
 E('jock1').name();
 E('jock2').name();
E('jock3').name() ;
