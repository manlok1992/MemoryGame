#pragma strict

function EnterName() {
	if(!PlayerPrefs.GetString("Name")) {
		Application.LoadLevel(1);
	}
	else {
		Application.LoadLevel(3);
	}
}

function Setting() {
	Application.LoadLevel(2);
}

function Quit() {
	Application.Quit();
}

function Start () {

}

function Update () {

}