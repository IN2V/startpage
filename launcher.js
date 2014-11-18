chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.update({'url': 'chrome://newtab'});
});