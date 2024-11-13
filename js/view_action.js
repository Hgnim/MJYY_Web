/*home_a_run();
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
}*/
//将标题从逐字输出动画更改为淡出动画
home_a_run();
function home_a_run() {
    try {
        if (document.getElementById("home_MainText_Div").style.animation != "" || document.getElementById("home_MainButton").style.animation != "") {
            document.getElementById("home_MainText_Div").style.opacity = 0;
            document.getElementById("home_MainButton").style.opacity = 0;
            document.getElementById("home_MainText_Div").style.animation = "";
            document.getElementById("home_MainButton").style.animation = "";
        }
    } catch { }
    finally {
        var home_a_run = setInterval(function () {
            document.getElementById("home_MainText_Div").style.animation = "home_MainText_a 2.5s forwards";
            document.getElementById("home_MainButton").style.animation = "home_MainButton_a 2.5s 800ms forwards";
            clearInterval(home_a_run);
        }, 0);
    }
}


// 切换主题
function toggleTheme_Click() {
    let html = document.querySelector('html');
    let currentTheme = html.getAttribute('data-theme');
 
    if (currentTheme === "dark") {
        html.setAttribute('data-theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
    }
}

function CheckSystemTheme(){
    let html = document.querySelector('html');
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)"); // 是深色
if (isDarkTheme.matches) { //深色
    html.setAttribute('data-theme', 'dark');
} else { //非深色
    html.setAttribute('data-theme', 'light');
}
}