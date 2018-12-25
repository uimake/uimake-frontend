var TimeLine = function () {
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    function hideBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }

    hideBlocks(timelineBlocks, offset);
    $(window).on('scroll', function () {
        (!window.requestAnimationFrame)
            ? setTimeout(function () { showBlocks(timelineBlocks, offset); }, 100)
            : window.requestAnimationFrame(function () { showBlocks(timelineBlocks, offset); });
    });
}

// nav
var NavE = function () {
    // 首页nav滚动效果
    $(document).on('scroll', function () {
        if ($(document).scrollTop() < 100) {
            $('#nav-scroll').removeClass('navbar-default').addClass('navbar-inverse');
        } else {
            $('#nav-scroll').removeClass('navbar-inverse').addClass('navbar-default');
        }
    });
}

var Progress = function () {
    ///加载条
    try {
        NProgress.start();
    } catch (e) {
        // console.log('㷩㷩㷩');
    }
    //顶部加载条
    $(window).load(function () {
        try {
            NProgress.done();
            $('.container.list').css({ opacity: 1 });
        } catch (e) {
            // console.log('进度条');
        }
    });
}

var Banner = function () {
    //banner
    $("#owl-demo").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        navText: ["<i class='fa fa-angle-left fa-4x'></i>", "<i class='fa fa-angle-right fa-4x'></i>"],
        navigationText: ["<i class='fa fa-angle-left fa-4x'></i>", "<i class='fa fa-angle-right fa-4x'></i>"],
        singleItem: true
    });
}

//weixin
var WeiXin = function () {
    var m = $('html').hasClass('touch'),
        $tip = $('.tip');
    if (!m) {
        $('.fa-weixin').hover(function () {
            $tip.css({ 'height': '118px' });
        }, function () {
            $tip.css({ 'height': '0' });
        });
    } else {
        $(document).on('click', function (e) {
            var h = $tip.height();
            var wx = e.target.id;
            if ((h == 0) && (wx == 'weixin')) {
                $tip.css({ 'height': '118px' });
            } else if (h == 118) {
                $tip.css({ 'height': '0' });
            }
        })
    }
};

//列表页
var ItemList = function () {
    //列表页
    var $wrapSort = $('#container-sort');
    var $itemWidth = $('#container-sort .item');
    var $container = $wrapSort.imagesLoaded(function () {
        $container.isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });

    //动态计算
    var isoItemWidth = function () {
        var $wrapSortWidth = $wrapSort.width();
        if ($(document).width() < 767) {
            $itemWidth.outerWidth($wrapSortWidth / 2);
        } else {
            $itemWidth.outerWidth($wrapSortWidth / 4);
        }
    }
    //
    isoItemWidth();
    $(window).resize(isoItemWidth);

    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });
}

var Details = function () {
    //详情页
    $('.fancybox').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        afterLoad: function () {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });
}

var Fold = function () {
    ///////////////////jobs//////////////////////
    $('.list-group a').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var change = $this.find('>div').css('display');
        //alert(change);
        if (change == 'none') {
            $this.find('i').removeClass('fa-plus').addClass('fa-minus');
        } else {
            $this.find('i').removeClass('fa-minus').addClass('fa-plus');
        }
    });
}

$(document).ready(function () {
    TimeLine();
    NavE();
    Progress();
    Banner();
    WeiXin();
    ItemList();
    Details();
    Fold();
});
