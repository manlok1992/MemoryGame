#pragma strict
public var skin:GUISkin;

var scaleX:float;
var scaleY:float;

function Start () {
	if(!Setting.isSave)
		Setting.ballCount = 4;
	PlayerPrefs.DeleteAll();
	CloneGrid.timer = 0;
	TouchBall.timerArr = new Array();
	Debug.Log("width = "+Screen.width+" height = "+Screen.height);
	scaleX = Screen.width/728;
	scaleY = Screen.height/410;
}

function Update () {

}

function OnGUI() {
	GUI.skin = skin;
	
	GUI.Label(Rect(Screen.width/2-200/2*scaleX, Screen.height/4, 203*scaleX,104*scaleY), "Start Menu");
	
	if(GUI.Button(Rect(Screen.width/2-50*scaleX, Screen.height/2.5, 101*scaleX, 20*scaleY), "Start")) {
		if(!PlayerPrefs.GetString("Name")) {
			Application.LoadLevel(1);
		}
		else {
			Application.LoadLevel(3);
		}
	}
	
	if(GUI.Button(Rect(Screen.width/2-50*scaleX, Screen.height/2, 100*scaleX, 20*scaleY), "Setting")) {
		Application.LoadLevel(2);
	}
	
	if(GUI.Button(Rect(Screen.width/2-50*scaleX, Screen.height/1.65, 100*scaleX, 20*scaleY), "Quit")) {
		Application.Quit();
	}
}