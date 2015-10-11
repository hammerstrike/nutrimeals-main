<?php
	header('Content-Type: application/json');
	//set POST variables
	//$d = json_decode($_POST['data']);
	$url = $_POST['url'];
	unset($_POST['url']);

	$fields_string = "";
	//url-ify the data for the POST
	foreach($_POST as $key=>$value) {
		$fields_string .= $key.'='.$value.'&';
	}
	$fields_string = rtrim($fields_string,'&');
	$opt = 'data={"crud":"list","list_active_only":true}';
	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_POST,1);
	curl_setopt($ch,CURLOPT_POSTFIELDS,$opt);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

	//execute post
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);
	echo $result;
?>
