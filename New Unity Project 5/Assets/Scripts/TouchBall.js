#pragma strict
static public var ballIndex:int[] = [0,0,0,0];

public var touchIndex:int;

static var touchIndexArr:Array;

function Start () {
	touchIndexArr = new Array();
}

function Update () {

}

function OnMouseDown() {
	for(var i = 0; i < 4; i++) {
		if(ballIndex[i] != -1) {
			if(ballIndex[i] == touchIndex) {
				Debug.Log("Correct");
				ballIndex[i] = -1;
				gameObject.transform.FindChild("Pic").GetComponent(SpriteRenderer).sortingOrder = 2;
				touchIndexArr.Add(touchIndex);
				break;
			}
			else {
				var wrongCount = 0;
				for(var temp in touchIndexArr) {
					if(temp != touchIndex) {
						wrongCount++;
					}
				}
				if(wrongCount == touchIndexArr.Count) {
					Debug.Log("Wrong");
				}
			}
		}
	}
}