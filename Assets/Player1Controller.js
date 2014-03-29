#pragma strict
private var thePlayerInput : PlayerInput;

function Start () {
	
	thePlayerInput = GetComponent(PlayerInput);

}

function Update () {

	thePlayerInput.upButton = Input.GetKey(KeyCode.W);
	thePlayerInput.downButton = Input.GetKey(KeyCode.S);
	thePlayerInput.leftButton = Input.GetKey(KeyCode.A);
	thePlayerInput.rightButton = Input.GetKey(KeyCode.D);
	thePlayerInput.firstButton = Input.GetKey(KeyCode.Y);
	thePlayerInput.secondButton = Input.GetKey(KeyCode.H);
	thePlayerInput.thirdButton = Input.GetKey(KeyCode.G);
	thePlayerInput.fourthButton = Input.GetKey(KeyCode.J);

}