#pragma strict

static var imageName = "";

function Start () {
	GameObject.Find("Ball").transform.FindChild("Base").active = true;
}

function Update () {

}

function OnMouseDown() {
	if(gameObject.name == "Ball") {
		imageName = "Ball";
		GameObject.Find("Ball").transform.FindChild("Base").active = true;
		GameObject.Find("Jonathan").transform.FindChild("Base").active = false;
	}
	else if(gameObject.name == "Jonathan") {
		imageName = "Jonathan";
		GameObject.Find("Ball").transform.FindChild("Base").active = false;
		GameObject.Find("Jonathan").transform.FindChild("Base").active = true;
	}
}