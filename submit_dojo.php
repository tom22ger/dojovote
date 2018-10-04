<?php 
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "dojo_vote";

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

