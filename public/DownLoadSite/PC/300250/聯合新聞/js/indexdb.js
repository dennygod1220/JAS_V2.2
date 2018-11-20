
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if(window.indexedDB){
	var req = window.indexedDB.deleteDatabase("undefined");
	req.onsuccess = function () {
		console.log("Deleted database successfully");
	};
	req.onerror = function () {
		console.log("Couldn't delete database");
	};
	req.onblocked = function () {
		console.log("Couldn't delete database due to the operation being blocked");
	};

}