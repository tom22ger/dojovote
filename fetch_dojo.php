<?php 
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "dojo_vote";

$conn = new mysqli($servername, $username, $password, $dbname);
$id = $_REQUEST["id"];
$sql = "SELECT * FROM $id";
$sqlOut = $conn->query($sql);
$dojoData = array();
while ( $row = $sqlOut->fetch_assoc())  {
	$dojoData[]=$row;
}
echo json_encode($dojoData);
?>

