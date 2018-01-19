// 无缝轮播效果
$(function () {
    var i = 0;
    var imgWidth = $('.slider-item').width();
    var clone = $('.slider-item').first().clone();
    $('.slider').append(clone);
    var size =$('.slider-item').length;
    $('.slider').width(imgWidth*size+'px');
    var timer;
    // 动态添加圆点函数

    function addBtn() {
      for (var j=0; j<size-1; j++) {
        $('.inner-indicator').append('<i></i>');
      }

      $('.inner-indicator i').eq(0).addClass('active');

      $('.inner-indicator i').on('click',function () {
        i = $(this).index();
        $('.slider').stop().animate({left:-i * imgWidth},600);
        $(this).addClass('active').siblings().removeClass('active');
      })
    };

    // 向左移动函数

    function toLeft() {
        i--;
        if (i == -1) {
            $(".slider").css({left:-(size - 1)*imgWidth});
            i=size-2;
        }
        $(".slider").stop().animate({left:-i * imgWidth},600);
        $('.inner-indicator i').eq(i).addClass('active').siblings().removeClass('active');
    };

    // 向右移动函数

    function toRight() {

        i++;

        if (i==size) {
            i = 1;
            $('.slider').css({left: 0});
        }
        $('.slider').stop().animate({left: -i * imgWidth },600);

        if (i == size-1) {
            $('.inner-indicator i').eq(0).addClass('active').siblings().removeClass('active');
        } else {
            $('.inner-indicator i').eq(i).addClass('active').siblings().removeClass('active');
        }
    };

    // 自动轮播
    function autoPlay() {
        timer =setInterval(function () {
            toRight();
        },2500)
    }

    // 初始化函数
    function init() {
        $('.prev,.next').hide();
        addBtn();
        autoPlay();
    }


    // 给左按钮添加绑定事件
    $('.prev').on('click',function () {
        toLeft();
    })
    // 给右按钮添加绑定事件
    $('.next').on('click',function () {
        toRight();
    })
    // 给容器添加鼠标移入移出事件
    $('.container').hover(function () {
        $('.prev,.next').fadeIn();
        clearInterval(timer);
    },function () {
        $('.prev,.next').fadeOut();
        autoPlay();
    })


    // 调用初始化函数
    init();

})







