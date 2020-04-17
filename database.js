var url = document.URL.split("/");
var category = url[url.length - 2];
var game = url[url.length - 3];
let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "../../database.json");
xhr.send();
xhr.onload = () => {
    database = JSON.parse(xhr.responseText);
    // Format is database['game']['category']
    // If unsure check out database.json
    database = database[game][category.toLowerCase()];
    if (category.toLocaleLowerCase().includes('dash')){
        for (i = 0; i < database.length; i++) {
            document.getElementById("tableStuff").innerHTML +=
                '<tr><td>'+(database[i]['file'] == null?"":'<a href=' + database[i]['file'] + ' download>')+ database[i]['name'] + '</a></td>' +
                '<td>' + (database[i]['frames'] == null?"":database[i]['frames']+'f') + 'f</td><td>' + database[i]["dashes"] + 'd</tr>';
        }
    } else {
        for (i = 0; i < database.length; i++) {
            document.getElementById("tableStuff").innerHTML +=
            '<tr><td>'+(database[i]['file'] == null?"":'<a href=' + database[i]['file'] + ' download>')+ database[i]['name'] + '</a></td>' +
                '<td>' + (database[i]['frames'] == null?"":database[i]['frames']+'f')+'</td></tr>';
        }
    }
}