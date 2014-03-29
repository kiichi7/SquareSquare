#pragma strict
private var thePlayerInput : PlayerInput;

function Start () {
	
	thePlayerInput = GetComponent(PlayerInput);

}

function Update () {

	thePlayerInput.upButton = Input.GetKey(KeyCode.UpArrow);
	thePlayerInput.downButton = Input.GetKey(KeyCode.DownArrow);
	thePlayerInput.leftButton = Input.GetKey(KeyCode.LeftArrow);
	thePlayerInput.rightButton = Input.GetKey(KeyCode.RightArrow);
	thePlayerInput.firstButton = Input.GetKey(KeyCode.Keypad8);
	thePlayerInput.secondButton = Input.GetKey(KeyCode.Keypad5);
	thePlayerInput.thirdButton = Input.GetKey(KeyCode.Keypad4);
	thePlayerInput.fourthButton = Input.GetKey(KeyCode.Keypad6);

}