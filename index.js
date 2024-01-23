// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-57be4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const textareaEl = document.getElementById("textarea")
const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById('endorsements')

publishBtn.addEventListener('click', function(){
    push(endorsementsInDB, textareaEl.value)
    console.log(`${textareaEl.value} has been added to the database`)
    textareaEl.value = ""
})

onValue(endorsementsInDB, function(snapshot){
    if (snapshot.exists()){
        let endorsementsArray = Object.entries(snapshot.val())
    endorsementsEl.innerHTML = ""
    for (let i = 0; i < endorsementsArray.length; i++){
        
        let currentIndex = endorsementsArray[i]
        let endorsementID = currentIndex[0]
        let endorsementValue = currentIndex[1]
        appendEndorsements(currentIndex)
        
    } 
    } else {
        endorsementsEl.innerHTML = "no endorsements yet"
    }
   
})

function appendEndorsements(inputValue){
    let inputID = inputValue[0]
    let Value = inputValue[1]
    let newEl = document.createElement("li")
    newEl.textContent = Value
    endorsementsEl.append(newEl)
    
    newEl.addEventListener('dblclick', function(){
    let newElidLocation = ref(database, `endorsements/${inputID}`)
    remove(newElidLocation)
})
}



