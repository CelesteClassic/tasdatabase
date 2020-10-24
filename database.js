const loadingEl = document.createElement("p");
loadingEl.setAttribute("id", "loading");
loadingEl.innerText = "Loading...";
const elem = document.getElementById("databaseTable");
elem.appendChild(loadingEl);
const url = document.URL.split("/");
const category = url[url.length - 2];
const game = url[url.length - 3];
let totalDash = 0; // :roundelie:
let totalJump = 0;
let totalLeftPress = 0;
const totalRightPress = 0;
fetch("../../database.json")
	.then((response) => response.json())
	.then((database) => {
		// Format is database['game']['category']
		// If unsure check out database.json
		document.getElementById("fulltime").innerText =
			database["fulltime"][game][category];
		database = database[game][category.toLowerCase()];
		let mindashes = category.toLocaleLowerCase().includes("dash");
		let minjumps = category.toLocaleLowerCase().includes("jump");

		for (i in database) {
			elem.innerHTML += `<tr><td>
				${database[i]["file"] == null ? "" : `<a href=${database[i]["file"]} download>`}
				${database[i]["name"]}</a></td>
				<td>${database[i]["frames"] == null ? "" : `${database[i]["frames"]}f`}
				</td>
				${
					mindashes
						? `<td>${database[i]["dashes"]}d</td>`
						: minjumps
						? `<td>${database[i]["jumps"]}j</td>`
						: ""
				}
				</tr>`;
			totalDash += database[i]["dashes"];
			totalJump += database[i]["jumps"];
		}
		// Old, used for the loading text when the page was slow
		// Just a relic now
		// Still works on slow connections
		document.getElementById("loading").style.display = "none";
		//document.getElementById('category').innerHTML = category;
		if (category.toLocaleLowerCase().includes("dash")) {
			setTimeout(() => {
				document.getElementById("totaldashes").innerText = totalDash;
			}, 1);
		}
		if (category.toLocaleLowerCase().includes("jump")) {
			setTimeout(() => {
				document.getElementById("totaljumps").innerText = totalJump;
			}, 1);
		}
	});
