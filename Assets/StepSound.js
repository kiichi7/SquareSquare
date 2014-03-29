#pragma strict
private var lastPositionY : int;

function Start () {

	lastPositionY = transform.position.y;

}

function Update () {

	if ((transform.position.y != lastPositionY)&&(transform.position.y == -4)) {
		audio.Play();
	}
	lastPositionY = transform.position.y;

}