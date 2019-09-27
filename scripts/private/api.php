<?php
session_start();
include 'crypt.php';

//check tokens and password
if (!password_verify($frontDoor, $_POST['front']) ||
	!password_verify($backDoor, $_POST['back']) ||
	!password_verify($_POST['pass'], $pass)) {
		echo 'Improper credentials.';
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

function newLog($data) {
	$c = file_get_contents('../../data/log.json');
	$j = json_decode($c, TRUE);
	$data = json_decode($data);

	array_push($j['logs'], $data);
	$j = json_encode($j);

	//update file
	$f = fopen('../../data/log.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function newSector($data) {
	$c = file_get_contents('../../data/sector.json');
	$j = json_decode($c, TRUE);
	$data = json_decode($data);
	
	array_push($j['sectors'], $data);
	$j = json_encode($j);

	//update file
	$f = fopen('../../data/sector.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function newStorage($data) {
	$c = file_get_contents('../../data/storage.json');
	$j = json_decode($c, TRUE);
	$data = json_decode($data);
	
	array_push($j['storages'], $data);
	$j = json_encode($j);

	//update file
	$f = fopen('../../data/storage.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function deleteLog($id) {
	$c = file_get_contents('../../data/log.json');
	$j = json_decode($c, TRUE);

	//remove element
	for ($i = 0; $i < sizeof($j['logs']); $i++) {
		if ($j['logs'][$i]['id'] == $id) {
			array_splice($j['logs'], $i, 1);
		}
	}

	//fix ids
	for ($i = 0; $i < sizeof($j['logs']); $i++) {
		$j['logs'][$i]['id'] = $i;
	}

	$j = json_encode($j);

	//update file
	$f = fopen('../../data/log.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function deleteSector($name) {
	$c = file_get_contents('../../data/sector.json');
	$j = json_decode($c, TRUE);

	//remove element
	for ($i = 0; $i < sizeof($j['sectors']); $i++) {
		if ($j['sectors'][$i]['name'] == $name) {
			array_splice($j['sectors'], $i, 1);
		}
	}

	$j = json_encode($j);

	//update file
	$f = fopen('../../data/sector.json','w');
	fwrite($f, $j);
	fclose($f);
	return;
}

function deleteStorage($name) {
	$c = file_get_contents('../../data/storage.json');
	$j = json_decode($c, TRUE);

	//remove element
	for ($i = 0; $i < sizeof($j['storages']); $i++) {
		if ($j['storages'][$i]['name'] == $name) {
			array_splice($j['storages'], $i, 1);
		}
	}

	$j = json_encode($j);

	//update file
	$f = fopen('../../data/storage.json','w');
	fwrite($f, $j);
	fclose($f);
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