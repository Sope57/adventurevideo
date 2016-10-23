<?php
	
	$apikey = "AIzaSyA0mhtFXzJ_cFy6PMdGqSUJsV8ve8ANDRg";
	$vidkey = substr($_GET['url'], -11);

	$youtubeQuery = json_decode(file_get_contents("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=".$vidkey."&key=".$apikey), true);

	$result = json_encode($youtubeQuery['items']['0']);

	header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Origin: *');

	echo $result;
?>