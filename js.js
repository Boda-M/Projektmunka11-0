console.log("Js loaded");
let sticky;
let navbar;
let questions;
let sumElement;
let rawQuestions;
function onLoad(){
    console.log("Page loaded");
    //Sticky navbar
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};
    // Get the navbar
    navbar = document.getElementById("navbar");
    // Get the offset position of the navbar
    sticky = navbar.offsetTop;

    rawQuestions = [
        /*["Kérdés", "Jó", ["Dummy 1", "Dummy 2"]],
        ["Kérdés2", "Jó", ["Dummy 1", "Dummy 2", "Dummy 3"]]*/
        ["Milyen anyagokat bocsájt ki a hidrogénaautó levegőn kívül?", "Vizet", ["Hidrogént", "Széndioxidot"]],
        ["Mióta van picaon hidrogénnel üzemelő autó?", "2014", ["1910", "2010", "2018"]],
        ["Mekkora a jelenleg forgalomban lévő maglevek végsebessége?", "430 km/h", ["130 km/h", "200 km/h", "870 km/h"]],
        ["A sebesség mellett milyen más előnye van a maglev vonatoknak?", "Csendesek", ["A szükséges energiát a levegőből nyerik ki", "Nem szükséges nekik sín, ugyanis lebegnek"]],
        ["Miért nevezik okosnak az okosotthont?", "Magától szabályozza az elektromos berendezéseket pl. a fűtést és a világítást", ["Megoldja a házi feladataidat", "Teljesíti a Turing tesztet"]]

    ];
    shuffleArray(rawQuestions);
}

function loadQuestions(){
    questions = new Array();
    /*
    questions.push(new Question(1, "Kérdés 1", "Kecske", ["Capybara", "Ananász"]));
    questions.push(new Question(2, "Kérdés 2", "Kecske", ["Capybara", "Ananász"]));
    questions.push(new Question(3, "Kérdés 3", "Kecske", ["Capybara", "Ananász"]));
    questions.push(new Question(4, "Kérdés 4", "Kecske", ["Capybara", "Ananász"]));
    */
    for(let i = 0; i < rawQuestions.length; i++){
        //questions.push(new Question(4, "Kérdés 4", "Kecske", ["Capybara", "Ananász"]));
        questions.push(new Question(i, rawQuestions[i][0], rawQuestions[i][1], rawQuestions[i][2]));
    }
    sumElement = document.getElementById("sum");
    sumElement.innerText = ("0/" + questions.length);
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

class Question{
    constructor (id, question, correct, answers, maxScore = 1){
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', "Nem akarok több betűt írni. Legyen elég a 8. -M"]
        answers.push(correct);//Add the correct answer to the wrong ones and shuffle
        shuffleArray(answers);
        this.correct = correct;
        this.question = question;
        this.maxScore = maxScore;
        this.numAnswers = answers.length;
        this.div = document.createElement("div");
        this.div.classList.add("question");
    
        this.header = document.createElement("div");//Create question header
        this.header.classList.add("questionHeader");
        
        this.title = document.createElement("p");//Add title to header
        this.title.classList.add("questionTitle");
        this.title.innerText = this.question;
        this.header.appendChild(this.title);
    
        this.score = document.createElement("p");//Add score to header
        this.score.classList.add("questionScore");
        this.score.innerText = "0/" + this.maxScore;
        this.header.appendChild(this.score);
    
        this.div.appendChild(this.header);
        this.buttons = new Array();
        this.labels = new Array();
        for(let i = 0; i < this.numAnswers; i++){
            let rb = document.createElement("input");//Radio button
            this.buttons.push(rb);//store the button html elements for later 
            rb.type = "radio";
            rb.id = ("q" + id + "a" + (i+1));
            rb.name = "q"+id;
            rb.value = answers[i];
            this.div.appendChild(rb);
    
            let lb = document.createElement("label");//label
            this.labels.push(lb);
            lb.htmlFor = ("q" + id + "a" + (i+1));
            lb.innerText = letters[i] + ") " + answers[i];
            this.div.appendChild(lb);
    
            this.div.appendChild(document.createElement("br"));
        }
        let parent = document.getElementById("mid");
        //if(parent.childNodes.length > 0){
            //console.log(parent.children[parent.children.length-1]);
            parent.insertBefore(this.div, parent.children[parent.children.length-1]);//There is always at least one child
        /*}else{
            parent.appendChild(this.div);
        }*/
        //document.body.appendChild(div);
    }

    logButtons() {
        for(let i = 0; i < this.numAnswers; i++){
            console.log(i + ": " + this.buttons[i].value + " (" + this.buttons[i].checked + ")")
        }
    }

    check(){
        this.resetScoring();//Remove any previous highlighting
        for(let i = 0; i < this.numAnswers; i++){
            if(this.buttons[i].checked && this.buttons[i].value === this.correct){
                this.setCorrect(i);
                return this.maxScore;
            }
        }
        this.setWrong();
        return 0;
    }

    setCorrect(correctIndex){//Sets the score to max and green
        this.labels[correctIndex].classList.add("correctLabel");
        this.score.innerText = (this.maxScore + "/" + this.maxScore);
        this.score.classList.remove("wrong");
        this.score.classList.add("correct");
    }

    resetScoring(){
        for(let i = 0; i < this.numAnswers; i++){
            this.labels[i].classList.remove("correctLabel");
            this.labels[i].classList.remove("wrongLabel");
            this.labels[i].classList.remove("actualLabel");
        }
        this.score.innerText = ("0/" + this.maxScore);
        this.score.classList.remove("wrong");
        this.score.classList.remove("correct");
    }

    setWrong(){//Sets the score to 0 and red
        for(let i = 0; i < this.numAnswers; i++){
            if(this.buttons[i].checked){//The one the user chose - wrong
                this.labels[i].classList.add("wrongLabel");
            }
            if(this.buttons[i].value == this.correct){//The actual solution
                this.labels[i].classList.add("actualLabel");
            }
        }
        this.score.innerText = ("0/" + this.maxScore);
        this.score.classList.remove("correct");
        this.score.classList.add("wrong");
    }

    
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkAll(){
    let sum = 0;
    for(let i = 0; i < questions.length; i++){
        sum += questions[i].check();
    }
    sumElement.innerText = (sum + "/" + questions.length);
}