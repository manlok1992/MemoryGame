<?php
	$host = '127.0.0.1';
	$user = 'manlok';
	$pass = '123456';
	$dbName = "MemoryGame";

	$conn = mysql_connect($host, $user, $pass) or die('Connect Host Error');

	mysql_select_db($dbName) or die("Can\'t use test_db : " . mysql_error());
	$result4 = [];
	$result = [];
	$name = "";
	$testName = "";
	$timer = "";
	$query2 = "";
	$query4 = "";
	if(!empty($_POST["Name"])) {
		$name = $_POST["Name"];
	}
	checkName($name);
	if(!empty($_POST["TestName"])) {
		$testName = $_POST["TestName"];
	}
	if(!empty($_POST["Timer"])) {
		$timer = $_POST["Timer"];
		echo $timer;
	}

	if($timer) {
		$sql6 = "UPDATE Score SET Timer = $timer where Name = '$testName'";
		$query6 = mysql_query($sql6);
	}

	if($testName) {
		$sql2 = "Select Score from Score where Name = '$testName'";
		$sql4 = "Select HighScore from Score where Name = '$testName'";

		$query2 = mysql_query($sql2);
		$query4 = mysql_query($sql4);
	}

	if($query2) {
		$result = mysql_fetch_row($query2);
	}
	if($query4) {
		$result4 = mysql_fetch_row($query4);
	}

	if(!empty($_POST["Score"])) {
		$score = $_POST["Score"];
		if($result4) {
			if($result4[0] < $score) {
				$sql3 = "UPDATE Score SET HighScore = $score where Name = '$testName'";
				$query3 = mysql_query($sql3);
				echo "update high score\n";
			}
		}
		if($result) {
			$score += $result[0];
		}
		echo "score: $score\n";
		$sql1 = "UPDATE Score SET Score = $score where Name = '$testName'";
		$query1 = mysql_query($sql1);
		echo "update score\n";
	}
	function insertName($name) {
		$sql = "INSERT INTO Score (Name) VALUES ('$name')";
		$query = mysql_query($sql);

		echo "insert name\n";
	}

	function checkName($name) {
		if($name) {
			$nameSql = "Select Name From Score where Name = '$name'";
			$query5 = mysql_query($nameSql);
			$result5 = mysql_fetch_row($query5);
			if($result5 > 0) {
				echo "Name is already used";
			}
			else {
				insertName($name);
			}
		}
	}
?>