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

var footData = document.getElementById('footData');

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
var logCreateHour = document.getElementById('createLogHour');
var logCreateMinute = document.getElementById('createLogMinute');

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

var logCreateCreate = document.getElementById('logCreate');
var logCreateFeedback = document.getElementById('createLogFeedback');

//sector create elements
var sectorMenu = document.getElementById('focusSector');
var sectorCreateButton = document.getElementById('createSector');

var sectorCreateName = document.getElementById('createSectorName');
var sectorCreateColor = document.getElementById('createSectorColor');
var sectorCreateIcon = document.getElementById('createSectorIcon');
var sectorCreateIconIcon = document.getElementById('createSectorIconIcon');

var sectorCreateCreate = document.getElementById('sectorCreate');
var sectorCreateFeedback = document.getElementById('createSectorFeedback');

//storage create elements
var storageMenu = document.getElementById('focusStorage');
var storageCreateButton = document.getElementById('createStorage');

var storageCreateName = document.getElementById('createStorageName');
var storageCreateColor = document.getElementById('createStorageColor');
var storageCreateIcon = document.getElementById('createStorageIcon');
var storageCreateIconIcon = document.getElementById('createStorageIconIcon');

var storageCreateCreate = document.getElementById('storageCreate');
var storageCreateFeedback = document.getElementById('createStorageFeedback');

//pickers
var colorPicker = document.getElementById('colors');
var iconPicker = document.getElementById('icons');

//states
var isTracking = true;
var setOpen = false;
var openMenu = '';
var logFormSelectionType = 'Spending';

//settings
var currency = '¥';

//color and icon lists
var colorList = [
'ffa8a8',
'ffc7a8',
'ffd9a8',

'fff4a8',
'e7ffa8',
'cfffa8',

'aaffa8',
'a8ffec',
'a8ecff',

'a8cbff',
'a8acff',
'bca8ff',

'd1a8ff',
'f2a8ff',
'ffa8d5',

'ff3f3f',
'ff903f',
'ffbd3f',

'ffeb3f',
'd0ff3f',
'8cff3f',

'3fff83',
'3ffdff',
'3fa2ff',

'3f71ff',
'443fff',
'8c3fff',

'cb3fff',
'ff3ff8',
'ff3fb9',

'000',
'777',
'ccc'
];

var iconList = [
'accessibility_new',
'account_balance',
'account_balance_wallet',
'account_circle',
'add_shopping_cart',
'alarm',
'all_inbox',
'assessment',
'autorenew',
'build',
'card_travel',
'code',
'compare_arrows',
'commute',
'credit_card',
'dashboard',
'delete',
'euro_symbol',
'event',
'favorite',
'face',
'fingerprint',
'grade',
'highlight_off',
'home',
'hourglass_full',
'https',
'info',
'input',
'language',
'opacity',
'power_settings_new',
'schedule',
'room',
'search',
'theaters',
'store',
'thumb_down',
'thumb_up',
'today',
'trending_down',
'trending_up',
'visibility',
'work',
'error',
'warning',
'airplay',
'album',
'equalizer',
'fast_forward',
'fast_rewind',
'games',
'hearing',
'mic',
'movie',
'play_arrow',
'queue_music',
'videocam',
'volume_up',
'alternate_email',
'web',
'business',
'call',
'chat_bubble',
'email',
'forum',
'import_contacts',
'import_export',
'phonelink_setup',
'stay_current_portrait',
'voicemail',
'vpn_key',
'add',
'archive',
'clear',
'create',
'drafts',
'file_copy',
'flag',
'font_download',
'forward',
'gesture',
'how_to_vote',
'link',
'inbox',
'save',
'redo',
'reply',
'send',
'waves',
'weekend',
'airplanemode_active',
'battery_charging_full',
'battery_full',
'brightness_low',
'graphic_eq',
'gps_fixed',
'network_wifi',
'network_cell',
'signal_cellular_4_bar',
'sd_storage',
'signal_wifi_4_bar',
'widgets',
'bubble_chart',
'format_paint',
'highlight',
'insert_photo',
'insert_emoticon',
'cloud',
'folder',
'cast',
'computer',
'desktop_mac',
'headset',
'security',
'speaker',
'videogame_asset',
'watch',
'toys',
'audiotrack',
'adjust',
'brightness_1',
'brightness_2',
'brightness_3',
'camera',
'camera_alt',
'color_lens',
'camera_roll',
'landscape',
'nature',
'nature_people',
'style',
'wb_sunny',
'directions_bike',
'directions_boat',
'directions_bus',
'directions_car',
'directions_railway',
'directions_run',
'directions_subway',
'directions_walk',
'fastfood',
'hotel',
'local_florist',
'local_dining',
'local_drink',
'local_laundry_service',
'local_grocery_store',
'local_movies',
'local_library',
'local_offer',
'local_printshop',
'local_shipping',
'local_taxi',
'map',
'restaurant',
'traffic',
'airline_seat_individual_suite',
'power',
'wc',
'airport_shuttle',
'ac_unit',
'all_inclusive',
'beach_access',
'business_center',
'casino',
'child_care',
'child_friendly',
'fitness_center',
'free_breakfast',
'golf_course',
'hot_tub',
'kitchen',
'meeting_room',
'pool',
'smoking_rooms',
'room_service',
'cake',
'notifications',
'school',
'public',
'whatshot'
];

//helpers

function forceDigitsOnInteger(number, digits) {
	var length = number.toString().length;

	if (length < digits) {
		var treatedNumber = number.toString();
		for (var i = length; i < digits; i++) {
			treatedNumber = '0' + treatedNumber;
		}
		return treatedNumber;
	} else return number;
}