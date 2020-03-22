function exactnessLength( string ){
    var res = string.match( /[\s\S]/gu );
    return res ? res.length : 0;
}

console.log( "exactnessLength", exactnessLength('32🐪2') )


function fibonacci(n, fna="fna",t) {
console.log(fna,"n=>",n,"res",t  )
    if (n === 0){
        return 0
    }

    if (n === 1) return 1

    var a = fibonacci(n - 1, fna = "fna",t);
    var b = fibonacci(n - 2, fna = "fnb",t);
    var c = a + b;
    t = c;
    // console.log( "a=>", a , "b=>",b, "c=>", c,"d",d)
    return c;
}
{

    var x = 1;
    var y = 1;
    var tem;

    for ( var i = 2; i <= 10; i++ ){
        tem = x;
        x = y;
        y = y + tem;
    }
    console.log( y )














}
