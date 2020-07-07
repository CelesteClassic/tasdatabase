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
	document.getElementById("fulltime").innerText = database["fulltime"][game][category]
	database = database[game][category.toLowerCase()];
	let mindashes=category.toLocaleLowerCase().includes('dash')
	let minjumps=category.toLocaleLowerCase().includes('jump')
	let elem=document.getElementById("databaseTable")
	for (i = 0; i < database.length; i++) {
		elem.innerHTML +=
			'<tr><td>' + (database[i]['file'] == null ? "" : '<a href=' + database[i]['file'] + ' download>') + database[i]['name'] + '</a></td>' +
			'<td>' + (database[i]['frames'] == null ? "" : database[i]['frames'] + 'f') + '</td>'+
			(mindashes?('<td>' + database[i]['dashes'] +'d</td>'):(minjumps?('<td>' + database[i]['jumps'] +'j</td>'):'')) +'</tr>';
		totalDash += database[i]['dashes'];
		totalJump += database[i]['jumps'];
	}
	loadingEl.style.display = 'none';
}
// Old, used for the loading text when the page was slow
// Just a relic now
// Still works on slow connections
xhr.onreadystatechange = function () {
	loadingEl.style.display = 'none';
	//document.getElementById('category').innerHTML = category;
	if(category.toLocaleLowerCase().includes('dash')){
		setTimeout(function () {
			document.getElementById('totaldashes').innerHTML = totalDash;
		}, 1);
	}
	if(category.toLocaleLowerCase().includes('jump')){
		setTimeout(function () {
			document.getElementById('totaljumps').innerHTML = totalJump;
		}, 1);
	}

}
