<?php 
$servername = "dojovote-mysqldbserver.mysql.database.azure.com";
$username = "mysqldbuser@dojovote-mysqldbserver";
$password = "Oodles0fDojos4me!";
$dbname = "dojovote";

$conn = new mysqli($servername, $username, $password, $dbname);

$id = $_GET["id"];
$fid = $_GET["fid"];
$val = $_GET["val"];
	
$sql = "UPDATE $id
SET score = score + $val
WHERE fid = $fid";

if ($conn->query($sql) === TRUE) {
	//echo "Table MyGuests created successfully";
} else {
	//echo "Error creating table: " . $conn->error;
}

?>

