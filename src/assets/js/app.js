import $ from 'jquery';
import 'what-input';
import 'slick-carousel';

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

$('.homecarousel').slick({
    arrows: true,
    // infinite: true,
    centerMode: true,
    centerPadding: 0,
    slidesToShow: 1,
    variableWidth: true
});

$('.citem figure').on('click', 'a', function(e) {
    e.preventDefault();
    $(this).closest('.citem').toggleClass('is-open');
    $('.carouselstatus').html($(this).closest('figure').attr('data-title') + '<em>' + $(this).closest('figure').attr('data-description') + '</em>');
    // alert($(this).closest('figure').attr('data-title'));

});
