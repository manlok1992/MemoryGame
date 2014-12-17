#pragma strict
import System.Threading;
static public var url:String = "http://169.254.237.44/MemoryGameScore.php";
static var w:WWW;
static var connectMsg = "";
function Start () {
	
}

function Update () {

}

static function ConnectURL(key:Array, value:Array) {
	var wwwform:WWWForm;
	wwwform = new WWWForm();
	
	for(var i = 0; i < key.Count; i++) {
		wwwform.AddField(key[i].ToString(), value[i].ToString());
	}	
	
	w = new WWW(url, wwwform);
	
	while (!w.isDone && w.error == null)
	{
		Thread.Sleep(500);
		Debug.Log("null");
	    yield null;
	}
	
	yield w;
	
//	if(EnterName.isEnterName || TouchBall.isSetScore) {
//		Application.LoadLevel(3);
//	}
	
	Debug.Log("Connect");
	
	if(w.error != null) {
		Debug.Log("Error: "+w.error);
	}
	else {
		connectMsg = "Connect";
		Debug.Log("Message: "+w.text);
	}
}