<?php
header('Content-type:application/json;charset=utf-8');
header("Access-Control-Allow-Origin: *");
if(isset($_POST['user_id'],$_POST['user_key'])) {
	if(!file_exists($_SERVER['DOCUMENT_ROOT']."/class/class.php")) die(json_encode(array('status'=>'class_error')));
	else include_once($_SERVER['DOCUMENT_ROOT']."/class/class.php");
	// Login 15
	// Password lPXBFPqNg3f661JcegBY0N0dPXqUBdHXqj2cHf04PZgLHxT6z55e20ozojvMRvB8
	// CometQL_v1 database
	$link = mysqli_connect(
		"app.comet-server.ru",
		information::COMET_ID,
		information::COMET_KEY, "CometQL_v1");
	if(!$link) die(json_encode(array('status'=>'connect_connect_cometa')));
	// valid
	$user_id = (preg_match('/^([\d]{1,8}+)$/i',$_POST['user_id']) == 1) ? $_POST['user_id'] : 0;
	$user_key = (preg_match('/^([\d\w]{1,21}+)$/i',$_POST['user_key']) == 1) ? $_POST['user_key'] : 0;

	if(isset($_COOKIE['user_id'],$_COOKIE['user_key'])) {
		$_COOKIE['user_id'] = $user_id;
		$_COOKIE['user_key'] = $user_key;
		$hash_check = mysqli_query($link, "SELECT `hash` FROM `users_auth` WHERE `id`=".((int)$user_id));

		if(!$hash_check) die(json_encode(array('status'=>'error_query_select')));
		else if(mysqli_num_rows($hash_check)) {
		// hash был найден в таблице авторизации
			$hash_select = $hash_check->fetch_array(MYSQLI_NUM);
			$link->close();
			die(json_encode(array('status'=>'auth_complete','user:'.$user_id.' key: '.$hash_select[0])));
		}
	} else {
		mysqli_query( $link, "INSERT INTO users_auth (id, hash)VALUES('".mysqli_real_escape_string($link, $user_id)."', '".mysqli_real_escape_string($link, $user_key)."' );" );
		if(mysqli_errno($link)) die(json_encode(array('status'=>'error_query')));
		else {
			$link->close();
			echo json_encode(array('status'=>'auth_success','user:'.$user_id));
			setcookie('user_id', $user_id, time() + 3600, '/', "93.73.167.200", false);
			setcookie('user_key', $user_key, time() + 3600, '/', "93.73.167.200", false);
		}
	}

} else exit(json_encode(array('status'=>'error_post')));
?>