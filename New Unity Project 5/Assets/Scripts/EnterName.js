#pragma strict

static var playerName:String = "";
static var isEnterName = false;
var option;
function Start () {
	
}

function Update () {
	if(ConnectDB.requestMsg.Contains("Connect") && !ConnectDB.requestMsg.Contains("Name is already used")) {
		ConnectDB.requestMsg = "";
		Application.LoadLevel(3);
	}
	else if(ConnectDB.requestMsg.Contains("Name is already used")) {
		if(option == null) {
		#if UNITY_EDITOR
			option = UnityEditor.EditorUtility.DisplayDialog("Name is already used", "Name is already used", "OK");
		#endif
			ConnectDB.requestMsg = "";
		}
	}
}

function OnGUI() {
	GUI.Label(Rect(Screen.width/2-100, Screen.height/4, Screen.width/3.58,Screen.height/4.03), "Enter Name");
	playerName = GUI.TextField(Rect(Screen.width/2, Screen.height/4-10, Screen.width/4.03,40), playerName, 50);
	if(GUI.Button(Rect(Screen.width/2, Screen.height/2.5, Screen.width/7.16,Screen.height/4.03), "Next")) {
		var k = new Array();
		var v = new Array();
		k.Add("Name");
		v.Add(playerName);
		PlayerPrefs.SetString("Name", playerName);
		isEnterName = true;
		ConnectDB.ConnectURL(k,v);
	}
}