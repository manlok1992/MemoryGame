#pragma strict
import UnityEngine.UI;

static public var ballIndex:int[];

public var touchIndex:int;

static var touchIndexArr:Array;

static var k = 0;

static var nowCount:int;

static var rightCount:int;

public var tempIndex:int[];

static var isCorrect:boolean;

static var isWrong:boolean;

static var score:int = 0;

static var isSetScore = false;

var option;

var wrongCount = 0;

static var timerArr:Array;

function Awake() {
	nowCount = 0;
	rightCount = 0;
	k = 0;
	touchIndexArr = new Array();
	tempIndex = new int[Setting.ballCount];
	isCorrect = false;
	isWrong = false;
	ballIndex = new int[Setting.ballCount];
}

function Start () {

}

function Update () {
	nowCount = ballIndex[k];
	for(var i = 0; i < tempIndex.Length; i++) {
		tempIndex[i] = ballIndex[i];
	}
	GameOver();
}

function GameOver() {
	if(ConnectDB.requestMsg.Contains("Connect") && !ConnectDB.requestMsg.Contains("Name is already used")) {
		ConnectDB.requestMsg = "";
		yield WaitForSeconds(1.0f);
		Application.LoadLevel(0);
	}
}

function OnMouseDown() {
	for(var i = 0; i < Setting.ballCount; i++) {
		if(ballIndex[i] != -1) {
			if(ballIndex[i] == touchIndex) {
				if(touchIndex == nowCount) {
					if(k < Setting.ballCount-1)
						k++;
					ballIndex[i] = -1;
					gameObject.transform.FindChild("Pic").GetComponent(SpriteRenderer).sortingOrder = 2;
					touchIndexArr.Add(touchIndex);
					
					rightCount++;
					isCorrect = true;
					score += 10;
					if(rightCount == Setting.ballCount) {
						GameObject.Find("Text").GetComponent(Text).text = "Correct";
						timerArr.Add(CloneGrid.timer);
						CloneGrid.timer = 0;
						CloneGrid.isEnd = true;
						yield WaitForSeconds(1.0f);
						Application.LoadLevel(3);
					}
					break;
				}
			}
			else {
				for(var temp in touchIndexArr) {
					if(temp != touchIndex) {
						wrongCount++;
					}
				}
				if(wrongCount == touchIndexArr.Count) {
					GameObject.Find("Text").GetComponent(Text).text = "GameOver";
					CloneGrid.roundCount = 0;
					isWrong = true;
					CloneGrid.isEnd = true;
					var k:Array = new Array();
					var v:Array = new Array();
					k.Add("Score");
					k.Add("TestName");
					k.Add("Timer");
					var tempScore = score;
					var tempTimer:float = 0;
					v.Add(tempScore);
					v.Add(PlayerPrefs.GetString("Name"));
					timerArr.Add(CloneGrid.timer);
					for(var t:float in timerArr) {
						tempTimer += t;
					}
					v.Add(tempTimer);
				 	ConnectDB.ConnectURL(k,v);
					CloneGrid.timer = 0;
					isSetScore = true;
					score = 0;
					for(var g:GameObject in GameObject.FindGameObjectsWithTag("Grid")) {
						g.GetComponent(SpriteRenderer).enabled = false;
						g.GetComponent(BoxCollider2D).enabled = false;
						g.transform.FindChild("Pic").active = false;
						g.transform.FindChild("Pic").GetComponent(SpriteRenderer).enabled = false;
					}
				}
			}
		}
	}
}