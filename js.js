console.log("Js loaded");
let sticky;
let navbar;
function onLoad(){
    console.log("Page loaded");
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the navbar
    navbar = document.getElementById("navbar");

    // Get the offset position of the navbar
    sticky = navbar.offsetTop;
}
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    //var navbar = document.getElementById("navbar2");
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");  
    } 
}