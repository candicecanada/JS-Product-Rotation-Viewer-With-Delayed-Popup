// Chaoqun Ding

// public variables:
let animationFrameHandler;
let animationTimeout;
// if user doesn't click on any button (Start, Stop, Reverse), show the pop-up window after 3 seconds.
const popupTimeout = setTimeout(showPopupWindow, 3000);
// function that make popup window visible.
function showPopupWindow(){
    // popup window fades in with opacity from 0 to 1 in 1 second.
    $("#pop-up").css({"opacity": 1, "transition": "opacity 1s"});
}
// hide the pop-up window once user clicks on the "Close" button.
$("#pop-up-close").on("click", function(){
    $("#pop-up").css("display", "none");
})
// if user clicks on any button (Start, Stop, Reverse), do not show the pop-up window.
$("#start").on("click", function(){
    clearTimeout(popupTimeout);
    // always clearout the previous timeout to avoid speeding up the spinning animaton.
    clearTimeout(animationTimeout);
    // if user clicks on the "Start" button, play the animation.
    // (since the startAnimation method updates the initial state to next state immediately, should use setTimeout with 100ms delay from this point.
    animationTimeout = setTimeout(function(){
        animationFrameHandler = requestAnimationFrame(startAnimation)
    }, 100)
})
$("#stop").on("click", function(){
    clearTimeout(popupTimeout);
    // if user clicks on the "Stop" button, stop the animation immediately.
    clearTimeout(animationTimeout);
    cancelAnimationFrame(animationFrameHandler);
})
$("#reverse").on("click", function(){
    clearTimeout(popupTimeout);
    // always clearout the previous timeout to avoid speeding up the spinning animaton.
    clearTimeout(animationTimeout);
    // if user clicks on the "Reverse" button, play the animation in another direction.
    // (since the reverseAnimation method updates the initial state to next state immediately, should use setTimeout with 100ms delay from this point.
    animationTimeout = setTimeout(function(){
        animationFrameHandler = requestAnimationFrame(reverseAnimation)
    }, 100)
})

function startAnimation(){
    // extact the index of current image:
    let index = $("#product-image img").attr("alt").match(/\d+/)[0];
    // if the current product image has an index that is between 1 - 33, increase the index by 1.
    if(index < 34 && index > 0){
        index++;
    }
    // if the current product image is the last one with index of 34, set the index to 1.
    if(index == 34){
        index = 1;
    }
    // update image with new src and alt.
    $("#product-image img").attr({"src": `../product-images/bike-${index}.jpg`, "alt": `Bike ${index}`})
    // slow down the animation spinning speed to 100ms.
    animationTimeout = setTimeout(function(){
        animationFrameHandler = requestAnimationFrame(startAnimation)
    }, 100)
}
function reverseAnimation(){
    // extact the index of current image:
    let index = $("#product-image img").attr("alt").match(/\d+/)[0];
    // if the current product image has an index that is between 2 - 34, decrease the index by 1.
    if(index <= 34 && index > 1){
        index--;
    }
    // if the current product image is the last one with index of 1, set the index to 34.
    if(index == 1){
        index = 34;
    }
    // update image with new src and alt.
    $("#product-image img").attr({"src": `../product-images/bike-${index}.jpg`, "alt": `Bike ${index}`})
    // slow down the animation spinning speed to 100ms.
    animationTimeout = setTimeout(function(){
        animationFrameHandler = requestAnimationFrame(reverseAnimation)
    }, 100)
}