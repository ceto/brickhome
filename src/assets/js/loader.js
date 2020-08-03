window.paceOptions = {
    startOnPageLoad:false
}

import Pace from 'pace-progressbar';

function remove(element) {
    element.parentNode.removeChild(element);
}

Pace.start({
    minTime: 1200,
    ghostTime: 800,
    // catchupTime: 1000,
    // ajax: false, // disabled
    // document: false, // disabled
    // eventLag: false, // disabled
    elements: false,
    // elements: {
    //     selectors: [
    //         '.slick-slider > div:nth-child(18)',
    //         '.slick-slider > div:nth-child(19)',
    //         '.slick-slider > div:nth-child(20)',
    //         '.slides > li:nth-child(18)',
    //         '.slides > li:nth-child(19)',
    //         '.slides > li:nth-child(20)'
    //     ]
    // }
});
Pace.on('done', function () {

});
Pace.on('hide', function () {
    document.querySelector('.weare').style.opacity = '0';
    document.querySelector('.pace').style.opacity = '0';
});

setTimeout(function () {
    Pace.stop();
}, 3000);

setTimeout(function () {
    // Pace.stop();
    document.querySelector('.weare').remove(this.parentNode);
    // document.querySelector('.pace').remove(this.parentNode);
    
}, 5000);