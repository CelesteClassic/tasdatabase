var url = document.URL.split("/");
var category = url[url.length - 2];
var game = url[url.length - 3];
function frames(i){
    return database[i]['frames'];
}
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
                '<tr><td><a href=' + database[i]['file'] + ' download>' + database[i]['name'] + '</a></td>' +
                '<td>' + database[i]['frames'] + 'f</td><td>' + database[i]["dashes"] + 'd</tr>';
        }
    } else {
        for (i = 0; i < database.length; i++) {
            frames = database[i]['frames'];
            if (frames == null){
            document.getElementById("tableStuff").innerHTML +=
                '<tr><td><a href=' + database[i]['file'] + ' download>' + database[i]['name'] + '</a></td>' +
                '<td></td></tr>';
            } else {
                document.getElementById("tableStuff").innerHTML +=
                '<tr><td><a href=' + database[i]['file'] + ' download>' + database[i]['name'] + '</a></td>' +
                '<td>' + database[i]['frames'] + 'f</td></tr>';
            }
        }
    }
}