#pragma strict
import System.Threading;

static public var url:String = "http://169.254.237.44/MemoryGameScore.php";
static var requestMsg = "";
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
	
	var w:WWW = new WWW(url, wwwform);
	
	while (!w.isDone && w.error == null)
	{
		Thread.Sleep(500);
		Debug.Log("null");
	    yield null;
	}
	
	yield w;
		
	Debug.Log("Connect");
	
	if(w.error != null) {
		Debug.Log("Error: "+w.error);
	}
	else {
		requestMsg = "Connect\n";
		requestMsg += w.text;
		Debug.Log(requestMsg);
		Debug.Log("Message: "+w.text);
	}
}