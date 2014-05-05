'use strict';
Firebase.enableLogging(true);
var f = new Firebase(FIREBASE_LOCATION);

var ignoreInitialData = true;

chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.notifications.clear(alarm.name, function(wasCleared) {
    if (!wasCleared) {
      //this means we goofed!
    }
  });
});

f.once('value', function(snapshot){
  ignoreInitialData = false;
  var options = {
    type: 'basic',
    iconUrl: '../../icons/green.png',
    title: "chrome-grunt-notifier",
    message: "Thanks for installing chrome-grunt-notifier!",
    contextMessage: "",
    eventTime: Date.now(),
    isClickable: false,
  };
  
  chrome.notifications.create("welcome", options, function(notificationID) {
    
  });

});

f.on('child_added', function(snapshot){
  if (ignoreInitialData) {
    return;
  }

  chrome.notifications.getAll(function(notifs){
    var totalNotifCount = (Object.keys(notifs)).length;
    if (totalNotifCount > 70) {
      alert("ERROR - Notifications are arriving at a rate greater than one per second.\n\n" +
              "Someone else may be writing to your Firebase. This extension will now silence itself.\n\n" +
              "Reload the extension once the situation has been resolved.");
      ignoreInitialData = true;
    }
  });

  var content = snapshot.val();

  var iconPath = '../../icons/green.png';
  if (/Task .* failed\./.test(content.message)) {
    iconPath = '../../icons/red.png'
  }

  var options = {
    type: 'basic',
    iconUrl: iconPath,
    title: content.title,
    message: content.message,
    contextMessage: content.time,
    eventTime: Date.now(),
    isClickable: false,
  };
  
  chrome.notifications.create(snapshot.name(), options, function(notificationID) {
    chrome.alarms.create(notificationID, {delayInMinutes: 1});
  });
});
