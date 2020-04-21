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
let xhr2 = new XMLHttpRequest();
function timeTas(file) {
    if (file == null) {
        return null
    } else {
        // This makes a synchous call
        // Bad idea, don't know how to fix
        xhr2.open("GET", file, false);
        xhr2.send();
        let tas;
        tas = xhr2.responseText;
        tas = tas.split(']');
        tas = tas[1].split(',');
        let jumps = 0;
        let dashes = 0;
        let leftPress = 0;
        let rightPress = 0;
        tas.forEach(x => {/*
            dash = Math.floor(x / 32) % 2;
            jump = Math.floor(x / 16) % 2;
            */
            if (x & 16) {
                jumps++;
            }
            if (x & 32) {
                dashes++;
            }
            if (x & 2) {
                leftPress++;
            }
            if (x & 1) {
                rightPress++;
            }
        });
        //console.log(leftPress);
        tastime = tas.length - 2;
        output = [tastime, dashes, jumps, leftPress, rightPress];
        return output;
    }
}
xhr.open("GET", "../../database.json");
xhr.send();
xhr.onload = () => {
    database = JSON.parse(xhr.responseText);
    // Format is database['game']['category']
    // If unsure check out database.json
    database = database[game][category.toLowerCase()];
    if (category.toLocaleLowerCase().includes('dash')) {
        for (i = 0; i < database.length; i++) {
            tas = timeTas(database[i]['file']);
            document.getElementById("databaseTable").innerHTML +=
                '<tr><td>' + (database[i]['file'] == null ? "" : '<a href=' + database[i]['file'] + ' download>') + database[i]['name'] + '</a></td>' +
                '<td>' + (database[i]['file'] == null ? "" : tas[0] + 'f') + '</td><td>' + tas[1] + 'd</tr>';
            totalDash += tas[1];
        }
    } else {
        for (i = 0; i < database.length; i++) {
            tas = timeTas(database[i]['file']);
            document.getElementById("databaseTable").innerHTML +=
                '<tr><td>' + (database[i]['file'] == null ? "" : '<a href=' + database[i]['file'] + ' download>') + database[i]['name'] + '</a></td>' +
                '<td>' + (database[i]['file'] == null ? "" : tas[0] + 'f') + '</td></tr>';
        }
    }
}
xhr2.onreadystatechange = function () {
    loadingEl.style.display = 'none';
    //document.getElementById('category').innerHTML = category;
    if (category.toLocaleLowerCase().includes('dash')) {
        setTimeout(function () {
            //do what you need here
            document.getElementById('totalDashes').innerHTML = totalDash;
        }, 1);
    }
}
