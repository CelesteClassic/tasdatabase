var loadingEl = document.createElement("p");
var loadingText = document.createTextNode("Loading...");
loadingEl.appendChild(loadingText);
document.getElementById("databaseTable").appendChild(loadingEl);
var url = document.URL.split("/");
var category = url[url.length - 2];
var game = url[url.length - 3];
let totalDash = 0; // :roundelie:
let totalJump = 0;
let totalLeftPress = 0;
let totalRightPress = 0;
let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "../../database.json");
xhr.send();
xhr.onload = () => {
	database = JSON.parse(xhr.responseText);
	// Format is database['game']['category']
	// If unsure check out database.json
	try { document.getElementById("fulltime").innerText = database["fulltime"][game][category].replace("00", "") }
	catch{ document.getElementById("fulltime").innerText = database["fulltime"][game][category] }
	database = database[game][category.toLowerCase()];
	if (category.toLocaleLowerCase().includes('dash')) {
		for (i = 0; i < database.length; i++) {
			document.getElementById("databaseTable").innerHTML +=
				'<tr><td>' + (database[i]['file'] == null ? "" : '<a href=' + database[i]['file'] + ' download>') + database[i]['name'] + '</a></td>' +
				'<td>' + (database[i]['frames'] == null ? "" : database[i]['frames'] + 'f') + '</td><td>' + database[i]['dashes'] + 'd</tr>';
			totalDash += database[i]['dashes'];
		}
	} else {
		for (i = 0; i < database.length; i++) {
			document.getElementById("databaseTable").innerHTML +=
				'<tr><td>' + (database[i]['file'] == null ? "" : '<a href=' + database[i]['file'] + ' download>') + database[i]['name'] + '</a></td>' +
				'<td>' + (database[i]['frames'] == null ? "" : database[i]['frames'] + 'f') + '</td></tr>';
		}
	}
	loadingEl.style.display = 'none';
}
// Old, used for the loading text when the page was slow
// Just a relic now
// Still works on slow connections
xhr.onreadystatechange = function () {
	loadingEl.style.display = 'none';
	//document.getElementById('category').innerHTML = category;
	if (category.toLocaleLowerCase().includes('dash')) {
		setTimeout(function () {
			document.getElementById('totaldashes').innerHTML = totalDash;
		}, 1);
	}

}
