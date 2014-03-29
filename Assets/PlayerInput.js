#pragma strict
//输入指令
var upButton : boolean;
var downButton : boolean;
var leftButton : boolean;
var rightButton : boolean;
var firstButton : boolean;
var secondButton : boolean;
var thirdButton : boolean;
var fourthButton : boolean;
//判断时间间隙
private var timer : float;
private var judgeTimer : float = 0.2;
//行走状态
private var walkState : int;
//0,1,2,3 从走到慢走到跑
private var walkStateCache : int;
//运动状态
private var moveState : int;
//当前状态
private var nowState : int;

function Start () {

}

function Update () {

	timer += Time.deltaTime;
	
	//判断移动方向
	if ((leftButton)&&(rightButton)) ;
	else if (leftButton) {
		GetComponent(PlayerBody).SetWalkDirection(false);
		transform.localScale.x = -1;
	}
	else if (rightButton) {
		GetComponent(PlayerBody).SetWalkDirection(true);
		transform.localScale.x = 1;
	}
	
	//根据移动输入设置移动状态
	if ((leftButton)||(rightButton)) {
		if (walkStateCache == 0) walkState = 2;
		else if (walkStateCache == 1) walkState = 12;
		else if (walkStateCache == 2) walkState = 11;
		else walkState = 1;
		timer = 0;
	}
	else {	
		walkStateCache = timer/judgeTimer;
		if (walkStateCache) walkState = 0;
	}
	
	//下蹲或者跳跃状态
	if ((upButton)&&(downButton)) ;
	else if(upButton) {
		switch(walkState) {
		case 0 :
			moveState = 6;
			break;
		case 1:
			moveState = 7;
			break;
		case 11:
			moveState = 8;
			break;
		case 12:
			moveState = 9;
			break;
		case 2:
			moveState = 10;
		}
	}
	else if(downButton) {
		switch(walkState) {
		case 0 :
			moveState = 3;
			break;
		case 1:
		case 11:
		case 12:
			moveState = 4;
			break;
		case 2:
			moveState = 5;
		}
	}
	else moveState = walkState;
	
	nowState = moveState;
	GetComponent(PlayerBody).SetState(nowState);

}