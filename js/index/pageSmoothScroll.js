$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1000);
        event.preventDefault();
    });

    //toggle scroll menu
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll >= 200) {
            $('.sticky-navigation').removeClass('navbar-dark').addClass('shadow-bottom').addClass('navbar-light');
        } else {
            $('.sticky-navigation').removeClass('shadow-bottom').removeClass('navbar-light').addClass('navbar-dark');
        }

        if(!utbFlyLock){
        // adjust scroll to top
        if (scroll >= 600) {
            //$('.scroll-top').addClass('active');
            if(utbLoc==0){
                utb.style.animation='scroll-top_out 1s forwards';
                utbLoc=1;
            }
        } else {
            //$('.scroll-top').removeClass('active');
            if(utbLoc==1){
                utb.style.animation='scroll-top_in 1s forwards';
                utbLoc=0;
            }
        }
    }
        return false;
    });
    var utbFlyLock=false;
    var utbLoc=0;
    var utb=document.getElementById('upTopButton');
    var utbShakAId=0;
    utb.addEventListener('mouseenter', (event) => {
        if(!utbFlyLock && utbLoc==1){
            utbShakAId=0;
        utb.style.right='20px';
        utb.style.animation='scroll-top_shak 0.5s infinite';
    }
    });
    utb.addEventListener('mouseleave', (event) => {
        if(!utbFlyLock && utbLoc==1)
        {
            function utbAOver(){
                if(utbShakAId==1){
                utb.style.animationIterationCount = 0;
                utb.style.animation='';}
                utb.removeEventListener('animationiteration',utbAOver);
            }
            utbShakAId=1;
            utb.addEventListener('animationiteration',utbAOver);
        }
    });
    // scroll top top
    $('.scroll-top').click(function () {
        utbFlyLock=true;
        var utba=document.querySelector('#upTopButton');
        function waitUtbFlyOver(){
            utb.style.top='';
            utb.style.bottom= '';
            utbLoc=0;
            utbFlyLock=false;
            utba.removeEventListener('animationend', waitUtbFlyOver);
        }
        utb.style.bottom='0';
        utb.style.top = (window.innerHeight - 20) + 'px';
        utb.style.right= '20px';
        utb.style.setProperty("--defTopValue", utb.style.top);
        utba.addEventListener('animationend',waitUtbFlyOver);//监听动画执行完毕的事件
        utb.style.animation='scroll-top_fly 1s forwards';
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });
    /**Theme switcher - DEMO PURPOSE ONLY */
    $('.switcher-trigger').click(function () {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function () {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });
});