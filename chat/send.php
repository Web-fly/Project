<?php
header('Content-type:application/json;charset=utf-8');
header("Access-Control-Allow-Origin: *");
if(isset($_POST['user_id'],$_POST['msg'])) {
	if(!file_exists($_SERVER['DOCUMENT_ROOT']."/class/class.php")) die(json_encode(array('status'=>'class_error')));
	else include_once($_SERVER['DOCUMENT_ROOT']."/class/class.php");
	$define = new defineall();
	$user_id = (preg_match('/^([\d]{1,8}+)$/i',$_POST['user_id']) == 1) ? $_POST['user_id'] : 0;
	$msg = $define->symbol_reg($_POST['msg'],'sms');
	// We connect to the comet server with login and password for the access demo (you can get your data for connection after registration at comet-server.com)
	// Login 15
	// Password lPXBFPqNg3f661JcegBY0N0dPXqUBdHXqj2cHf04PZgLHxT6z55e20ozojvMRvB8
	// CometQL_v1 database
	$link = mysqli_connect(
		"app.comet-server.ru",
		information::COMET_ID,
		information::COMET_KEY, "CometQL_v1");
	if(!$link) die(json_encode(array('status'=>'connect_connect_cometa')));

	mysqli_query($link,"INSERT INTO users_messages (id, event, message)VALUES ('".$user_id."', 'message', '".$msg."')" );
	if(mysqli_errno($link)) die(json_encode(array('status'=>'error_query')));
	else echo json_encode(array('status'=>'message_send'));

} else exit(json_encode(array('status'=>'error_POST')));
?>