#pragma strict

public var skin:GUISkin;
static var ballCountLabel:String = "";
static var ballCount:int;
static var isSave = false;

function Awake() {
	ballCount = 0;
}

function Start () {

}

function Update () {
	if(ballCountLabel.Length > 0)
		ballCount = int.Parse(ballCountLabel);
}

function OnGUI() {
//	GUI.skin = skin;
	GUI.Label(Rect(Screen.width/2, Screen.height/4, 200,100), "Setting");
	GUI.Label(Rect(Screen.width/2.5, Screen.height/3, 100,100), "Ball Count");
	ballCountLabel = GUI.TextField(Rect(Screen.width/2, Screen.height/3, 50,20), ballCountLabel, 2);
	if(GUI.Button(Rect(Screen.width/2.2, Screen.height/2.5, 100,30), "Save & Quit")) {
		if(ballCount >= 4 && ballCount <= 16) {
			Application.LoadLevel(0);
			isSave = true;
		}
		else {
		}
	}
}