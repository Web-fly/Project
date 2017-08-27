<?php
$load_mysql = 20;
$maxid = '';
if(!isset($_POST['load_more'])) {
	$mysql->mysql('SELECT * FROM `lottery` ORDER BY `id` DESC LIMIT '.$load_mysql,'2massive','lottery.php');
	$result_msql = $mysql->data();
}
else {
	$mysql->mysql('SELECT * FROM `lottery` WHERE `id` < "'.$_POST['load_more'].'" ORDER BY `id` DESC LIMIT '.$load_mysql,'2massive','lottery.php');
	$result_msql = $mysql->data();
	exit(json_encode($result_msql));
}
foreach ($result_msql as $key => $value) {
	$maxid = $value['id'];
}
?>