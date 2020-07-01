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

$homecarousel
.on("init", function(event, slick) {
    //slick slider callback must be defined before creating slick object
    console.log("init");
    mouseWheel($homecarousel);

    var elSlide = $(slick.$slides[0]);
    var xpos = ($homecarousel.width() - elSlide.width())/2 ;
    $homecarousel.css('transform', 'translate3d(' + xpos +'px, 0px, 0px)');
})
.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    slickIsChanging = true;
    var elSlide = $(slick.$slides[nextSlide]);
    if (!$(elSlide).find('.citem').hasClass('is-open')) {
        var xpos = ($homecarousel.width() - elSlide.width())/2 ;
        $homecarousel.css('transform', 'translate3d(' + xpos +'px, 0px, 0px)');
    } else {
        $homecarousel.css('transform', 'translate3d(-3vw, 0px, 0px)');
    }
})
.on('afterChange', function(event, slick, currentSlide){
    slickIsChanging = false;
    var elSlide = $(slick.$slides[currentSlide]);
    $('.carouselstatus').html($(elSlide).find('figure').attr('data-title') + '<em>' + $(elSlide).find('figure').attr('data-description') + '</em>');

})
.slick({
    arrows: false,
    infinite: true,
    // centerMode: true,
    // centerPadding: 0,
    slidesToShow: 3,
    variableWidth: true,
    verticalSwiping: true,
    draggable: false,
    asNavFor: '.navcarousel',
    // focusOnSelect: true,
    // speed: 300,
});

$navcarousel.slick({
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: 0,
    slidesToShow: 11,
    variableWidth: true,
    asNavFor: '.homecarousel',
    focusOnSelect: true,
    // speed: 300,
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
    console.log("wheel");
    event.preventDefault();
    event.stopPropagation();

    var $slideContainer = $(this);
    if (!$slideContainer.hasClass("animating") && slickIsChanging == false) {
      $slideContainer.addClass("animating");
      var $homecarousel = event.data.$homecarousel;
      var delta = event.originalEvent.deltaY;
      if (delta > 0) {
        $homecarousel.slick("slickNext");
        
      } else {
        $homecarousel.slick("slickPrev");
        
      }

      setTimeout(function() {
        $slideContainer.removeClass("animating");
      }, 900);
    }
  }



// $homecarousel.on('wheel', (function(e) {
//     e.preventDefault();
//     if (e.originalEvent.deltaY < 0) {
//       $(this).slick('slickNext');
//     } else {
//       $(this).slick('slickPrev');
//     }
//   }));





$('.citem figure').on('click', 'a', function(e) {
    
    // e.preventDefault();
    if ( !$(this).closest('.slick-slide').hasClass('slick-current') ) {
        $homecarousel.slick('slickGoTo', $(this).closest('.slick-slide').attr('data-slick-index'));
    }
    if ( /*$(this).closest('.slick-slide').hasClass('slick-current') &&*/ $(this).closest('.citem').find('.ipanel').length ) {
        var curImg = $(this).find('img');
        if ( !$(this).closest('.citem').hasClass('is-open') ) {
            $(this).closest('.citem').addClass('is-open');
            $homecarousel.css('transform', 'translate3d(-3vw, 0px, 0px)');
        } else {
            $(this).closest('.citem').removeClass('is-open');
            var xpos = ($homecarousel.width() - curImg.width())/2 ;
            $homecarousel.css('transform', 'translate3d(' + xpos +'px, 0px, 0px)');
        } 
    }     
});



var poptions = {
    elements: {
        selectors: [
          '.homecarousel',
        ]
    }
};

Pace.start(poptions);

Pace.on('done', function() {
    $('.fordesktoponly').css('opacity','1');
});
