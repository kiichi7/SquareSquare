var head : Transform;
var foot1 : Transform;
var foot2 : Transform;
//true代表往右走,反之往左
private var walkDirection : boolean;
//上次朝向方向
private var lastDirection : boolean;
//初始高度
private var startHeight : float;
//下面的数组储存运动位置数据
private var actKinds = 15;
//sq = squarePosition
var sq = new Array(actKinds);
//当前行走状态
private var theState : int;
//上次状态
private var lastState : int;
//当前时间
private var theTimePoint : int;
//时间器
private var timer : float;
//时间间隙
private var timeGap : float = 0.2;
//速度
private var moveSpeed : float;
//是否当前需要停下
private var shouldStop : boolean;
//是否跳起上升
private var shouldUp : boolean;
//是否保持上升
private var shouldKeep : boolean;
//动作持续时间
private var actionContinued : float;

function Start () {

	startHeight = transform.position.y;
	for (var i=0;i<actKinds;i++) {
		sq[i] = new Array(3);
		for (var j=0;j<3;j++) {
			sq[i][j] = new Array();
		}
	}
	//静止状态
	sq[0][0].Push(Vector2(0,3));
	sq[0][1].Push(Vector2(0,-2));
	sq[0][2].Push(Vector2(0,-2));
	//散步行走状态
	sq[1][0].Push(Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[1][1].Push(Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2));
	sq[1][2].Push(Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2));
	//偷偷摸摸行走状态
	sq[11][0].Push(Vector2(0,3),Vector2(1,3),Vector2(0,3),Vector2(0,3),Vector2(1,3),Vector2(0,3));
	sq[11][1].Push(Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-1));
	sq[11][2].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-1),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2));
	//行走状态 
	sq[12][0].Push(Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[12][1].Push(Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-1));
	sq[12][2].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-1),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2));
	//小跑状态
	sq[2][0].Push(Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[2][1].Push(Vector2(-2,-1),Vector2(-1,-1),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(-1,-2),Vector2(-2,-2),Vector2(-1,-1));
	sq[2][2].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-2,-2),Vector2(-1,-1),Vector2(-2,-1),Vector2(-1,-1),Vector2(1,-1),Vector2(1,-2));
	//蹲下状态
	sq[3][0].Push(Vector2(0,1));
	sq[3][1].Push(Vector2(0,-2));
	sq[3][2].Push(Vector2(0,-2));
	//小前滚状态
	sq[4][0].Push(Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(0,-1));
	sq[4][1].Push(Vector2(0,-1),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2));
	sq[4][2].Push(Vector2(0,-2),Vector2(0,-1),Vector2(1,-1),Vector2(1,-2));
	/*//大前滚状态
	sq[5][0].Push(Vector2(1,-1),Vector2(1,-2),Vector2(0,-2),Vector2(0,-1));
	sq[5][1].Push(Vector2(0,-1),Vector2(1,-1),Vector2(1,-2),Vector2(0,-2));
	sq[5][2].Push(Vector2(0,-2),Vector2(0,-1),Vector2(1,-1),Vector2(1,-2));*/
	//大前滚状态 废弃大环滚
	sq[5][0].Push(Vector2(1,0),Vector2(1,-2),Vector2(-1,-2),Vector2(-1,0));
	sq[5][1].Push(Vector2(-1,-1),Vector2(0,0),Vector2(1,-1),Vector2(0,-2));
	sq[5][2].Push(Vector2(-1,-2),Vector2(-1,0),Vector2(1,0),Vector2(1,-2));
	//跳跃状态
	sq[6][0].Push(Vector2(0,3),Vector2(0,2),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[6][1].Push(Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2));
	sq[6][2].Push(Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2));
	//小跳状态
	sq[7][0].Push(Vector2(0,3),Vector2(0,2),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[7][1].Push(Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2));
	sq[7][2].Push(Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2),Vector2(0,-2));
	//偷摸跳状态
	sq[8][0].Push(Vector2(0,2),Vector2(0,3),Vector2(0,3),Vector2(1,3),Vector2(1,3),Vector2(0,3),Vector2(0,3));
	sq[8][1].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-2),Vector2(-1,-1),Vector2(-1,-1),Vector2(0,-1),Vector2(1,-2));
	sq[8][2].Push(Vector2(0,-2),Vector2(0,-1),Vector2(0,-1),Vector2(1,-1),Vector2(1,-2),Vector2(1,-2),Vector2(1,-2));
	//中跳状态
	sq[9][0].Push(Vector2(0,2),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[9][1].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-2),Vector2(-1,-1),Vector2(-1,-1),Vector2(0,-1),Vector2(1,-2));
	sq[9][2].Push(Vector2(0,-2),Vector2(0,-1),Vector2(0,-1),Vector2(1,-1),Vector2(1,-2),Vector2(1,-2),Vector2(1,-2));
	//大跳状态
	sq[10][0].Push(Vector2(0,2),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3),Vector2(0,3));
	sq[10][1].Push(Vector2(0,-2),Vector2(-1,-2),Vector2(-1,-2),Vector2(-1,-2),Vector2(-1,-1),Vector2(-1,-1),Vector2(-1,-1),Vector2(0,-1),Vector2(1,-2));
	sq[10][2].Push(Vector2(0,-2),Vector2(0,-1),Vector2(0,-1),Vector2(0,-1),Vector2(1,-1),Vector2(1,-1),Vector2(1,-2),Vector2(1,-2),Vector2(1,-2));
	//下踢
	sq[13][0].Push(Vector2(0,3),Vector2(0,3));
	sq[13][1].Push(Vector2(0,-2),Vector2(0,-2));
	sq[13][2].Push(Vector2(0,-2),Vector2(0,-2));
	
}

function Update () {

	timer += Time.deltaTime;
	
	if ((theState == lastState)||((theState == 2)&&(lastState == 10))||((theState == 10)&&(lastState == 2))) {
		if (lastDirection == walkDirection) actionContinued += Time.deltaTime/2;
		else {
			actionContinued = 0;
		}
	}
	else {
		actionContinued = 0;
		//判断位置给与直接取消攻击前摆,如飞踹等动作
		theTimePoint = 0;
	}
	
	switch(theState) {
		//散步行走状态
		case 1:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = ((theTimePoint == 0)||(theTimePoint == 3)||(theTimePoint == 2)||(theTimePoint == 5));
			moveSpeed = 0.5;
			break;
		//偷偷摸摸行走状态
		case 11:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = ((theTimePoint == 2)||(theTimePoint == 5));
			moveSpeed = 1;
			break;
		//行走状态 
		case 12:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = ((theTimePoint == 2)||(theTimePoint == 5));
			moveSpeed = 1.5;
			break;
		//小跑状态
		case 2:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = false;
			moveSpeed = 1.5 + actionContinued;
			moveSpeed = Mathf.Clamp(moveSpeed,1.5,4);
			break;
		//小前滚状态
		case 4:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = false;
			moveSpeed = 1;
			break;
		//大前滚状态
		case 5:
			shouldUp = false;
			shouldKeep = false;
			shouldStop = false;
			moveSpeed -= 2*Time.deltaTime;
			moveSpeed = Mathf.Clamp(moveSpeed,1,4);
			break;
		//跳跃状态
		case 6:
			shouldUp = ((theTimePoint == 2)||(theTimePoint == 3));
			shouldKeep = false;
			shouldStop = true;
			moveSpeed = 1;
			break;
		//小跳跳状态
		case 7:
			shouldUp = ((theTimePoint == 2)||(theTimePoint == 3));
			shouldKeep = false;
			shouldStop = ((theTimePoint == 0)||(theTimePoint == 1)||(theTimePoint == 5));
			moveSpeed = 1;
			break;
		//偷摸状态
		case 8:
			shouldUp = ((theTimePoint == 1)||(theTimePoint == 2));
			shouldKeep = (theTimePoint == 3);
			shouldStop = false;
			moveSpeed = 1;
			break;
		//中跳状态
		case 9:
			shouldUp = ((theTimePoint == 1)||(theTimePoint == 2));
			shouldKeep = (theTimePoint == 3);
			shouldStop = false;
			moveSpeed = 1.5;
			break;
		//大跳状态
		case 10:
			shouldUp = ((theTimePoint == 1)||(theTimePoint == 2)||(theTimePoint == 3));
			shouldKeep = (theTimePoint == 4);
			shouldStop = false;
			moveSpeed = 1.5 + actionContinued;
			moveSpeed = Mathf.Clamp(moveSpeed,1.5,4);
			break;
		//静止与蹲下状态
		default:
			shouldUp = false;
			shouldKeep = false;
			moveSpeed = 1;
			shouldStop = true;
	}
	

	if (timer > timeGap/moveSpeed) {
		theTimePoint++;
		theTimePoint = theTimePoint%sq[theState][0].length;
		if (shouldUp) JumpUp();
		else if (!shouldKeep) Fall();
		if (!shouldStop) {
			if (walkDirection) transform.localPosition.x++;
			else transform.localPosition.x--;
		}
		timer = 0;
	}
	
	//位置限定
	transform.localPosition.x = Mathf.Clamp(transform.localPosition.x,-43,43);
	
	//位置输出
	head.localPosition.x = sq[theState][0][theTimePoint].x;
	head.localPosition.y = sq[theState][0][theTimePoint].y;
	foot1.localPosition.x = sq[theState][1][theTimePoint].x;
	foot1.localPosition.y = sq[theState][1][theTimePoint].y;
	foot2.localPosition.x = sq[theState][2][theTimePoint].x;
	foot2.localPosition.y = sq[theState][2][theTimePoint].y;
	
	lastState = theState;
	lastDirection = walkDirection;
	
}

function SetState (theValue : int) {

	theState = theValue;
	theTimePoint = theTimePoint%sq[theState][0].length;	

}

function SetWalkDirection (theValue : boolean) {

	walkDirection = theValue;

}

function JumpUp () {

	transform.position.y ++;

}

function Fall () {

	if (transform.position.y > startHeight) transform.position.y--;
	
}