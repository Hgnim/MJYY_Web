document.addEventListener('DOMContentLoaded', function () {
    //当折叠菜单展开时，点击内部按钮后会自动收起菜单
    document.getElementById('navbarCollapse').addEventListener('click', function (event) {
        var isButton = true;
        try {
            event.target.classList.forEach(e => {
                //判断被点击的目标的类是否为下拉菜单，如果是则不收起菜单。此判断是为了兼容触摸屏用户，因为触摸屏用户无法使用hover效果，只能通过点击来展开下拉菜单
                if (e.includes('dropdown')/*检测类中是否包含指定的字符串*/) {
                    if(e != 'dropdown-item')//但排除下拉菜单内的项目按钮
                        isButton = false;
                    throw Error('break');
                }
            });
        } catch { }
        if (isButton) {
            var ncsb = document.getElementById('navbarCollapse_showButton');
            if (ncsb.ariaExpanded == "true") {
                ncsb.dispatchEvent(new MouseEvent('click', {
                    'bubbles': true,    // 是否冒泡
                    'cancelable': true  // 是否可以取消
                }));
            }
        }
    });
});
$(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //检测并赋予导航栏背景
        if (scroll >= 200) {
            $('.sticky-navigation').removeClass('navbar-dark').addClass('shadow-bottom').addClass('navbar-light');
        } else {
            $('.sticky-navigation').removeClass('shadow-bottom').removeClass('navbar-light').addClass('navbar-dark');
        }
    });
});