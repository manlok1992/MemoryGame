﻿#pragma strict
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
	if(ConnectDB.requestMsg.Contains("Connect") && !ConnectDB.requestMsg.Contains("Name is already used")) {
		ConnectDB.requestMsg = "";
		Debug.Log("Lose");
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
						CloneGrid.isEnd = true;
						yield WaitForSeconds(3.0f);
						Application.LoadLevel(3);
					}
					break;
				}
			}
			else {
				var wrongCount = 0;
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
					yield WaitForSeconds(3.0f);
					var k = new Array();
					var v = new Array();
					k.Add("Score");
					k.Add("TestName");
					k.Add("Timer");
					var tempScore = score;
					var tempTimer = CloneGrid.timer;
					v.Add(tempScore);
					v.Add(PlayerPrefs.GetString("Name"));
					v.Add(tempTimer);
					CloneGrid.timer = 0;
					isSetScore = true;
					ConnectDB.ConnectURL(k,v);
					score = 0;
				}
			}
		}
	}
}