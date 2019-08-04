var password;

//data
var logs = [];
var sectors = [];
var storages = [];

//main elements
var passwordInput = document.getElementById('password');
var loginWindow = document.getElementById('loginWindow');
var loginHider = document.getElementById('loginHider');

var barSelector = document.getElementById('barSelector');
var trkButton = document.getElementById('trkButton');
var logButton = document.getElementById('logButton');
var setButton = document.getElementById('setButton');
var trkButtonText = document.getElementById('trkButtonText');
var logButtonText = document.getElementById('logButtonText');
var setButtonText = document.getElementById('setButtonText');

var footTotal = document.getElementById('footTotal');
var footMonth = document.getElementById('footMonth');

var trkScreen = document.getElementById('trk');
var logScreen = document.getElementById('log');
var setScreen = document.getElementById('set');

var sectorList = document.getElementById('sectorList');
var storageList = document.getElementById('storageList');

var currencySetting = document.getElementById('globalCurrency');

//log create elements
var logMenu = document.getElementById('focusLog');
var logCreateButton = document.getElementById('createLog');

var logCreateAmount = document.getElementById('createLogAmount');
var logCreateCurrency = document.getElementById('createLogCurrency');
var logCreateSector = document.getElementById('createLogSectorList');

var logCreateYear = document.getElementById('createLogYear');
var logCreateMonth = document.getElementById('createLogMonth');
var logCreateDay = document.getElementById('createLogDay');

var logCreateAcquisition = document.getElementById('createLogAcquisition');
var logCreateSpending = document.getElementById('createLogSpending');
var logCreateMovement = document.getElementById('createLogMovement');
var logCreateAcquisitionText = document.getElementById('createTypeBarButtonAcquisition');
var logCreateSpendingText = document.getElementById('createTypeBarButtonSpending');
var logCreateMovementText = document.getElementById('createTypeBarButtonMovement');
var logCreateSelector = document.getElementById('createLogTypeBar');

var logCreateStorageSource = document.getElementById('createLogLeftStorageList');
var logCreateStorageDestination = document.getElementById('createLogRightStorageList');
var logCreateSource = document.getElementById('createLogSource');
var logCreateDestination = document.getElementById('createLogDestination');
var logCreateFee = document.getElementById('createLogFee');

var logCreateDelete = document.getElementById('logDelete');
var logCreateCreate = document.getElementById('logCreate');
var logCreateFeedback = document.getElementById('createLogFeedback');

//sector create elements
var sectorMenu = document.getElementById('focusSector');
var sectorCreateButton = document.getElementById('createSector');

//storage create elements
var storageMenu = document.getElementById('focusStorage');
var storageCreateButton = document.getElementById('createStorage');

//states
var isTracking = true;
var setOpen = false;

var openMenu = '';
var logFormSelectionType = 'Spending';

//settings
var currency = '¥';