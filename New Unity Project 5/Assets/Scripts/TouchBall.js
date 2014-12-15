#pragma strict
import UnityEngine.UI;

static public var ballIndex:int[] = [0,0,0,0];

public var touchIndex:int;

static var touchIndexArr:Array;

static var k = 0;

static var nowCount:int;

static var rightCount:int;

public var tempIndex:int[];

static var isCorrect:boolean;

static var isWrong:boolean;

function Awake() {
	nowCount = 0;
	rightCount = 0;
	k = 0;
	touchIndexArr = new Array();
	tempIndex = new int[4];
	isCorrect = false;
	isWrong = false;
}

function Start () {

}

function Update () {
	nowCount = ballIndex[k];
	for(var i = 0; i < 4; i++) {
		tempIndex[i] = ballIndex[i];
	}
}

function OnMouseDown() {
	for(var i = 0; i < 4; i++) {
		if(ballIndex[i] != -1) {
			Debug.Log("before i = "+i);
			if(ballIndex[i] == touchIndex) {
				if(touchIndex == nowCount) {
					if(k < 3)
						k++;
					ballIndex[i] = -1;
					gameObject.transform.FindChild("Pic").GetComponent(SpriteRenderer).sortingOrder = 2;
					touchIndexArr.Add(touchIndex);
					
					rightCount++;
					isCorrect = true;
					if(rightCount == 4) {
						GameObject.Find("Text").GetComponent(Text).text = "Correct";
						yield WaitForSeconds(3.0f);
						Application.LoadLevel(0);
					}
					break;
				}
			}
			else {
				Debug.Log("i = "+i);
				Debug.Log("ballIndex[i] = "+ballIndex[i]+" index = "+touchIndex);
				var wrongCount = 0;
				for(var temp in touchIndexArr) {
					if(temp != touchIndex) {
						wrongCount++;
					}
				}
				if(wrongCount == touchIndexArr.Count) {
					GameObject.Find("Text").GetComponent(Text).text = "Wrong";
					CloneGrid.roundCount = 0;
					isWrong = true;
					yield WaitForSeconds(3.0f);
					Application.LoadLevel(0);
				}
			}
		}
	}
}