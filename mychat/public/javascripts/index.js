$(document).ready(function() {
    // 定义窗口的打开和关闭函数
    $('#desk ul li').click(function() {
        var itemName = $(this).attr('title');
        var itemImg = $(this).find('img').attr('src');

        $('#bottom-ul li h2').text(itemName);
        $('#bottom-ul img').attr('src', itemImg);
        $('#bottom-ul').show();

        if ($(this).next('div').attr('id') === 'qq') {
            moveWindow($(this).next('div').children('div.title-frame').attr('id'), $(this).next('div').attr('id'), 1);

        }
        if ($(this).next('div').attr('id') === 'photo') {
            moveWindow($(this).next('div').children('div.title-frame').attr('id'), $(this).next('div').attr('id'), 2);
        }
        if ($(this).next('div').attr('id') === 'baidu'){
            moveWindow($(this).next('div').children('div.title-frame').attr('id'), $(this).next('div').attr('id'), 3);

        }

        $(this).next('div').show().children('div').show().width(0);
        $(".title-frame").animate({ width: "100%" }, 300);
        $(".window-frame").animate({ width: "100%", height: "100%" }, 300);
    });
    $('.close-window').click(function() {
        $(this).parent().parent().hide();

        $('#bottom-ul').hide();
    });


    //定义窗口的最大化和向下还原
    $('.max-big').click(function() {
        if ($(this).parent().parent().css('width') === $('body').css('width')) {
            $(this).text('最大化');
            $(this).parent().parent().css({
                width: "74%",
                height: "75%"
            });
            autoCenter(g($(this).parent().parent().attr('id')));
        } else {
            $(this).text('向下还原');
            $(this).parent().parent().css({
                width: "100%",
                height: "90%"
            });
            removeCenter(g($(this).parent().parent().attr('id')));
        }
    });
});



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('daytime').innerHTML = h + ":" + m + ":" + s;
    setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function g(id) {
    return document.getElementById(id);
}

//窗口变小后自动居中
function autoCenter(element) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elementW = element.offsetWidth;
    var elementH = element.offsetHeight;

    element.style.left = (bodyW - elementW) / 2 + 'px';
    element.style.top = (bodyH - elementH) / 2 + 'px';

}

//窗口变大后取消居中的效果
function removeCenter(element) {
    element.style.left = 0;
    element.style.top = 0;
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;

var isDraging1 = false;
var isDraging2 = false;
var isDraging3 = false;

function moveWindow(windowTitle, window, isDraging) {
    //监听鼠标在标题栏上按下的事件
    g(windowTitle).addEventListener('mousedown', function(e) {
        var e = e || window.evet;
        console.log(isDraging);
        mouseOffsetX = e.pageX - g(window).offsetLeft;
        mouseOffsetY = e.pageY - g(window).offsetTop;
        if (isDraging === 1) {
            isDraging1 = true;
        }
        if (isDraging === 2) {
            isDraging2 = true;
        }
        if (isDraging === 3) {
            isDraging3 = true;
        }
    });

    g(windowTitle).onmousemove = function(e) {
        var e = e || window.event;

        var mouseX = e.pageX;
        var mouseY = e.pageY;

        var moveX = 0;
        var moveY = 0;
        var temp;

        if (isDraging === 1) {
            temp = isDraging1;
        }
        if (isDraging === 2) {
            temp = isDraging2;
        }
        if (isDraging === 3) {
            temp = isDraging3;
        }

        if (temp === true) {
            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;

            // var pageWidth = document.documentElement.clientWidth;
            // var pageHeight = document.documentElement.clientHeight;

            // var dialogWidth = g(window).offsetWidth;
            // var dialogHeight = g(window).offsetHeight;

            // var maxX = pageWidth - dialogWidth;
            // var maxY = pageHeight - dialogHeight;

            // moveX = Math.min(maxX, Math.max(0, moveX));
            // moveY = Math.min(maxY, Math.max(0, moveY));

            g(window).style.left = moveX + 'px';
            g(window).style.top = moveY + 'px';
        }
    };
    g(windowTitle).onmouseup = function() {
        isDraging1 = false;
        isDraging2 = false;
        isDraging3 = false;
    };
}



window.onload = function() {
    startTime();


};