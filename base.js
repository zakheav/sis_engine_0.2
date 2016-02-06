function deepCopy( object ) {
    var re;
    if( object instanceof Object == true ){
        if( object instanceof Array == true ){
            re = new Array(object.length);
            for( var i=0; i<object.length; ++i ){
                if( ( object[i] instanceof Object == true || object[i] instanceof Array == true ) && object[i] instanceof Function == false ){
                    re[i] = deepCopy( object[i] );
                } else{
                    re[i] = object[i];
                }
            }
        } else{
            re = {};
            for( var key in object ){
                if( ( object[key] instanceof Object == true || object[key] instanceof Array == true ) && object[key] instanceof Function == false ){
                    re[key] = deepCopy( object[key] );
                } else{
                    re[key] = object[key];
                }

            }
        }
    } else{
        re = object;
    }
    return re;
}

//function sleep( numberMillis ) {
//    var now = new Date();
//    var exitTime = now.getTime() + numberMillis;
//    while (true) {
//        now = new Date();
//        if (now.getTime() > exitTime)
//            return;
//    }
//}

//math
function distance( A, B ){
    return Math.sqrt((A.x- B.x)*(A.x- B.x) + (A.y- B.y)*(A.y- B.y));
}
function dotProduct( A, B ){
    return (A.x* B.x + A.y* B.y);
}