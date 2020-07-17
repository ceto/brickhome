import $ from 'jquery';
import 'what-input';
import 'slick-carousel';
import AOS from 'aos';
import pace from 'pace-js-amd-fix';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

AOS.init({
    offset: 48,
    duration: 400,
    easing: "ease-in-out-sine",
    delay: 0,
    once: true,
    //anchor-placement: 'top-bottom',
    disable: "mobile"
});

var slickIsChanging = false;

const $homecarousel = $('.homecarousel');
const $navcarousel = $('.navcarousel');

var bigLeft = $homecarousel.offset().left;
var ipanelPad = document.documentElement.clientWidth/100*3;
var isTrackpad = false;

$(window).bind('resize', function () { 
    bigLeft = $homecarousel.offset().left;
    ipanelPad = document.documentElement.clientWidth/100*3;
});


function detectTrackPad(e) {
    isTrackpad = false;
    if (e.wheelDeltaY) {
        // console.log(e.wheelDeltaY +' | ' + (e.deltaY * -3));
      if (e.wheelDeltaY === (e.deltaY * -3)) {
        isTrackpad = true;
      }
    }
    else if (e.deltaMode === 0) {
      isTrackpad = true;
    }
    console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
}
  
document.addEventListener("mousewheel", detectTrackPad, false);
document.addEventListener("DOMMouseScroll", detectTrackPad, false);


$homecarousel
.on("init", function(event, slick) {
    //slick slider callback must be defined before creating slick object
    mouseWheel($homecarousel);
    var elSlide = $(slick.$slides[slick.slickGetOption('initialSlide')]);
    $('.carouselstatus').html($(elSlide).find('figure').attr('data-title') + '<em>' + $(elSlide).find('figure').attr('data-description') + '</em>');
    
})
.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    slickIsChanging = true;
    $('.carouselstatus').addClass('willchange');
})
.on('afterChange', function(event, slick, currentSlide){
    slickIsChanging = false;
    var elSlide = $(slick.$slides[currentSlide]);
    var matrix = $(elSlide).closest('.slick-track').css('transform').replace(/[^0-9\-.,]/g, '').split(',');
    var x = parseInt(matrix[12] || matrix[4]);
   
    if ( $(elSlide).find('figure[data-title]').length ) {
        $('.carouselstatus').html($(elSlide).find('figure').attr('data-title') + '<em>' + $(elSlide).find('figure').attr('data-description') + '</em>');
    } else {
        $('.carouselstatus').html('&nbsp;');
    }

    if ($(elSlide).find('.citem').hasClass('is-open')) {
        var igazIt = parseInt( ipanelPad + $(elSlide).find('.citem').offset().left - bigLeft);
        setTimeout(function() {
            $(elSlide).closest('.slick-track').css('transform', 'translate3d(' + parseInt(x - igazIt) +'px, 0px, 0px)');
        }, 0);
    } else {
        $('.carouselstatus').removeClass('willchange');
    }
})
.slick({
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon"><use xlink:href="#icon-caret-left"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon"><use xlink:href="#icon-caret-right"></use></svg></button>',
    appendArrows: '.carouselwrap',
    infinite: false,
    initialSlide: 1,
    centerMode: true,
    centerPadding: 0,
    slidesToShow: 3,
    variableWidth: true,
    verticalSwiping: false,
    draggable: false,
    asNavFor: '.navcarousel',
    // focusOnSelect: true,
    speed: 300,
    // cssEase: 'ease-out',
    // easing: 'ease-out',
    useCSS: false,
    // useTransform: false
    
});

$navcarousel.slick({
    arrows: false,
    infinite: false,
    initialSlide: $homecarousel.slick('slickGetOption','initialSlide'),
    centerMode: true,
    centerPadding: 0,
    slidesToShow: 11,
    variableWidth: true,
    asNavFor: '.homecarousel',
    focusOnSelect: true,
    speed: $homecarousel.slick('slickGetOption','speed'),
    cssEase: 'ease-out',
    // easing: 'ease-out'
});
  


function mouseWheel($homecarousel) {
    $homecarousel.on(
        "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
        {
        $homecarousel: $homecarousel
        },
        mouseWheelHandler
    );
}



function mouseWheelHandler(event) {
    // console.log(event);
    event.preventDefault();
    // event.stopPropagation();

    var $slideContainer = $(this);
    if (!$slideContainer.hasClass("scrolling") && slickIsChanging == false) {
        $slideContainer.addClass("scrolling");
        var $homecarousel = event.data.$homecarousel;
        var delta = event.originalEvent.deltaY;
        if (delta > 0) {
            if ( ($homecarousel.slick('slickCurrentSlide') + 1) < $homecarousel.slick('getSlick').slideCount ) {
                $homecarousel.slick('slickNext', false);
            }
        } else  {
            if ( $homecarousel.slick('slickCurrentSlide') > 0) { $homecarousel.slick('slickPrev', false); }
        }

        if (!isTrackpad) {
            setTimeout(function() {
                $slideContainer.removeClass("scrolling");
            }, 300);
        } else {
            setTimeout(function() {
                $slideContainer.removeClass("scrolling");
            }, 1000);
        }
    }
}





$('.citem figure').on('click', 'a', function(e) {
    
    // e.preventDefault();
    var ize=$(this);

    if ( /*$(this).closest('.slick-slide').hasClass('slick-current') &&*/ $(this).closest('.citem').find('.ipanel').length ) {
        if ( $(this).closest('.citem').hasClass('is-open') ) {
            $(this).closest('.citem').removeClass('is-open');
            $('.carouselstatus').removeClass('willchange');
            // setTimeout(function() {
            //     $homecarousel.slick('slickGoTo', $(ize).closest('.slick-slide').attr('data-slick-index'), true);
            // }, 300); 
        } else {
            $(this).closest('.citem').addClass('is-open');
            $('.carouselstatus').addClass('willchange');
            // setTimeout(function() {
            //    $homecarousel.slick('slickGoTo', $(ize).closest('.slick-slide').attr('data-slick-index'), true);
            // }, 0);
        }
         
    }
});



window.paceOptions = {
    elements: {
        startOnPageLoad: false,
        // minTime: 3250,
        // ghostTime: 2000,
        // catchupTime: 3000,
        selectors: [
          '.slick-slider > div:nth-child(1)',
          '.slick-slider > div:nth-child(2)',
          '.slick-slider > div:nth-child(3)',
          '.slides > li:nth-child(1)',
          '.slides > li:nth-child(2)',
          '.slides > li:nth-child(3)'
        ]
    }
};

Pace.start({
    startOnPageLoad: false,
    minTime: 800,
    ghostTime: 200,
    //catchupTime: 3000,
    elements: {
        selectors: [
          '.slick-slider > div:nth-child(1)',
          '.slick-slider > div:nth-child(2)',
          '.slick-slider > div:nth-child(3)',
          '.slides > li:nth-child(1)',
          '.slides > li:nth-child(2)',
          '.slides > li:nth-child(3)'
        ]
    }
});
Pace.on('done', function() {
    $('.weare').css('opacity', '0');
    $('.pace').css('opacity', '0');
    setTimeout(function(){
        $('.weare').remove();
        $('.pace.pace-inactive').remove();
    },1200);
});



$('.slidecard figure').on('click', 'a', function(e) {
    // e.preventDefault();
    if ( $(this).closest('.slidecard').find('.ipanel').length ) {        
        if ( !$(this).closest('.slidecard').hasClass('is-open') ) {
            $(this).closest('.slidecard').addClass('is-open');
        } else {
            $(this).closest('.slidecard').removeClass('is-open');
        } 
    }     
});