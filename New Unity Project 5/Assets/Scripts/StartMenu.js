#pragma strict
public var skin:GUISkin;

function Start () {
	if(!Setting.isSave)
		Setting.ballCount = 4;
}

function Update () {

}

function OnGUI() {
	GUI.skin = skin;
	GUI.Label(Rect(Screen.width/2-200/2, Screen.height/4, 200,100), "Start Menu");
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/2.5, 100, 20), "Start")) {
		Application.LoadLevel(2);
	}
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/2, 100, 20), "Setting")) {
		Application.LoadLevel(1);
	}
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/1.65, 100, 20), "Quit")) {
		Application.Quit();
	}
}