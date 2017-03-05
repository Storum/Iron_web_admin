<?php


function connect_db (){
	//$db = mysqli_connect('localhost', 'u0194327_root', 'HYvtP5uM', 'u0194327_iron')
	$db = mysqli_connect('localhost', 'root', '', 'u0194327_iron')
	//$db = mysqli_connect('localhost', 'root', '', 'iron_base')
		or die('Unable to connect to MySQL');
	
	mysqli_set_charset($db, 'utf8');

	return $db;
}


$db = connect_db ();
$sql = "insert into test select '".$_GET['data']."'";
$sql_result = mysqli_query ($db, $sql)
	or die('Error querying database.');
mysqli_close ($db);

?>