function Obj(x,y,s){
    /*私有属性*********************************************************************************************************/
    var coordinate = { "x":x, "y":y };
    var size = s;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性********************************************************************************************/
    this.get_coordinate = function() { return deepCopy( coordinate ); };
    this.get_size = function() { return size; };
    /******************************************************************************************************************/

    this.intersection_detect = function( begin, end ){//相交判断
        var up = y+size/2, down = y-size/2, right = x+size/2, left = x-size/2;

        //线段所在直线和节点四条边所在直线的四个交点
        var p_up = {}, p_down = {}, p_right = {}, p_left = {};

        //Ax + By + C = 0
        var A = end.y-begin.y, B = begin.x - end.x, C = end.x*begin.y - begin.x*end.y;
        if(A!=0){
            p_up.x = (up*B+C)/-A; p_up.y = up;
            p_down.x = (down*B+C)/-A; p_down.y = down;
        }

        if(B!=0){
            p_left.x = left; p_left.y = (left*A+C)/-B;
            p_right.x = right; p_right.y = (right*A+C)/-B;
        }


        var intersectionPoint = {};
        var sig=9999, exist = 0, temp;
        if(A!=0 && p_up.x>left && p_up.x<right){//交点p_up在线段up内
            if(p_up.y>begin.y&&p_up.y<end.y || p_up.y>end.y&&p_up.y<begin.y){
                exist = 1;
                temp = Math.sqrt((begin.x-p_up.x)*(begin.x-p_up.x)+(begin.y-p_up.y)*(begin.y-p_up.y));
                if(temp<sig){
                    sig = temp;
                    intersectionPoint.x = p_up.x;
                    intersectionPoint.y = p_up.y;
                }
            }
        }
        if( A!=0 && p_down.x>left && p_down.x<right ){//交点p_down在线段down内
            if(p_down.y>begin.y&&p_down.y<end.y || p_down.y>end.y&&p_down.y<begin.y){
                exist = 1;
                temp = Math.sqrt((begin.x-p_down.x)*(begin.x-p_down.x)+(begin.y-p_down.y)*(begin.y-p_down.y));
                if(temp<sig){
                    sig = temp;
                    intersectionPoint.x = p_down.x;
                    intersectionPoint.y = p_down.y;
                }
            }

        }
        if(B!=0 && p_right.y>down && p_right.y<up){//交点p_right在线段right内
            if(p_right.x>begin.x&&p_right.x<end.x || p_right.x>end.x&&p_right.x<begin.x){
                exist = 1;
                temp = Math.sqrt((begin.x-p_right.x)*(begin.x-p_right.x)+(begin.y-p_right.y)*(begin.y-p_right.y));
                if(temp<sig){
                    sig = temp;
                    intersectionPoint.x = p_right.x;
                    intersectionPoint.y = p_right.y;
                }
            }
        }
        if( B!=0 && p_left.y>down && p_left.y<up ){//交点p_right在线段right内
            if( p_left.x>begin.x&&p_left.x<end.x || p_left.x>end.x&&p_left.x<begin.x ){
                exist = 1;
                temp = Math.sqrt((begin.x-p_left.x)*(begin.x-p_left.x)+(begin.y-p_left.y)*(begin.y-p_left.y));
                if(temp<sig){
                    sig = temp;
                    intersectionPoint.x = p_left.x;
                    intersectionPoint.y = p_left.y;
                }
            }
        }

        if( exist == 1 ){
            return { point:intersectionPoint, sig: sig };
        } else{
            return false;
        }
    };

    this.collision_detection = function( point ){//碰撞检测
        var up = y+size/2, down = y-size/2, right = x+size/2, left = x-size/2;
        if( point.y>down && point.y<up && point.x>left && point.x<right ){
            return coordinate;//返回碰撞的object位置
        } else{
            return false;
        }
    };
}

/*子弹对象**************************************************************************************************************
控制子弹运动
***********************************************************************************************************************/
function Bullet( start, end, h ){
    /*私有属性*********************************************************************************************************/
    var begin = { x:start.x, y:start.y };
    var target = { x:end.x, y:end.y };
    var nowPos = { x:begin.x, y:begin.y }; //子弹当前位置
    var harm = h; //子弹伤害
    //var belongTo = owner;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性*******************************************************************************************/
    this.set_bulletState = function( bulletState ){
        begin = bulletState.begin;
        target = bulletState.target;
        nowPos = bulletState.nowPos;
        harm = bulletState.harm;
    };
    this.get_bulletState = function(){
        var bulletState = {};
        bulletState.begin = deepCopy(begin);
        bulletState.target = deepCopy(target);
        bulletState.nowPos = deepCopy(nowPos);
        bulletState.harm = harm;
        return bulletState;
    };
    this.get_nowPos = function() { return nowPos; };
    this.get_direction = function() { return { x: target.x-begin.x, y: target.y-begin.y } };
    this.set_direction = function( start, end ) {
        begin.x = start.x; begin.y = start.y;
        target.x = end.x; target.y = end.y;
    };
    this.get_harm = function() { return harm; };
    /******************************************************************************************************************/

    this.bulletMoving = function(t) { //控制子弹运动
        nowPos.x = nowPos.x + ( target.x-begin.x ) / (t*5*distance(target,begin));
        nowPos.y = nowPos.y + ( target.y-begin.y ) / (t*5*distance(target,begin));
    }
}

/*枪支对象**************************************************************************************************************
***********************************************************************************************************************/
function Gun( t, fR, h, bulletManager ){
    /*依赖对象*********************************************************************************************************/
    var theBulletManager = bulletManager;

    /*私有属性*********************************************************************************************************/
    var type = t;
    var firingRate = fR;
    var std_fr = fR;
    var firingCount = fR;
    var harm = h;
    //var timeParam = 1;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性*******************************************************************************************/
    this.get_type = function() { return type; };
    this.get_firingRate = function() { return firingRate; };
    this.set_firingRate = function(t) { firingRate = t * std_fr; };
    this.get_harm = function() { return harm; };
    /******************************************************************************************************************/

    this.reload = function(){
        if( firingCount < firingRate ){
            ++firingCount;
        }
    };
    this.shoot = function(  muzzle, enemyCoordinate ) {

        var gunStates = "";
        if( firingCount >= firingRate ){ //根据枪支的射速，可以射击
            firingCount = 0;
            //生成弹道
            var begin = { x: muzzle.x, y: muzzle.y };
            var end = { x: enemyCoordinate.x, y: enemyCoordinate.y };
            var target = { x: end.x+(Math.random()-0.5)*0.05, y: end.y+(Math.random()-0.5)*0.05 }; //弹道扰动

            theBulletManager.add_bullets( begin, target, harm ); //射击
            gunStates = "shot_success";

        } else{
            gunStates = "not_ready";
        }
        return gunStates;
    }
}

function BulletManager( AIManager, map, player ){
    /*依赖对象*********************************************************************************************************/
    var theAIManager = AIManager;
    var theMap = map;
    var thePlayer = player;
    /*私有属性*********************************************************************************************************/
    var bullets = new Array(0);
    var timeParam = 1;
    /******************************************************************************************************************/

    /*对外接口，访问私有属性*******************************************************************************************/
    this.get_bullets = function() { return bullets };
    this.add_bullets = function( begin, target, h ) {
        var bullet = new Bullet( begin, target, h );
        bullets.push( bullet );
    };
    this.clear_bullets = function(){ bullets = []; };
    this.set_timeParam = function(t) { timeParam = t; };
    /******************************************************************************************************************/
    this.bulletsMoving = function(){
        for( var i=0; i<bullets.length; ++i ){
            bullets[i].bulletMoving(timeParam);
        }
    };
    /******************************************************************************************************************
     * 检测每个子弹是否碰撞到障碍物
     */
    this.bulletCollision = function(){
        var AITable = theAIManager.AITable;

        var quadTree = theMap.get_quadTree();
        var i,j;
        //检测是否和player相碰
        for( i=0; i<bullets.length; ++i ){
            var bullet_player_dir = {
                x: thePlayer.get_coordinate().x-bullets[i].get_nowPos().x,
                y: thePlayer.get_coordinate().y-bullets[i].get_nowPos().y
            };
            if( dotProduct( bullets[i].get_direction(), bullet_player_dir ) > 0 ){
                if( distance(thePlayer.get_coordinate(), bullets[i].get_nowPos())<=thePlayer.get_size()){
                    thePlayer.decrease_life( bullets[i].get_harm() );//减血
                    bullets.splice( i, 1 );//删除这个子弹
                    --i;
                }
            }
        }

        //监测是否和AI相碰
        for( i=0; i<AITable.length; ++i ){
            for( j=0; j<bullets.length; ++j ){
                var bullet_AI_dir = {
                    x: AITable[i].get_coordinate().x-bullets[j].get_nowPos().x,
                    y: AITable[i].get_coordinate().y-bullets[j].get_nowPos().y
                };
                if( dotProduct( bullets[j].get_direction(), bullet_AI_dir ) > 0 ){
                    if( distance(AITable[i].get_coordinate(), bullets[j].get_nowPos()) < AITable[i].get_size() ){
                        AITable[i].decrease_life( bullets[j].get_harm() );
                        bullets.splice( j, 1 );//删除这个子弹
                        --j;
                    }
                }

            }
        }

        //检测是否和object相碰
        for( i=0; i<bullets.length; ++i ){

            var offendPoint = {x:bullets[i].get_nowPos().x, y:bullets[i].get_nowPos().y};
            var quadTreeNode = quadTree;
            var exceed = 0;
            while(quadTreeNode.leaveNum == 4 && exceed == 0){
                var find_grid = 0;
                for( j=0; j<4; ++j ){
                    if(quadTreeNode.children[j].up>=offendPoint.y && quadTreeNode.children[j].down<=offendPoint.y && quadTreeNode.children[j].right>=offendPoint.x && quadTreeNode.children[j].left<=offendPoint.x){
                        quadTreeNode = quadTreeNode.children[j];
                        find_grid = 1;
                        break;
                    }
                }
                if( find_grid == 0 ){
                    exceed = 1;
                    bullets.splice( i, 1 );//删除这个子弹
                    --i;
                }
            }
            if(exceed == 0){
                if(quadTreeNode.obj != false){
                    if( quadTreeNode.obj.collision_detection(offendPoint) ){
                        bullets.splice( i, 1 );//删除这个子弹
                        --i;
                    }
                }
            }

        }
    };
}