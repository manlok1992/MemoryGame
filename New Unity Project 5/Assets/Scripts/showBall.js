#pragma strict

var rand :Array;

var idClass:id;

var tempID:int;

var ids:int[] = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 ];

function Start () {
	var arr1:CloneGrid = GameObject.Find("GameObject").GetComponent(CloneGrid);
	rand = arr1.randomedNumArr;
}

function Update () {
	for(var i = 0; i < rand.Count; i++) {
		idClass = gameObject.GetComponent("id");
		tempID = idClass._id;
		var temp = rand[i];
		Debug.Log(temp+" "+tempID);
		if(temp == tempID) {
			Debug.Log("==");
			gameObject.transform.FindChild("Pic").active = true;
		}
	}
}