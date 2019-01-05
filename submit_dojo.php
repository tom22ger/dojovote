<?php 
/*$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "dojo_vote";

$conn = new mysqli($servername, $username, $password, $dbname);*/

// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:dojovote.database.windows.net,1433; Database = dojovote", "tomger", "Oodles0fDojos4me!");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "tomger@dojovote", "pwd" => "Oodles0fDojos4me!", "Database" => "dojovote", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:dojovote.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


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

