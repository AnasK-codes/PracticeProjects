const display = document.querySelector("#display")
const keys = document.querySelector(".keys")
const operatorbtn = document.querySelectorAll(".operator-btn")
const button = document.querySelectorAll(".button")
const displaytxt = document.querySelector("#displaytext")


button.forEach((btn) => {
    btn.addEventListener("click",()=>{
        console.log("Adding event listener to:", btn.textContent);

        appendToDisplay(btn.textContent)


        
    })
    
    
});

function appendToDisplay(key){
    displaytxt.textContent += key 
}
function clearDisplay(){
    displaytxt.textContent=""
}
function backspace(){
    newtxt = displaytxt.textContent.slice(0,-1)
    displaytxt.textContent = newtxt
}

function calculate(){
    try {
       let answer = eval(displaytxt.textContent)
       displaytxt.textContent += '=' + answer 
        
    } catch (error) {
        displaytxt.textContent="Error"
        
    }




}

