#pragma strict
import System.Collections.Generic;

public var prefab:GameObject;

var listGrid = new List.<GameObject>(); 

public var isRand = false;

public var randomCount:int;

public var randomedNumArr:Array;

function Start () {
	randomedNumArr = new Array();
	randomCount = 4;
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var g = GameObject.Instantiate(prefab, Vector2(-2.5+(2*i), -2.5+(2*j)), Quaternion.identity);
			g.AddComponent("TouchBall");
			listGrid.Add(g);
			var touchBall = g.GetComponent(TouchBall);
			var index = listGrid.FindIndex(function(go:GameObject) go == g);
			touchBall.touchIndex = index;
		}
	}
	for(var temp:GameObject in listGrid) {
		temp.transform.FindChild("Pic").active = false;
	}
}

function Update () {
	shuffle();
}

function shuffle() {
	if(!isRand) { 
		isRand = true;
		var tempRand:int; 
		for(var i = 0; i < randomCount; i++) {
			var rand = Random.Range(0, listGrid.Count);
			for(var tempRanNum:int in randomedNumArr) {
				while(rand == tempRanNum) {
					rand = Random.Range(0, listGrid.Count);
				}	
			}
			randomedNumArr.Add(rand);
			TouchBall.ballIndex[i] = rand;
		}
	}
	ShowBall();
}

function ShowBall() {
	if(randomedNumArr.Count == 4) {
		for(var i = 0; i < randomedNumArr.Count;) {
			listGrid[randomedNumArr[i]].transform.FindChild("Pic").active = true;
			yield new WaitForSeconds(0.8f);
			i++;
		}
	}
}