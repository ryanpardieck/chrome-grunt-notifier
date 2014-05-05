chrome-grunt-notifier
================================

![Alt text](/../screenshots/icons/screenshot.png?raw=true "Extension Screenshot")

A simple, hacky extension to recieve remote grunt notifications in Chrome.

It currently just reads from a Firebase that presumably is being fed your notifications.
I have a fork of chrome-grunt-notify that will write to your Firebase: [address here]


Extension Usage
-----
You have to create secrets.js in the project root and enter your own Firebase backend to get this going.

secrets.js should be a one-line file that reads like this:

```
var FIREBASE_LOCATION = "https://my_personal_firebase_here.firebaseIO.com"
```

-----

Green/red icons are from openiconlibrary.sourceforge.net.




This is forked from the Firebase sample extension repo: https://github.com/firebase/firebase-chrome-extension
License
-------
[MIT](http://firebase.mit-license.org/).
