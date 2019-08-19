<?php
session_start();
include 'scripts/private/crypt.php';
setcookie('back', $_SESSION['back'], time() + (86400 * 30), "/");
?>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<title>REsource</title>
		<link href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,500|Roboto+Mono:400,700&display=swap&subset=japanese" rel="stylesheet">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
		<link rel="stylesheet" href="assets/style.css">
	</head>
	<body>
		<div id="app">
			<div id="loginWindow">
				<input class="field" id="password" maxlength="20" placeholder="password" autocomplete="off" type="password" onkeypress="login(event)" onclick="handleFormClick(event)"></input>
				<span id="loginFeedback"></span>
			</div>

			<div id="loginHider">
				<img id="loginLogo" src="assets/media/REsource logo_g.svg"></img>
			</div>
			
			<div id="bar">
				<a href="#" class="barButton" id="trkButton"><i class="barButtonText material-icons" id="trkButtonText">show_chart</i></a
				><a href="#"class="barButton" id="logButton"><i class="barButtonText material-icons" id="logButtonText">notes</i></a
				><a href="#"class="barButton" id="setButton"><i class="barButtonText material-icons" id="setButtonText">add</i></a>
				<div id="barSelector"></div>
			</div>

			<div id="main">
				<div class="page" id="trk">
					<div id="graph"></div>
					<div id="chart"></div>
					<div id="legend"></div>
				</div>

				<div class="page" id="log">
					<a href="#" class="createButton" id="createLog"><div id="createBarLog"></div><span id="createButtonTextLog">+ Log</span></a>
					<div class="creationForm" id="focusLog">
						<input class="createField" id="createLogAmount" maxlength="10" placeholder="amount" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						<input class="createField" id="createLogCurrency" maxlength="1" placeholder="cur" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>

						<select class="selector" name="sector" id="createLogSectorList"></select>

						<div class="createDivider"></div>

						<input class="createFieldSmall" id="createLogYear" maxlength="4" placeholder="year" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						<span class="fieldText" id="createSlash">/</span>
						<input class="createFieldSmall" id="createLogMonth" maxlength="2" placeholder="mn" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						<span class="fieldText" id="createSlash">/</span>
						<input class="createField" id="createLogDay" maxlength="2" placeholder="dy" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>

						<div id="createLogTime">
							<input class="createFieldSmall" id="createLogHour" maxlength="2" placeholder="hr" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
							<span class="fieldText" id="createSlash">:</span>
							<input class="createFieldSmall" id="createLogMinute" maxlength="2" placeholder="mn" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						</div>

						<div class="createDivider"></div>

						<div class="createTypeBarButtonHolder">
							<a href="#" class="createTypeBarButton" id="createLogAcquisition"><span class="createTypeBarButtonText" id="createTypeBarButtonAcquisition">Acquisition</span></a
							><a href="#" class="createTypeBarButton" id="createLogSpending"><span class="createTypeBarButtonText" id="createTypeBarButtonSpending">Spending</span></a
							><a href="#" class="createTypeBarButton" id="createLogMovement"><span class="createTypeBarButtonText" id="createTypeBarButtonMovement">Movement</span></a>
							<div class="createTypeBarSelector" id="createLogTypeBar"></div>
						</div>

						<div class="createDivider"></div>

						<select class="selector" name="source" id="createLogLeftStorageList"></select>
						<select class="selector" name="source" id="createLogRightStorageList"></select>
						<input class="createFieldSmall" id="createLogFee" maxlength="10" placeholder="fee" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						<input class="createFieldSmall" id="createLogSource" maxlength="20" placeholder="source" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						<input class="createFieldSmall" id="createLogDestination" maxlength="20" placeholder="destination" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>

						<div class="createDivider"></div>

						<a href="#" class="createFormButton" id="logCreate" onclick="createLog()"><i class="createFormButtonIcon material-icons">add_circle</i></a>

						<span class="createFormFeedback" id="createLogFeedback"></span>
					</div>
				</div>
			</div>

			<div class="page" id="set">
				<div id="list">
					<a href="#" class="createButton" id="createSector"><div id="createBarSector"></div><span id="createButtonTextSector">+ Sector</span></a>
					<div class="creationForm" id="focusSector">
						<input class="createFieldSmall" id="createSectorName" maxlength="20" placeholder="name" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						
						<div class="createDivider"></div>

						<a href="#" class="colorPicker" id="createSectorColor" onclick="openColorPicker()"></a>
						<a href="#" class="iconPicker" id="createSectorIcon" onclick="openIconPicker()"><i class="iconPickerIcon material-icons" id="createSectorIconIcon">trip_origin</i></a>

						<a href="#" class="createFormButton" id="sectorCreate" onclick="createSector()"><i class="createFormButtonIcon material-icons">add_circle</i></a>

						<span class="createFormFeedback" id="createSectorFeedback"></span>
					</div>
					<div class="setPage" id="sectorList"></div>

					<a href="#" class="createButton" id="createStorage"><div id="createBarStorage"></div><span id="createButtonTextStorage">+ Storage</span></a>
					<div class="creationForm" id="focusStorage">
						<input class="createFieldSmall" id="createStorageName" maxlength="20" placeholder="name" autocomplete="off" type="text" onclick="handleFormClick(event)"></input>
						
						<div class="createDivider"></div>

						<a href="#" class="colorPicker" id="createStorageColor" onclick="openColorPicker()"></a>
						<a href="#" class="iconPicker" id="createStorageIcon" onclick="openIconPicker()"><i class="iconPickerIcon material-icons" id="createStorageIconIcon">trip_origin</i></a>

						<a href="#" class="createFormButton" id="storageCreate" onclick="createStorage()"><i class="createFormButtonIcon material-icons">add_circle</i></a>

						<span class="createFormFeedback" id="createStorageFeedback"></span>
					</div>
					<div class="setPage" id="storageList"></div>

					<div class="createButton" id="createSettings"><div id="createBarSettings"></div><span id="createButtonTextSettings">Settings</span></div>
					<div id="settingsList">
						<input class="createFieldSmall" id="globalCurrency" maxlength="1" autocomplete="off" type="text" onclick="handleFormClick(event)" oninput="changeCurrency()"></input>
					</div>
				</div>
			</div>

			<div id="colors">
			</div>

			<div id="icons">
			</div>

			<div id="foot">
				<span id="footData"></span>
				<img id="footLogo" src="assets/media/REsource logo_w.svg"></img>
			</div>
		</div>
		
		<div id="front" class="<?php echo $_SESSION['front'] ?>" style="display:none"></div>

		<script src="scripts/public/init.js"></script>
		<script src="scripts/public/request.js"></script>
		<script src="scripts/public/tracking.js"></script>

		<script src="scripts/public/sector.js"></script>
		<script src="scripts/public/storage.js"></script>
		<script src="scripts/public/log.js"></script>

		<script src="scripts/public/control.js"></script>
		<script src="scripts/public/main.js"></script>
	</body>
</html>