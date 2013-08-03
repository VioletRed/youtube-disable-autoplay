// ==UserScript==
// @name			YouTube Disable Autoplay
// @description		Disables autoplay when you're not looking.
// @namespace		youtube-disable-autoplay-c
// @match			*://*.youtube.com/watch?v=*
// @version			1.0
// ==/UserScript==

// Injects code into the global scope.
function inject(fn) {
	var script = document.createElement('script');
	script.innerHTML = '(' + fn.toString() + ')();';
	document.body.appendChild(script);
}

// This function stops the video if we're not looking. Inject
// it into the page. Note that we can't access any variables outside the function here.
inject(function () {
		
	// Returns the player API interface or false if it's not ready.
	function getPlayer() {
		return window.yt.player 
			&& window.yt.player.getPlayerByElement
			&& window.yt.player.getPlayerByElement(document.getElementById('player-api'));
	}
		
	// Listen for the end of the video.
	function activate() {
		if (document.hidden || document.mozHidden || document.webkitHidden)
			getPlayer().pauseVideo();
	}

	// Wait until the YouTube API's ready.
	function wait() {
		setTimeout(getPlayer() ? activate : wait, 100);
	}
	
	wait();
});
