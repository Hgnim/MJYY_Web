$(function () {
    function navbarBackgroundCheckChange(){
        var scroll = $(window).scrollTop();
        //检测并赋予导航栏背景
        if (scroll >= 200) {
            $('.sticky-navigation').removeClass('navbar-dark').addClass('shadow-bottom').addClass('navbar-light');
        } else {
            $('.sticky-navigation').removeClass('shadow-bottom').removeClass('navbar-light').addClass('navbar-dark');
        }
    }
    $(window).scroll(function () {
        navbarBackgroundCheckChange();
    });
    navbarBackgroundCheckChange();
});