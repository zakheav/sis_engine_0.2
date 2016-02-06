//map对象
function Map( x, y ){//这里的x和y分别是map所对应的数组的列数和行数

    /*map对象中调用的函数***********************************************************************************************/
    //初始化矩阵
    function build_matrix( x, y ) {//x是列数，y是行数
        var matrix, i, j;
        if( parseInt(x) == x && parseInt(y) == y && x>0 && y>0 ){
            matrix = new Array( x + 2 );
            for( i=0; i<=x+1; ++i ){
                matrix[i] = new Array( y + 2 );
            }
            for( i=0; i<=x+1; ++i ){
                matrix[i][0] = matrix[i][y+1] = 1;
            }
            for( i=0; i<=y+1; ++i ){
                matrix[0][i] = matrix[x+1][i] = 1;
            }
            for( i=1; i<=x; ++i ){
                for( j=1; j<=y; ++j ){
                    matrix[i][j] = 0;
                }
            }
            return matrix;
        } else{
            alert("错误的矩阵初始化，行与列必须为正整数！");
            return false;
        }
    }

    //求中位数算法,基于快速排序(内存开销太大，舍弃)
    //function get_middle( set, sig, high, low, m ) {//set是object的集合,sig=x或者y
    //    var temp, states = 0;
    //    temp = set[low];
    //    var h = high, l = low;
    //    while( h > l ){
    //        if( states == 0 ){
    //            if( sig == "x" ){//如果是以x坐标来排序
    //                if( set[h].get_coordinate().x >= temp.get_coordinate().x ){
    //                    --h;
    //                } else{
    //                    set[l] = set[h];
    //                    ++l;
    //                    states = 1;
    //                }
    //            } else{//如果是以y坐标来排序
    //
    //                if( set[h].get_coordinate().y >= temp.get_coordinate().y ){
    //                    --h;
    //                } else{
    //                    set[l] = set[h];
    //                    ++l;
    //                    states = 1;
    //                }
    //            }
    //        } else{
    //            if( sig == "x" ){//如果是以x坐标来排序
    //                if( set[l].get_coordinate().x <= temp.get_coordinate().x ){
    //                    ++l;
    //                } else{
    //                    set[h] = set[l];
    //                    --h;
    //                    states = 0;
    //                }
    //            } else{//如果是以y坐标来排序
    //                if( set[l].get_coordinate().y <= temp.get_coordinate().y ){
    //                    ++l;
    //                } else{
    //                    set[h] = set[l];
    //                    --h;
    //                    states = 0;
    //                }
    //            }
    //        }
    //    }
    //    set[l] = temp;
    //    if( l == m ){
    //        if( sig == "x" )
    //            return temp.get_coordinate().x;
    //        else
    //            return temp.get_coordinate().y;
    //    } else if( l < m ){
    //        return get_middle( set, sig, high, l+1, m );
    //    } else{
    //        return get_middle( set, sig, l-1, low, m );
    //    }
    //}
    //选取中位数
    //基于堆排序********************************************************************************************************
    function adjust( set, index, sig, length ){
        var temp,i;

        while( index+1 <= parseInt( length/2 ) ){
            if( (index+1)*2 < length ){
                if( sig == "x" ){
                    i = set[(index+1)*2-1].get_coordinate().x < set[(index+1)*2].get_coordinate().x ? (index+1)*2-1 : (index+1)*2;
                } else{
                    i = set[(index+1)*2-1].get_coordinate().y < set[(index+1)*2].get_coordinate().y ? (index+1)*2-1 : (index+1)*2;
                }

            } else{
                i = (index+1)*2-1;
            }

            if( sig == "x" ){
                if( set[i].get_coordinate().x < set[index].get_coordinate().x ){
                    temp = set[index];
                    set[index] = set[i];
                    set[i] = temp;
                }
            } else{
                if( set[i].get_coordinate().y < set[index].get_coordinate().y ){
                    temp = set[index];
                    set[index] = set[i];
                    set[i] = temp;
                }
            }
            index = i;

        }

    }
    function get_middle( set, m, sig ){//基于堆排序(小根堆)
        var i, temp, result;

        for( i = parseInt(set.length/2)-1; i>=0; --i ){//建堆过程
            adjust( set, i, sig, set.length );
        }

        for( i=0; i<=m; ++i ){
            if( sig == "x" ){
                result = set[0].get_coordinate().x;
            } else{
                result = set[0].get_coordinate().y;
            }
            temp = set[0];
            set[0] = set[set.length-1-i];
            set[set.length-1-i] = temp;
            adjust( set, 0, sig, set.length-i-1 );//调整

        }
        return result;
    }
    /******************************************************************************************************************/

    //对array进行快速排序
    function quick_sort( array, high, low ) {
        if( high > low ){
            var l = low, h = high, temp, states = 0;
            temp = array[low];
            while( l < h ){
                if( states == 0 ){
                    if( array[h].sig < temp.sig ){
                        array[l] = array[h];
                        states = 1;
                        ++l;
                    } else{
                        --h;
                    }
                } else{
                    if( array[l].sig > temp.sig ){
                        array[h] = array[l];
                        states = 0;
                        --h;
                    } else{
                        ++l;
                    }
                }
            }
            array[l] = temp;
            quick_sort( array, l-1, low );
            quick_sort( array, high, l+1 );
        }
    }
    /******************************************************************************************************************/

    /*私有属性*********************************************************************************************************/
    var matrix = build_matrix(x,y);
    var objects = new Array(0);
    var quadTree = {};
    var sizeX = x, sizeY = y;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性********************************************************************************************/
    this.add_objects = function(x,y,size) {
        var o = new Obj(x,y,size);
        objects.push(o);
        matrix[x][y] = 1;//设置matrix中的这个单元格有物品
    };
    this.get_matrix = function() {
        return deepCopy( matrix );
    };
    this.get_objects = function() { return deepCopy( objects ); };
    this.get_quadTree = function() { return deepCopy( quadTree ); };
    this.set_quadTree = function( qt ) { quadTree = qt; };
    this.get_size = function() { return { x: sizeX, y: sizeY } };
    /******************************************************************************************************************/

    /*四叉树的结构*******************************************************************************************************
    用js的对象来存储
    每一个节点是一个对象:
    //在有子节点的情况下
    space =
    {
        leaveNum: //叶子数目（为4的情况）
        //空间的上下左右限制
        up:
        down:
        right:
        left:

        children:
        children[0]: space 左上角
        children[1]: space 右上角
        children[2]: space 右下角
        children[3]: space 左下角
    }

    //在没有子节点的情况下
    space =
    {
        leaveNum: //叶子数目（为0的情况）
        //空间的上下左右限制
        up:
        down:
        right:
        left:

        obj:
    }
    *******************************************************************************************************************/
    this.build_quadTree = function( up, down, right, left, set, quadTree_node ) {//set是当前空间内的object集合
        //alert(up+" "+down+" "+right+" "+left);

        if( set.length > 1 ){//空间内的object数量大于1，才继续产生新的子树
            quadTree_node.leaveNum = 4;
            quadTree_node.up = up;
            quadTree_node.down = down;
            quadTree_node.right = right;
            quadTree_node.left = left;

            quadTree_node.children = new Array(4);
            quadTree_node.children[0] = {};
            quadTree_node.children[1] = {};
            quadTree_node.children[2] = {};
            quadTree_node.children[3] = {};

            var middle_x = get_middle( set, parseInt( set.length/2 ),"x" );//得到x轴方向的中位数

            var set_left = new Array(0);
            var set_right = new Array(0);
            var set_middle = new Array(0);
            for( var i=0; i<set.length; ++i ){//按照middle_x把set中的object分为左右两部分
                if( set[i].get_coordinate().x < middle_x ){
                    set_left.push( set[i] );
                } else if( set[i].get_coordinate().x > middle_x ){
                    set_right.push( set[i] );
                } else{
                    set_middle.push( set[i] );
                }
            }
            if( set_left.length == 0 ){
                for( i=0; i<set_middle.length; ++i ){
                    set_left.push( set_middle[i] );
                }
                middle_x = middle_x + 0.5;
            } else {
                for( i=0; i<set_middle.length; ++i ){
                    set_right.push( set_middle[i] );
                }
                middle_x = middle_x - 0.5;
            }


            //把set_left分为上下两部分
            var middle_left_y = ( up + down ) / 2;
            if( set_left.length > 0 ){
                middle_left_y = get_middle( set_left, parseInt( set_left.length/2 ), "y" );

                var set_left_up = new Array(0);
                var set_left_down = new Array(0);
                set_middle = new Array(0);
                for( i=0; i<set_left.length; ++i ){//按照middle_left_y把set_left中的object分为上下两部分
                    if( set_left[i].get_coordinate().y<middle_left_y ){
                        set_left_down.push( set_left[i] );
                    } else if( set_left[i].get_coordinate().y>middle_left_y ){
                        set_left_up.push( set_left[i] );
                    } else{
                        set_middle.push( set_left[i] );
                    }
                }
                if( set_left_down.length == 0 ){
                    for( i=0; i<set_middle.length; ++i ){
                        set_left_down.push( set_middle[i] );
                    }
                    middle_left_y = middle_left_y + 0.5;
                } else{
                    for( i=0; i<set_middle.length; ++i ){
                        set_left_up.push( set_middle[i] );
                    }
                    middle_left_y = middle_left_y - 0.5;
                }

                this.build_quadTree( up, middle_left_y, middle_x, left, set_left_up, quadTree_node.children[0] );
                this.build_quadTree( middle_left_y, down, middle_x, left, set_left_down, quadTree_node.children[3] );
            } else{
                quadTree_node.children[0] = {
                    leaveNum: 0,
                    up: up,
                    down: middle_left_y,
                    right: middle_x,
                    left: left,
                    obj: false
                };
                quadTree_node.children[3] = {
                    leaveNum: 0,
                    up: middle_left_y,
                    down: down,
                    right: middle_x,
                    left: left,
                    obj: false
                }
            }


            //把set_right分为上下两部分
            var middle_right_y = ( up + down ) / 2;
            if( set_right.length > 0 ){

                middle_right_y = get_middle( set_right, parseInt( set_right.length/2 ), "y" );

                var set_right_up = new Array(0);
                var set_right_down = new Array(0);
                set_middle = new Array(0);

                for( i=0; i<set_right.length; ++i ){
                    if( set_right[i].get_coordinate().y < middle_right_y ){
                        set_right_down.push( set_right[i] );
                    } else if( set_right[i].get_coordinate().y > middle_right_y ){
                        set_right_up.push( set_right[i] );
                    } else{
                        set_middle.push( set_right[i] );
                    }
                }
                if( set_right_down.length == 0 ){
                    for( i=0; i<set_middle.length; ++i ){
                        set_right_down.push( set_middle[i] );
                    }
                    middle_right_y = middle_right_y + 0.5;
                } else{
                    for( i=0; i<set_middle.length; ++i ){
                        set_right_up.push( set_middle[i] );
                    }
                    middle_right_y = middle_right_y - 0.5;
                }

                this.build_quadTree( up, middle_right_y, right,middle_x, set_right_up, quadTree_node.children[1] );
                this.build_quadTree( middle_right_y, down, right, middle_x, set_right_down, quadTree_node.children[2] );
            } else{
                quadTree_node.children[1] = {
                    leaveNum: 0,
                    up: up,
                    down: middle_right_y,
                    right: right,
                    left: middle_x,
                    obj: false
                };
                quadTree_node.children[2] = {
                    leaveNum: 0,
                    up: middle_right_y,
                    down: down,
                    right: right,
                    left: middle_x,
                    obj: false
                }
            }

        } else{
            quadTree_node.leaveNum = 0;
            quadTree_node.up = up; quadTree_node.down = down;
            quadTree_node.right = right; quadTree_node.left = left;

            if(set.length == 1){
                quadTree_node.obj = set[0];
            } else{
                quadTree_node.obj = false;
            }
        }
    };

    /*已知线段，返回和object的交点*****************************************************************************************
    得到线段begin点所在的顶层四叉树节点，加入到array中，标记为0
    得到线段和最高层的哪些四叉树节点相交，把相交节点的相交点距离begin点的最小值作为标记
    把array中的节点按标记从大到小排序
    while(array不空){
        取出第一个节点
        if(是叶子节点){
            if(有object){
                if(和object相交){
                    if(交点是目前最近的){
                        更新最近交点坐标
                    }
                    把array中标记大于最近交点到begin点距离的节点删除
                }
            }
        } else{
            得到线段begin点在该节点的四个子节点中，把那个子节点加入到array中，标记为0
            得到线段和该节点的哪些子节点相交，把相交子节点的相交点距离begin点的最小值作为标记
            把array中的节点按标记从大到小排序
        }
    }
    return 最近相交点坐标
    *******************************************************************************************************************/
    this.get_intersectionPoint = function( begin, end ){
        var intersectionPoint = {}, distance = 9999;
        var array = new Array(0);
        array.push({ quadTreeNode:quadTree, sig:0 });
        while( array.length > 0 ){
            var processing_node = array[0];
            array.shift();//取出第一个节点

            if( processing_node.quadTreeNode.leaveNum == 4 ){
                var node;
                //考察每个子节点******************************************************************************************
                for( var i=0; i<4; ++i ){
                    if( processing_node.quadTreeNode.leaveNum == 4 || processing_node.quadTreeNode.obj != false ){
                        if( processing_node.quadTreeNode.children[i].up>begin.y && processing_node.quadTreeNode.children[i].down<begin.y && processing_node.quadTreeNode.children[i].right>begin.x && processing_node.quadTreeNode.children[i].left<begin.x ){
                            node = {};
                            node.quadTreeNode = processing_node.quadTreeNode.children[i];
                            node.sig = 0;
                            array.push(node);
                        } else{
                            //线段所在直线和节点四条边所在直线的四个交点
                            var p_up = {}, p_down = {}, p_right = {}, p_left = {};
                            //Ax + By + C = 0
                            var A = end.y-begin.y, B = begin.x - end.x, C = end.x*begin.y - begin.x*end.y;
                            if( A != 0 ){
                                p_up.x = (processing_node.quadTreeNode.children[i].up*B+C)/-A; p_up.y = processing_node.quadTreeNode.children[i].up;
                                p_down.x = (processing_node.quadTreeNode.children[i].down*B+C)/-A; p_down.y = processing_node.quadTreeNode.children[i].down;
                            }
                            if( B != 0 ){
                                p_left.x = processing_node.quadTreeNode.children[i].left; p_left.y = (processing_node.quadTreeNode.children[i].left*A+C)/-B;
                                p_right.x = processing_node.quadTreeNode.children[i].right; p_right.y = (processing_node.quadTreeNode.children[i].right*A+C)/-B;
                            }
                            var sig=9999, exist = 0, temp;
                            if( A!=0 && p_up.x>processing_node.quadTreeNode.children[i].left && p_up.x<processing_node.quadTreeNode.children[i].right ){//交点p_up在线段up内
                                if( p_up.y>begin.y&&p_up.y<end.y || p_up.y>end.y&&p_up.y<begin.y ){
                                    exist = 1;
                                    temp = Math.sqrt((begin.x-p_up.x)*(begin.x-p_up.x)+(begin.y-p_up.y)*(begin.y-p_up.y));
                                    if( temp < sig ){
                                        sig = temp;
                                    }
                                }
                            }
                            if( A!=0 && p_down.x>processing_node.quadTreeNode.children[i].left && p_down.x<processing_node.quadTreeNode.children[i].right ){//交点p_down在线段down内
                                if(p_down.y>begin.y&&p_down.y<end.y || p_down.y>end.y&&p_down.y<begin.y){
                                    exist = 1;
                                    temp = Math.sqrt((begin.x-p_down.x)*(begin.x-p_down.x)+(begin.y-p_down.y)*(begin.y-p_down.y));
                                    if( temp < sig ){
                                        sig = temp;
                                    }
                                }

                            }
                            if( B!=0 && p_right.y>processing_node.quadTreeNode.children[i].down && p_right.y<processing_node.quadTreeNode.children[i].up ){//交点p_right在线段right内
                                if( p_right.x>begin.x&&p_right.x<end.x || p_right.x>end.x&&p_right.x<begin.x ){
                                    exist = 1;
                                    temp = Math.sqrt((begin.x-p_right.x)*(begin.x-p_right.x)+(begin.y-p_right.y)*(begin.y-p_right.y));
                                    if( temp < sig ){
                                        sig = temp;
                                    }
                                }
                            }
                            if( B!=0 && p_left.y>processing_node.quadTreeNode.children[i].down && p_left.y<processing_node.quadTreeNode.children[i].up ){//交点p_right在线段right内
                                if( p_left.x>begin.x&&p_left.x<end.x || p_left.x>end.x&&p_left.x<begin.x ){
                                    exist = 1;
                                    temp = Math.sqrt((begin.x-p_left.x)*(begin.x-p_left.x)+(begin.y-p_left.y)*(begin.y-p_left.y));
                                    if( temp < sig ){
                                        sig = temp;
                                    }
                                }
                            }
                            if( exist == 1 ){
                                node = {};
                                node.quadTreeNode = processing_node.quadTreeNode.children[i];
                                node.sig = sig;
                                array.push( node );
                            }

                        }
                    }

                }

                //把array按照sig从大到小排序
                quick_sort( array, array.length-1, 0 );
            } else{//该节点是叶子节点
                if( processing_node.quadTreeNode.obj != false ){
                    var result = processing_node.quadTreeNode.obj.intersection_detect( begin, end );
                    if( result.sig < distance ){
                        distance = result.sig;
                        intersectionPoint.x = result.point.x;
                        intersectionPoint.y = result.point.y;
                        //把array中不满足sig<distance的节点删除
                        for( i=0; i<array.length; ++i ){
                            if( array[i].sig >= distance ){
                                array.splice( i, 1 );
                            }
                        }
                    }
                }
            }
        }
        if( distance < 9999 ){
            return intersectionPoint;
        } else{
            return false;
        }

    };

}

//map需要单例，所以要封装一个单例构造函数


