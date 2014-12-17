#pragma strict
public var skin:GUISkin;

function Start () {
	if(!Setting.isSave)
		Setting.ballCount = 4;
		PlayerPrefs.DeleteAll();
}

function Update () {

}

function OnGUI() {
	GUI.skin = skin;
	
	GUI.Label(Rect(Screen.width/2-200/2, Screen.height/4, Screen.width/3.58,Screen.height/4.03), "Start Menu");
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/2.5, Screen.width/7.16, Screen.height/20.15), "Start")) {
		if(!PlayerPrefs.GetString("Name")) {
			Application.LoadLevel(1);
		}
		else {
			Application.LoadLevel(3);
		}
	}
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/2, Screen.width/7.16, Screen.height/20.15), "Setting")) {
		Application.LoadLevel(2);
	}
	
	if(GUI.Button(Rect(Screen.width/2-50, Screen.height/1.65, Screen.width/7.16, Screen.height/20.15), "Quit")) {
		Application.Quit();
	}
}