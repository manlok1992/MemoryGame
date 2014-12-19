#pragma strict
import System.Collections.Generic;
import UnityEngine.UI;

public var prefab:GameObject;

var listGrid = new List.<GameObject>(); 

public var isRand = false;

public var randomCount:int;

public var randomedNumArr:Array;

static var roundCount:int;

public var speed:float;

public var isDebug:boolean;

public var shuffleArr:Array;

static public var timer:float;

static public var isEnd = false;

var isSend = false;

public var sprite:Sprite[];

function Awake() {
	speed = 1.0f;
	roundCount++;
	if(roundCount % 5 == 0)
		speed -= roundCount/5*0.05;
	if(roundCount % 10 == 0)
		speed = 0.3f;
	if(roundCount % 10 == 1) {
		speed = 1.0-(roundCount/5*0.05);
	}
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
			var g = GameObject.Instantiate(prefab, Vector2(-3+(2*i), -4+(2*j)), Quaternion.identity);
			g.AddComponent("TouchBall");
			listGrid.Add(g);
			if(ChooseImage.imageName == "Ball")
				g.transform.FindChild("Pic").GetComponent(SpriteRenderer).sprite = sprite[0];
			else if(ChooseImage.imageName == "Jonathan")
				g.transform.FindChild("Pic").GetComponent(SpriteRenderer).sprite = sprite[1];
			else 
				g.transform.FindChild("Pic").GetComponent(SpriteRenderer).sprite = sprite[0];
			var touchBall = g.GetComponent(TouchBall);
			var index = listGrid.FindIndex(function(go:GameObject) go == g);
			touchBall.touchIndex = index;
		}
	}
	GameObject.Find("CountDown").GetComponent(Text).text = "10.000000";
	isEnd = false;
}

function Update () {
	Shuffle(shuffleArr);
	setShuffleArray();
	if(10-timer < 0) {
		GameObject.Find("Message").GetComponent(Text).text = "Times Up";
		if(isSend == false) {
			isSend = true;
			var k = new Array();
			var v = new Array();
			k.Add("Score");
			k.Add("TestName");
			k.Add("Timer");
			var tempScore = TouchBall.score;
			var tempTimer = 0;
			v.Add(tempScore);
			v.Add(PlayerPrefs.GetString("Name"));
			v.Add(tempTimer);
			TouchBall.timerArr.Add(CloneGrid.timer);
				for(var t:float in TouchBall.timerArr) {
					tempTimer += t;
				}
			ConnectDB.ConnectURL(k,v);
			TimesUp();
		}
		for(var temp:GameObject in listGrid) {
			if(temp.active == true) {
				temp.active = false;
			}
		}
	}
}

function TimesUp() {
	yield WaitForSeconds(1.0f);
	Application.LoadLevel(0);
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
	
//	for(var j = 0; j < a.Count; j++) {
//		Debug.Log(a[j]);	
//	}
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
				if(!CloneGrid.isEnd) {
					timer += Time.deltaTime;
					if(timer < 10)
						GameObject.Find("CountDown").GetComponent(Text).text = (10-timer).ToString();
					else 
						GameObject.Find("CountDown").GetComponent(Text).text = "0";
				}
				for(var g:GameObject in listGrid) {
					g.collider2D.enabled = true;			
				}
			}
		}
	}
}