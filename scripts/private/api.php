<?php
include 'crypt.php';

session_start();

//check tokens and password
if (!hash_equals($_SESSION['front'], $_POST['front']) || !password_verify($frontDoor, $_POST['front']) ||
	!hash_equals($_SESSION['back'], $_POST['back']) || !password_verify($backDoor, $_POST['back']) ||
	!password_verify($_POST['pass'], $_SESSION['pass'])) {
		return;
	}

switch ($_POST['type']) {
	case 'newLog':
		newLog($_POST['data']);
		break;

	case 'newSector':
		newSector($_POST['data']);
		break;

	case 'newStorage':
		newStorage($_POST['data']);
		break;

	case 'modifyLog':
		modifyLog($_POST['id'], $_POST['data']);
		break;

	case 'modifySector':
		modifySector($_POST['id'], $_POST['data']);
		break;

	case 'modifyStorage':
		modifyStorage($_POST['id'], $_POST['data']);
		break;

	case 'deleteLog':
		deleteLog($_POST['id']);
		break;

	case 'deleteSector':
		deleteSector($_POST['id']);
		break;

	case 'deleteStorage':
		deleteStorage($_POST['id']);
		break;

	case 'readAll':
		readAll();
		break;

	case 'verifyLogin':
		verifyLogin();
		break;
}

function parseJSON($file) {
	$c = file_get_contents('../../../data/'. $file .'.json');
	return $j = json_decode($c, TRUE);
}

function newLog($data) {
	//append new data
	$j = parseJSON('log');
	array_push($j['log'], $data);
	json_encode($j);

	//update file
	$f = fopen('../../../data/log.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function newCategory($data) {
	$j = parseJSON('sector');
	array_push($j['sector'], $data);
	json_encode($j);

	//update file
	$f = fopen('../../../data/sector.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function newStorage($data) {
	$j = parseJSON('storage');
	array_push($j['storage'], $data);
	json_encode($j);

	//update file
	$f = fopen('../../../data/storage.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function modifyLog($id, $data) {
	return;
}

function modifySector($id, $data) {
	return;
}

function modifyStorage($id, $data) {
	return;
}

function deleteLog($id) {
	return;
}

function deleteSector($id) {
	return;
}

function deleteStorage($id) {
	return;
}

function readAll() {
	$f = file_get_contents('../../data/log.json');
	$logs = json_decode($f)->logs;

	$f = file_get_contents('../../data/sector.json','r');
	$sectors = json_decode($f)->sectors;

	$f = file_get_contents('../../data/storage.json','r');
	$storages = json_decode($f)->storages;

	$result = array(
    'logs'=>$logs,
    'sectors'=>$sectors,
    'storages'=>$storages
	);

	//encode so php associate array can be decoded in client js
	echo json_encode($result);
	return;
}

function verifyLogin() {
	//code only reachable if login already verified
	echo 'true';
	return;
}

return;
?>