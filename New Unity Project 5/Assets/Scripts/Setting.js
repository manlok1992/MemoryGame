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
	GUI.Label(Rect(Screen.width/2, Screen.height/4, Screen.width/3.58,Screen.height/4.03), "Setting");
	GUI.Label(Rect(Screen.width/2.5, Screen.height/3, Screen.width/4.03,Screen.height/4.03), "Ball Count");
	ballCountLabel = GUI.TextField(Rect(Screen.width/2, Screen.height/3, Screen.height/14.32,Screen.height/20.15), ballCountLabel, 2);
	if(GUI.Button(Rect(Screen.width/2.2, Screen.height/2.5, Screen.width/4.03,Screen.height/13.4), "Save & Quit")) {
		if(ballCount >= 4 && ballCount <= 16) {
			Application.LoadLevel(0);
			isSave = true;
		}
		else {
		}
	}
}