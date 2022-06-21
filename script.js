const quoteSection = document.getElementById("quote");
const userInput = document.getElementById('quote-input');
const accuracy = document.getElementById('accuracy') 



let quote = "";
let time = 60;
let timer = "";
let errors = "";
var isClicked = false;

const dummyTextDisplay = () =>{
    
    let quote =  'The Journey of a thousand miles begins with one step'; 

    // Array of characters in the quote
    let arr = quote.split("").map((value) => {
        // wrap the character in a span tag
        return "<span class='quote-chars'>" + value +"</span>"
    });

    // join array for displaying
    quoteSection.innerHTML += arr.join(""); 
}

window.onload = () =>{
    userInput.value = ""; 
    document.getElementById("restart-test").style.display = "none";
}


// Logic for comparing input words with quote
userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll(".quote-chars");
    // create a array from recieved span tags
    quoteChars = Array.from(quoteChars);

    // array of user input character
    let userInputChars = userInput.value.split("");

    // loop through each character in quote
    quoteChars.forEach((char,index)=>{
        // Check if char(quote,character) = userInputChars
        // [index](input character)
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
    })
})

// Logic for comparing input words with quote
userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll('.quote-chars');

    // create an array from span tags
    quoteChars = Array.from(quoteChars);

    // array of user input characters
    let userInputChars = userInput.value.split("");

    // loop through each character in quote
    quoteChars.forEach((char,index)=>{
        // Check if char(quote character) - userInputChars [index](input character)
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }else if(userInputChars[index]==null){
            // Remove class if any
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }else{
                char.classList.remove("fail");
            }
        }
        // If user enter wrong character
        else{
            // Checks if we already have added fail class
            if(!char.classList.contains("fail")){
                // increment and display errors
                errors += 1;
                char.classList.add("fail");
                
            }
            accuracy.innerText =  Math.round((userInput.value.length - errors) / (userInput.value.length) * 100)   ;
            document.getElementById("errors").innerText = errors;
        }
        // Returns true if all the characters are entered correctly
        let check = quoteChars.every(element =>{
            return element.classList.contains("success");
        });
        // End test if all characters are correct
        if(check){
            displayResult();
        }
    })    

}) 

// Start Test

    userInput.addEventListener('click',()=>{
        errors = 0;
        timer=""; 
        timeReduce(); 
        quoteSection.innerText =""
        dummyTextDisplay();   
        userInput.clearInterval();
        isClicked = true; 
    })

    if (isClicked) {
        userInput.removeEventListener('click',()=>{
            errors = 0;
            timer=""; 
            timeReduce(); 
            quoteSection.innerText =""
            dummyTextDisplay();   
            userInput.clearInterval();
            isClicked = true; })
    }
    
    

// Update Time on screen
function updateTimer()
{
    if(time == 0){
        // End test if timer reaches 0
        displayResult();
    }else{
        document.getElementById("timer").innerText = --time +"s"
    }
}
// Sets timer
const timeReduce = () =>{
    time = 60;
    timer= setInterval(updateTimer,1000);
}

// End Test 
const displayResult = () =>{ 
    document.querySelector(".wpm-result").style.display = "block";
    document.querySelector(".cpm-result").style.display = "block";
    quoteSection.innerText ="click on restart to start the game"
    clearInterval(timer);  
    document.getElementById("restart-test").style.display = "block";
    userInput.disabled = true;

    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60 - time) / 100;
    }
    let words = userInput.value.split(' ');
    let letters = userInput.value.split('');
    
    let newLetters = letters.filter((letter)=>{
        return letter != ' '; 
    }); 
    document.getElementById("wpm").innerText = Math.round((words.length / timeTaken))  ;
    document.getElementById("cpm").innerText = Math.round((newLetters.length / timeTaken))   ;
    document.getElementById("accuracy").innerText =  Math.round((userInput.value.length - errors) / (userInput.value.length) * 100)  ;
};