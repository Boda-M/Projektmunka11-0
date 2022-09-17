console.log("Js loaded");
let sticky;
let navbar;
function onLoad(){
    console.log("Page loaded");
    //Sticky navbar
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};
    // Get the navbar
    navbar = document.getElementById("navbar");
    // Get the offset position of the navbar
    sticky = navbar.offsetTop;
}
function loadQuestions(){
    addQuestion(1, "Kérdés 1", ["Kecske", "Capybara", "Ananász"]);
    addQuestion(2, "Kérdés 2", ["Kecske", "Capybara", "Ananász"]);
    addQuestion(3, "Kérdés 3", ["Kecske", "Capybara", "Ananász"]);
    addQuestion(4, "Kérdés 4", ["Kecske", "Capybara", "Ananász"]);
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

function addQuestion(id, question, answers){
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', "Nem akarok több betűt írni. Legyen elég a 8. -M"]
    let numAnswers = answers.length;
    let div = document.createElement("div");
    div.classList.add("question");

    let p = document.createElement("p");
    p.innerText = question;
    div.appendChild(p);
    
    for(let i = 0; i < numAnswers; i++){
        let rb = document.createElement("input");//Radio button
        rb.type = "radio";
        rb.id = ("q" + id + "a" + (i+1));
        rb.name = "q"+id;
        rb.value = "answer" + (i+1);
        div.appendChild(rb);

        let lb = document.createElement("label");//label
        lb.htmlFor = ("q" + id + "a" + (i+1));
        lb.innerText = letters[i] + ") " + answers[i];
        div.appendChild(lb);

        div.appendChild(document.createElement("br"));
    }
    document.getElementById("mid").appendChild(div);;
    //document.body.appendChild(div);
}