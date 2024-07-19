home_a_run();
function home_a_run(){
var home_a_text = "";
var home_a_i = 0;
var home_a_while = setInterval(function () {
    if (home_a_text == "") {
        home_a_text = document.getElementById("home_MainText").innerHTML;
        document.getElementById("home_MainText").innerHTML = "";
        document.getElementById("home_MainButton").style.opacity=0;
        document.getElementById("home_MainButton").style.animation = "";
    }
    var shower = home_a_text.substr(0, home_a_i);
    document.getElementById("home_MainText").innerHTML = shower;
    if (home_a_i + 1 > home_a_text.length) {
        clearInterval(home_a_while);
    }
    home_a_i++;
    if (document.getElementById("home_MainText").innerHTML == home_a_text) {
        document.getElementById("home_MainButton").style.animation = "home_MainButton_a 3s forwards"
    }
}, 64);
}