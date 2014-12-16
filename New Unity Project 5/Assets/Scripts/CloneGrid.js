#pragma strict
import System.Collections.Generic;

public var prefab:GameObject;

var listGrid = new List.<GameObject>(); 

public var isRand = false;

public var randomCount:int;

public var randomedNumArr:Array;

static var roundCount:int;

public var speed:float;

public var isDebug:boolean;

public var shuffleArr:Array;

function Awake() {
	speed = 1.0f;
	roundCount++;
	if(roundCount % 5 == 0)
		speed -= roundCount/5*0.05;
	else if(roundCount % 10 == 0)
		speed = 0.3f;
}

function Start () {
	randomedNumArr = new Array();
	shuffleArr = new Array();
	randomCount = Setting.ballCount;
	for(var k = 0; k < 16; k++) {
		shuffleArr.Add(k);
	}
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
}

function Update () {
	Shuffle(shuffleArr);
	setShuffleArray();
}

function Shuffle(a:Array)
{
	// Loops through array
	for (var i = a.Count-1; i > 0; i--)
	{
		// Randomize a number between 0 and i (so that the range decreases each time)
		var rnd = Random.Range(0,i);
		
		// Save the value of the current i, otherwise it'll overright when we swap the values
		var temp = a[i];
		
		// Swap the new and old values
		a[i] = a[rnd];
		a[rnd] = temp;
	}
	
	for(var j = 0; j < a.Count; j++) {
		Debug.Log(a[j]);	
	}
}

function setShuffleArray() {
	if(!isRand) { 
		isRand = true;
		for(var j = 0; j < randomCount; j++) {
			randomedNumArr.Add(shuffleArr[j]);
			TouchBall.ballIndex[j] = shuffleArr[j];
		}
	}
	ShowBall();
}

function ShowBall() {
	if(randomedNumArr.Count == Setting.ballCount) {
		for(var i = 0; i < randomedNumArr.Count;) {	
			listGrid[randomedNumArr[i]].transform.FindChild("Pic").active = true;
			yield WaitForSeconds(speed);
			var temp = randomedNumArr[i];
			var sprite = listGrid[temp].transform.FindChild("Pic").GetComponent(SpriteRenderer);
			if(sprite.sortingOrder != 0 && sprite.sortingOrder != 2)
				sprite.sortingOrder = -1;
			i++;
			if(i == Setting.ballCount) {
				for(var g:GameObject in listGrid) {
					g.collider2D.enabled = true;			
				}
			}
		}
	}
}