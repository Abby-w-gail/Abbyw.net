const discordId = "689448677453856772";
const statusNames = { online: "online", idle: "idle", dnd: "do not disturb", offline: "offline" };
let songStart = 0;
let songEnd = 0;

function loadPresence() {
	fetch("https://api.lanyard.rest/v1/users/" + discordId)
		.then((res) => res.json())
		.then((json) => {
			if (json.success) {
				showPresence(json.data);
			}
		})
		.catch(() => {
			document.getElementById("statusText").textContent = "couldnt reach discord :(";
		});
}

function showPresence(data) {
	const user = data.discord_user;

	document.getElementById("discordName").textContent = user.global_name || user.username;
	document.getElementById("pfp").src = user.avatar
		? "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=128"
		: "https://cdn.discordapp.com/embed/avatars/0.png";

	const status = data.discord_status;
	document.getElementById("statusDot").className = "status-dot " + status;
	document.getElementById("statusText").textContent = statusNames[status] || status;

	const custom = data.activities.find((a) => a.type === 4);
	let customText = "";
	if (custom) {
		if (custom.emoji && !custom.emoji.id) {
			customText += custom.emoji.name + " ";
		}
		customText += custom.state || "";
	}
	document.getElementById("customStatus").textContent = customText.trim();

	const game = data.activities.find((a) => a.type === 0);
	document.getElementById("activityText").textContent = game ? "playing " + game.name : "";

	const spotifyBox = document.getElementById("spotify");
	const spotifyOff = document.getElementById("spotifyOff");

	if (data.listening_to_spotify && data.spotify) {
		const s = data.spotify;

		spotifyBox.style.display = "flex";
		spotifyOff.style.display = "none";

		document.getElementById("albumArt").src = s.album_art_url;
		document.getElementById("songName").textContent = s.song;
		document.getElementById("songName").href = "https://open.spotify.com/track/" + s.track_id;
		document.getElementById("songArtist").textContent = "by " + s.artist.replace(/;/g, ",");

		songStart = s.timestamps.start;
		songEnd = s.timestamps.end;
		updateSongBar();
	} else {
		spotifyBox.style.display = "none";
		spotifyOff.style.display = "block";
		songEnd = 0;
	}
}

function updateSongBar() {
	if (!songEnd) return;

	const percent = (Date.now() - songStart) / (songEnd - songStart) * 100;
	document.getElementById("songFill").style.width = Math.min(100, Math.max(0, percent)) + "%";
}

loadPresence();
setInterval(loadPresence, 15000);
setInterval(updateSongBar, 1000);