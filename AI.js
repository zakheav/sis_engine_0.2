/**
 * Created by origin on 2015/10/13.
 */
/*A星算法对象***********************************************************************************************************/
function Astar(){
    /*baseAI中Astar_router调用的基本函数*********************************************************************************/
    var get_bestPoint = function( open ){//返回open表中估值函数最佳的点
        var min = 999999, min_index = 0;
        for( var i=0; i<open.length; ++i ){
            if(open[i].score<min){
                min_index = i;
                min = open[i].score;
            }
        }
        var best = open[min_index];
        open.splice( min_index,1 );
        return best;
    };

    var get_nextStep = function( map, nowStep, end ) {//扩展出子节点，返回子节点列表
        var nextStepList = new Array(0);
        if( map[ nowStep.coordinate.x ][ nowStep.coordinate.y+1 ] == 0 ){//上可以了落脚
            var nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x;
            nextStep.coordinate.y = nowStep.coordinate.y + 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if(map[ nowStep.coordinate.x ][ nowStep.coordinate.y-1 ] == 0){//下可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x;
            nextStep.coordinate.y = nowStep.coordinate.y - 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push(nextStep);
        }
        if( map[ nowStep.coordinate.x-1 ][ nowStep.coordinate.y ] == 0 ){//左可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x - 1;
            nextStep.coordinate.y = nowStep.coordinate.y;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if( map[ nowStep.coordinate.x+1 ][ nowStep.coordinate.y ] == 0 ){//右可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x + 1;
            nextStep.coordinate.y = nowStep.coordinate.y;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if( map[ nowStep.coordinate.x-1 ][ nowStep.coordinate.y+1 ] == 0 ){//左上可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x - 1;
            nextStep.coordinate.y = nowStep.coordinate.y + 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if( map[ nowStep.coordinate.x-1 ][ nowStep.coordinate.y-1 ] == 0 ){//左下可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x - 1;
            nextStep.coordinate.y = nowStep.coordinate.y - 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if( map[ nowStep.coordinate.x+1 ][ nowStep.coordinate.y+1 ] == 0 ){//右上可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x + 1;
            nextStep.coordinate.y = nowStep.coordinate.y + 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        if( map[ nowStep.coordinate.x+1 ][ nowStep.coordinate.y-1 ] == 0 ){//右下可以落脚
            nextStep = {
                coordinate: {},
                pathLength: 0,
                score: 0,
                parent: {}
            };
            nextStep.coordinate.x = nowStep.coordinate.x + 1;
            nextStep.coordinate.y = nowStep.coordinate.y - 1;
            nextStep.pathLength = nowStep.pathLength + 1;
            nextStep.score = Math.sqrt( Math.pow( (end.x - nextStep.coordinate.x), 2 ) + Math.pow( (end.y-nextStep.coordinate.y), 2 ) ) + nextStep.pathLength;
            nextStep.parent.x = nowStep.coordinate.x; nextStep.parent.y = nowStep.coordinate.y;
            nextStepList.push( nextStep );
        }
        return nextStepList;
    };

    var in_table = function( point, set ) {
        for( var i=0; i<set.length; ++i ){
            if( set[i].coordinate.x == point.coordinate.x && set[i].coordinate.y == point.coordinate.y ){
                return i;
            }
        }
        return -1;
    };
    /******************************************************************************************************************/

    /*私有变量*********************************************************************************************************/
    //AI行动路径
    /*path中的每个元素是一个对象point
     point{
     coordinate:地图内的坐标
     score:估值函数的值
     pathLength:已走路径的长度
     parent:父节点坐标
     }
     */
    var path = new Array(0);
    /******************************************************************************************************************/

    /*对外接口，访问私有属性********************************************************************************************/
    this.get_path = function() { return path; };
    this.get_pathFirstStep = function() { return path[0]; };
    this.set_path = function( pathArray ) { path = pathArray; };
    this.shift_pathFirstStep = function() { path.shift(); };
    this.clear_path = function() { path = new Array(0); };
    /******************************************************************************************************************/


    //基于A-star算法的自动寻路系统
    this.Astar_router = function( theMAP, begin, end ) {//begin,end是起点和终点 begin = end = {x，y} matrix是地图矩阵
        path = new Array(0);
        if( end.x != -1 ){//目的地有效
            var MAP = theMAP.get_matrix();
            var open = new Array(0);
            var close = new Array(0);
            var p = new Array(0);
            //用于记录路径用的，功能类似于hash表
            var routeMatrix = new Array(MAP.length);
            for( var i=0; i<MAP.length; ++i ){
                routeMatrix[i] = new Array(MAP[0].length);
            }
            /*
             每一步（点）是一个标准的对象，该对象存在open表，close表中
             point{
             coordinate:地图内的坐标
             score:估值函数的值
             pathLength:已走路径的长度
             parent:父节点坐标
             }
             */
            //算出初始点的估价函数值，已走路径长度值，父节点坐标，然后连同初始点的坐标一同存入open表,也加入到routeMatrix中
            var point = {};
            point.coordinate = begin;
            point.score = Math.sqrt( Math.pow( (end.x-begin.x), 2 ) + Math.pow( (end.y-begin.y), 2 ) );
            point.pathLength = 0;
            point.parent = { x:-1, y:-1 };
            open.push( point );
            routeMatrix[ point.coordinate.x ][ point.coordinate.y ] = point;


            while( open.length > 0 ){
                var bestTry = get_bestPoint( open );
                close.push( bestTry );

                if( bestTry.coordinate.x == end.x && bestTry.coordinate.y == end.y ){
                    //取得路径队列
                    var tempPath = new Array(0);
                    var step = bestTry;
                    while( step.parent.x != -1 ){
                        tempPath.push( step );
                        step = routeMatrix[ step.parent.x ][ step.parent.y ];
                    }
                    //tempPath.push( step );

                    for( i=tempPath.length-1; i>=0; --i ){
                        p.push( tempPath[ i ] );
                    }
                    path = p;
                    return;
                }
                else{
                    var childPointList = get_nextStep( MAP, bestTry, end );
                    for( i=0; i<childPointList.length; ++i ){//遍历筛选每一个邻接子节点

                        var in_open = in_table( childPointList[i], open );
                        var in_close = in_table( childPointList[i], close );

                        if( in_open==-1 && in_close==-1 ){//子节点不在open表中 也不在close表中
                            routeMatrix[ childPointList[i].coordinate.x ][ childPointList[i].coordinate.y ] = childPointList[i];
                            open.push( childPointList[i] );
                        } else if( in_open!=-1 ){//子节点在open表中
                            if( childPointList[i].score < open[in_open].score ){
                                routeMatrix[ childPointList[i].coordinate.x ][ childPointList[i].coordinate.y ] = childPointList[i];
                                open[ in_open ] = childPointList[i];
                            }
                        } else if( in_close != -1 ){//子节点在close表中
                            if( childPointList[i].score < close[in_close].score ){
                                routeMatrix[ childPointList[i].coordinate.x ][ childPointList[i].coordinate.y ] = childPointList[i];
                                open.push( childPointList[i] );
                                close.splice( in_close, 1 );
                            }
                        }
                    }
                }

            }
        }
        path = new Array(0);
    };
}

function AI( x, y, id, map, player, AIManager ){
    /*对象依赖*/
    var theMap = map;//AI对象依赖地图对象
    var thePlayer = player;//玩家对象依赖
    var theAIManager = AIManager;
    var theGun = {}; //枪与AI之间的依赖
    /*传感器***********************************************************************************************************/
    var visionSensor = function( sight_end, scale ){
        var sight_begin = { x:coordinate.x, y:coordinate.y };
        if( distance(sight_begin,sight_end) < scale ){
            var sight_begin_to_end_dir = {
                x: sight_end.x-sight_begin.x,
                y: sight_end.y-sight_begin.y
            };
            var d = {
                x: direction.dx,
                y: direction.dy
            };

            if( dotProduct(sight_begin_to_end_dir, d) >= 0 ){
                if( theMap.get_intersectionPoint( sight_begin, sight_end ) == false ){
                    return true;//该条射线可以看见视线末端点指定的目标
                }
            }
        }

        return false;
    };//视觉传感器

    var collisionSensor = function(){
        var quadTree = theMap.get_quadTree();
        var offendPoint = {
            x: coordinate.x+direction.dx,
            y: coordinate.y+direction.dy
        };
        var quadTreeNode = quadTree;

        while( quadTreeNode.leaveNum == 4 ){
            var find_grid = 0;
            for( var i=0; i<4; ++i ){
                if( quadTreeNode.children[i].up >= offendPoint.y && quadTreeNode.children[i].down <= offendPoint.y && quadTreeNode.children[i].right >= offendPoint.x && quadTreeNode.children[i].left <= offendPoint.x ){
                    quadTreeNode = quadTreeNode.children[i];
                    find_grid = 1;
                    break;
                }
            }
            if( find_grid == 0 ){
                return true;//超出地图界限
            }
        }
        if( quadTreeNode.obj != false ){
            return quadTreeNode.obj.collision_detection( offendPoint );
        } else{
            return false;
        }
    };//碰撞传感器

    //A星算法自动寻路对象
    var Astar_router = new Astar();
    /******************************************************************************************************************/

    /*私有属性标识了AI状态属性*****************************************************************************************/
    var ID = id;
    var size = 0.25;
    var life = 100;
    //AI位置
    var coordinate = { x:x, y:y };//精确位置
    var pos = {
        x: x - Math.floor(x)>0.5 ? Math.ceil(x) : Math.floor(x),
        y: y - Math.floor(y)>0.5 ? Math.ceil(y) : Math.floor(y)
    };//所在地图的格子
    var nextStep = { x:-1, y:-1 };
    //AI运动趋势(朝向)
    var direction = {
        dx: 0,//Math.random() - 0.5,
        dy: 0//Math.random() - 0.5
    };

    var destination = { x:-1, y:-1 };//目标
    var timeParam = 1;
    //var alarm = 0;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性*******************************************************************************************/
    this.set_AIState = function( AIState ){
        ID = AIState.ID;
        life = AIState.life;
        coordinate = AIState.coordinate;
        pos = AIState.pos;
        nextStep = AIState.nextStep;
        direction = AIState.direction;
        destination = AIState.destination;
        timeParam = 1;
        Astar_router.set_path( AIState.path );
    };
    this.get_AIState = function(){
        var AIState = {};
        AIState.ID = ID;
        AIState.life = life;
        AIState.coordinate = deepCopy(coordinate);
        AIState.pos = deepCopy(pos);
        AIState.nextStep = deepCopy(nextStep);
        AIState.direction = deepCopy(direction);
        AIState.destination = deepCopy(destination);
        AIState.path = deepCopy(Astar_router.get_path());
        return AIState;
    };
    this.get_ID = function() { return ID; };
    this.get_size = function() { return size; };
    this.get_life = function() { return life; };
    this.decrease_life = function( dec ) { life = life-dec < 0 ? 0 : life-dec; };
    this.heal_life = function( heal ) { life += heal; };
    this.get_coordinate = function() { return deepCopy( coordinate ); };
    this.get_pos = function() { return deepCopy( pos ); };
    this.get_direction = function() { return deepCopy( direction ); };
    this.set_interest = function( interestArray ){ interestArr = interestArray; };
    this.set_timeParam = function( t ){ timeParam = t; };
    this.get_alarm = function(  ){ return interestArr[0].alarm; };
    this.get_gun = function(){ return theGun; };
    this.change_destination = function(x,y){ destination.x=x; destination.y=y; };
    this.go_directly = function(){

        if( destination.x != -1 && distance(coordinate, destination) > 0.1 ){//没有到达终点
            var m = distance(destination,coordinate);
            direction.dx = ( destination.x - coordinate.x ) / ( timeParam *10*m );
            direction.dy = ( destination.y - coordinate.y ) / ( timeParam *10*m );
            var collision_obj = collisionSensor();//碰撞检测
            if( collision_obj == false ){//没有发生碰撞
                coordinate.x = coordinate.x + direction.dx;
                coordinate.y = coordinate.y + direction.dy;
                pos.x = coordinate.x - Math.floor( coordinate.x ) > 0.5 ? Math.ceil( coordinate.x ) : Math.floor( coordinate.x );
                pos.y = coordinate.y - Math.floor( coordinate.y ) > 0.5 ? Math.ceil( coordinate.y ) : Math.floor( coordinate.y );
            }
        }
    };//支持微操做的运动控制，仅用于玩家
    this.add_gun = function( gun ){
        theGun = gun;
    };
    this.clear_router = function(){
        Astar_router.clear_path();//删除AI寻路路径
        destination.x = -1; destination.y = -1;
        nextStep.x = -1; nextStep.y = -1;//reset初始化
    };

    /******************************************************************************************************************/

    //AI被抛出时的物理效果控制
    this.isObject = false;
    var objectMovingSpeed = 0.5;
    var a = 0.1;//滑动摩擦力导致的加速度
    var d = {x:0, y:0};
    this.moveLikeObject = function( dir ){
        if( d.x == 0 ){//初始调用这个函数
            d.x = dir.x;
            d.y = dir.y;
        }
        if( objectMovingSpeed > 0 ){
            //计算出direction
            direction.dx = (objectMovingSpeed*d.x)/distance({x:0,y:0}, d);
            direction.dy = (objectMovingSpeed*d.y)/distance({x:0,y:0}, d);
            if( collisionSensor() ){//发生了碰撞
                objectMovingSpeed = 0;
                life = life-5 < 0 ? 0 : life - 5;//减血
            } else{
                coordinate.x = coordinate.x + direction.dx;
                coordinate.y = coordinate.y + direction.dy;
                pos.x = coordinate.x - Math.floor( coordinate.x ) > 0.5 ? Math.ceil( coordinate.x ) : Math.floor( coordinate.x );
                pos.y = coordinate.y - Math.floor( coordinate.y ) > 0.5 ? Math.ceil( coordinate.y ) : Math.floor( coordinate.y );
                objectMovingSpeed = objectMovingSpeed - a;
            }
        } else{//函数调用结束
            d.x = d.y = 0;
            objectMovingSpeed = 0.5;
            this.isObject = false;
            direction.dx = direction.dy = 0;
        }

    };

    /*AI系统调用所需函数*************************************************************************************************/
    var set_destination = function( type ){//type = 1 是射击点，0是藏匿点
        var playerPosInMem = {x:0,y:0};
        playerPosInMem.x = interestArr[0].coordinate.x - Math.floor( interestArr[0].coordinate.x ) > 0.5 ?  Math.ceil(interestArr[0].coordinate.x) : Math.floor(interestArr[0].coordinate.x);
        playerPosInMem.y = interestArr[0].coordinate.y - Math.floor( interestArr[0].coordinate.y ) > 0.5 ?  Math.ceil(interestArr[0].coordinate.y) : Math.floor(interestArr[0].coordinate.y);
        var playerPos = thePlayer.get_pos();

        var playerCoordinate = thePlayer.get_coordinate();
        var dis = 3, x, y;
        var distArr = new Array(0);
        var mapMatrix = theMap.get_matrix();
        //筛选出player周围可以落脚的格子
        for( y = playerPos.y - dis; y <= playerPos.y + dis; ++y ){
            for( x = playerPos.x - dis; x <= playerPos.x + dis; ++x ){
                if( x >= 1 && x <= theMap.get_size().x && y >= 1 && y <= theMap.get_size().y ){ //没有超出边界
                    if( x != playerPos.x || y != playerPos.y ){ //不考虑player所在格子
                        if( mapMatrix[x][y] == 0 ){ //不考虑有object的格子
                            var begin = { x:x, y:y }, end = { x:playerCoordinate.x, y:playerCoordinate.y };
                            if( type == 1 ){ //寻找射击点
                                if( theMap.get_intersectionPoint( begin, end ) ){
                                    //do nothing
                                } else{
                                    distArr.push( begin );
                                }
                            } else{ //寻找藏匿点
                                if( theMap.get_intersectionPoint( begin, end ) ){
                                    distArr.push( begin );
                                }
                            }
                        }
                    }
                }
            }
        }

        if( distArr.length > 0 ){//存在候选目的地
            if( type == 1 && playerPos.x != playerPosInMem.x || playerPos.y != playerPosInMem.y ){//在进攻模式下，敌人最后在记忆中出现的位置和敌人真实位置不符
                destination = playerPosInMem;
            } else{
                var index = parseInt( Math.random()*( distArr.length - 1 ) );
                destination = distArr[ index ];//生成目的地
            }
        } else{
            destination.x = destination.y = -1;
        }

    };//根据player位置生成目的地
    var move = function(){
        if( nextStep.x == -1 ){
            nextStep.x = Astar_router.get_pathFirstStep().coordinate.x;
            nextStep.y = Astar_router.get_pathFirstStep().coordinate.y;
        }
        if( distance(coordinate, nextStep) < 0.3 ){//到达路径节点
            Astar_router.shift_pathFirstStep();//删除到达的路径节点
            if( Astar_router.get_path().length > 0 ){//没有到达终点
                nextStep.x = Astar_router.get_pathFirstStep().coordinate.x; nextStep.y = Astar_router.get_pathFirstStep().coordinate.y;
                nextStep.x = nextStep.x + ( Math.random() - 0.5 ) * 0.5;
                nextStep.y = nextStep.y + ( Math.random() - 0.5 ) * 0.5;
            } else{
                direction.dx = direction.dy = 0;//立正
                nextStep.x = -1;//coordinate.x;
                nextStep.y = -1;//coordinate.y;//必须这样
            }
        } else{//未到达路径节点
            var m = distance(nextStep,coordinate);
            direction.dx = ( nextStep.x - coordinate.x ) / ( timeParam *10*m );
            direction.dy = ( nextStep.y - coordinate.y ) / ( timeParam *10*m );

            var next = {};
            next.x = nextStep.x - Math.floor(nextStep.x) > 0.5 ? Math.ceil(nextStep.x) : Math.floor(nextStep.x);
            next.y = nextStep.y - Math.floor(nextStep.y) > 0.5 ? Math.ceil(nextStep.y) : Math.floor(nextStep.y);

            var matrix = theMap.get_matrix();
            if( next.x!=pos.x && next.y!=pos.y ){//存在斜向路径
                if( matrix[pos.x][next.y]==1 || matrix[next.x][pos.y]==1 ){//斜向路径路过拐角
                    var collision_obj = collisionSensor();
                    if( collision_obj ){//发生碰撞
                        if( collision_obj.x != pos.x ){
                            direction.dx = 0 - direction.dx;
                        } else if( collision_obj.y != pos.y ){
                            direction.dy = 0 - direction.dy;
                        }
                    }
                }
            }
            coordinate.x = coordinate.x + direction.dx;
            coordinate.y = coordinate.y + direction.dy;
            pos.x = coordinate.x - Math.floor( coordinate.x ) > 0.5 ? Math.ceil( coordinate.x ) : Math.floor( coordinate.x );
            pos.y = coordinate.y - Math.floor( coordinate.y ) > 0.5 ? Math.ceil( coordinate.y ) : Math.floor( coordinate.y );
        }
    };//运动
    /******************************************************************************************************************/

    /*系统调用*********************************************************************************************************/
    //因为系统调用会持续一段时间，有一些操作会在持续时间开始时刻执行，或者在结束时刻执行，所以设定标记向量标记当前时刻和前一时刻当前AI的系统调用激活情况
    //flag[][2]   flag[i][0] ：前一状态，flag[i][1]：当前状态（0：系统调用未激活，1：系统调用激活）
    var SysNum = 5;//系统调用个数
    var flag = new Array(SysNum);
    for( var i=0; i<SysNum; ++i ){
        flag[i] = new Array(2);
        flag[i][0] = flag[i][1] = 0;
    }


    var theAIFUNCTION_mangager = function(){
        for( var i=0; i<SysNum; ++i ){
            flag[i][0] = flag[i][1];
            flag[i][1] = 0;//当前系统调用状态默认为未激活，被激活的系统调用会自己为flag[i][1]赋值
        }
    };

    var freeGrid = [];//用于存放地图空闲的区域
    var mapMatrix = theMap.get_matrix();
    var theAIFUNCTION_wandering = function(){

        flag[0][1] = 1;//当前系统调用被激活
        if( flag[0][0] == 0 ){
            Astar_router.clear_path();//删除AI寻路路径
            destination.x = -1; destination.y = -1;
            nextStep.x = -1; nextStep.y = -1;//reset初始化

            for( var i=1; i<=theMap.get_size().x; ++i ){
                for( var j=1; j<theMap.get_size().y; ++j ){
                    if( mapMatrix[i][j] == 0 ) freeGrid.push({ x:i, y:j });
                }
            }
            var index = parseInt(Math.random()*(freeGrid.length-1));
            destination.x = freeGrid[index].x;//得到目的地
            destination.y = freeGrid[index].y;
            Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
        }//系统调用刚被激活
        else{
            if( Astar_router.get_path().length > 0 ){//没有到达目的地
                move();
            } else{
                index = parseInt(Math.random()*(freeGrid.length-1));
                destination.x = freeGrid[index].x;//得到目的地
                destination.y = freeGrid[index].y;
                Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
            }
        }
    };// 游荡

    var theAIFUNCTION_attack = function(){
        flag[1][1] = 1;//当前系统调用被激活
        if( flag[1][0] == 0 ){//系统调用才激活
            Astar_router.clear_path();//删除AI寻路路径
            destination.x = -1; destination.y = -1;
            nextStep.x = -1; nextStep.y = -1;//reset初始化

            set_destination(1);//设定攻击目的地
            Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
        }
        if( Astar_router.get_path().length > 0 ){//没有到达目的地
            move();
            return false;
        } else{//到达指定目的地的
            if( visionSensor( thePlayer.get_coordinate(),10 ) ){//处于火力暴露之下
                if( life > 20 ){//健康状态良好
                    return true;
                } else{//血量不足，优先找掩体
                    if(Math.random()>0.6){
                        set_destination(0);//设定掩护目的地
                        Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
                        return false;
                    } else{
                        return true;
                    }
                }
            } else{//处于掩体中
                if( life > 20 ){//健康状况良好
                    set_destination(1);//设定攻击目的地
                    Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
                    return false;
                } else{//血量不足
                    if( Math.random()>0.2 ){
                        return false;//采用概率的方式让AI在掩体中停留一段时间
                    } else{
                        set_destination(1);//设定攻击目的地
                        Astar_router.Astar_router( theMap, pos, destination );//调用寻路系统，寻路
                        return false;
                    }
                }
            }
        }
    }; //进攻（整合了策略性撤退，简化脚本编写，唯一的调用寻路的系统调用）

    var theAIFUNCTION_communication = function(){
        flag[2][1] = 1;//当前系统调用被激活
        var AITable = theAIManager.AITable;
        for( var i=0; i<AITable.length; ++i ){
            AITable[i].set_interest( deepCopy(interestArr) );
        }
    }; //警报


    var memory = [];//长期记忆体，把短期记忆中的一些事物长期存储
    var interestArr = [];//在AI运行过程中充当短期记忆体，保存感兴趣的事物，每个事物在数组中从左到右优先级递减
    interestArr[0] = {
        name: "enemy",
        coordinate: {x:-1, y:-1},
        alarm: 0
    };
    interestArr[1] = {
        name: "body",
        coordinate: {x:-1, y:-1},
        alarm: 0
    };
    var theAIFUNCTION_interestAwareness = function(){
        flag[3][1] = 1;//当前系统调用被激活
        //设置interestArr中敌人（玩家）的相关数据
        var playerCoordinate = thePlayer.get_coordinate();
        if( visionSensor( playerCoordinate, 10 ) ){
            interestArr[0].alarm = interestArr[0].alarm + 5/timeParam > 400 ? 400 : interestArr[0].alarm + 5/timeParam;
            interestArr[0].coordinate = playerCoordinate;//记下玩家坐标
        } else{
            interestArr[0].alarm = interestArr[0].alarm - 2/timeParam > 0 ? interestArr[0].alarm - 2/timeParam : 0;
        }
        //设置interestArr中友军尸体的相关数据
        var AITable = theAIManager.AITable;
        for( var i=0; i<AITable.length; ++i ){
            if( AITable[i].get_life()<=0 ){
                var bodyCoordinate = AITable[i].get_coordinate();
                if( visionSensor( bodyCoordinate, 10, theMap ) ){//发现尸体
                    var inMemory = false;
                    for( var j=0; j<memory.length; ++j ){//检查尸体是否已经检查
                        if( memory[j].name == "body" && memory[j].coordinate.x == bodyCoordinate.x && memory[j].coordinate.y == bodyCoordinate.y ){
                            inMemory = true;
                            break;//该尸体已经检查过了
                        }
                    }
                    if( !inMemory ){//尸体没有检查过
                        interestArr[1].alarm = interestArr[1].alarm = 200;//保持警惕
                        interestArr[1].coordinate = bodyCoordinate;
                        memory.push( deepCopy(interestArr[1]) );
                    }
                } else{
                    interestArr[1].alarm = interestArr[1].alarm - 2 > 0 ? interestArr[1].alarm - 2 : 0;
                }
            }
        }

        //返回目前最感兴趣的事物
        if( interestArr[1].alarm > 150 && interestArr[0].alarm < 100 ){
            return deepCopy(interestArr[1]);
        } else{
            return deepCopy(interestArr[0]);
        }

    };//返回观察到的感兴趣的事物（包括敌人），存在优先级，返回最感兴趣的事物(内容包括，事物名称，坐标，警觉程度)

    var theAIFUNCTION_fire = function(){
        flag[4][1] = 1;//当前系统调用被激活
        var friendlyFire = false;
        var playerCoordinate = thePlayer.get_coordinate();
        var AITable = theAIManager.AITable;
        var A = coordinate.x, B = coordinate.y;

        for( var i=0; i<AITable.length; ++i ){
            if( AITable[i].get_ID() != ID ){
                var a = playerCoordinate.x, b = playerCoordinate.y;
                var x0 = AITable[i].get_coordinate().x, y0 = AITable[i].get_coordinate().y;
                if( (a-A)*(x0-A)+(b-B)*(y0-B) > 0 && (x0-a)*(A-a)+(y0-b)*(B-b) > 0 ){
                    var da = ( a - A ), db = ( b - B );
                    var distance = Math.sqrt( db*x0 - da*y0 + B*da - A*db )/Math.sqrt( db*db + da*da );
                    if( distance < AITable[i].get_size() ){
                        friendlyFire = true;
                    }
                }
            }
        }
        if( friendlyFire == false ){ //不存在队友伤害
            theGun.shoot( coordinate, playerCoordinate ); //射击
            theGun.reload();
        }
    };//射击

    /******************************************************************************************************************/


    /*编译后的行为树会被注入这里***************************************************************************************/
    this.AI_run = function(){
        theAIFUNCTION_mangager();
        var interest = theAIFUNCTION_interestAwareness();//获取感兴趣的事物

        if( interest.alarm <= 100 ){
            theAIFUNCTION_wandering();
        } else if( interest.alarm > 100 && interest.alarm < 200 ){
            if( theAIFUNCTION_attack() ){
                theAIFUNCTION_fire();
            }
        } else{
            theAIFUNCTION_communication();
            if( theAIFUNCTION_attack() ){
                theAIFUNCTION_fire();
            }
        }
    };
    /******************************************************************************************************************/
}

var Player =  AI;

function AIManager() {
    this.AITable = new Array(0);
    this.addAI = function (x, y, id, map, player, AIManager) {
        var newAI = new AI(x, y, id, map, player, AIManager);
        this.AITable.push(newAI);
    };
    this.set_timeParam = function(t){
        for( var i=0; i<this.AITable.length; ++i ){
            this.AITable[i].set_timeParam( t );
            this.AITable[i].get_gun().set_firingRate( t );
        }
    };
}




