<?php 
$servername = "dojovote-mysqldbserver.mysql.database.azure.com";
$username = "mysqldbuser@dojovote-mysqldbserver";
$password = "Oodles0fDojos4me!";
$dbname = "dojovote";

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

