// Boat stuff //
let boatPOS = true; // T = left , F = right on water
let boatStatus = [0, "empty"]; // number of people, occupied or empty
boatTextOutput(); // display initial status of boat

// can/civ pair initial setting
const pairSet = 5;
const cann = []; /* cannibal array */
const civi = []; /* civilian array*/
const cannCounter = [pairSet,0]; // initial cannibal counter over 2 land area L and R
const civiCounter = [pairSet,0]; // initial civilian counter over 2 land area

// create the cannibals
for(xx=0; xx < pairSet ; xx++) {    

    cann[xx] = document.createElement("span");
    cann[xx].id = "cann"+xx; // add ID matching array index
    cann[xx].innerHTML = `<button id =` + cann[xx].id + ` class = "pairButton cann" onclick = "cannMove(this.id)"> </button>`; // have to use span + innerHTML due unable to assign .onlick = function(value) as will execute
    // failed eg
    // createElement("button")
    // .onclick = cannMove (this.id)   <<< cannot work, only accepts cannMove
    // use .onclick = fn () {this.id = ; return      }.... still doesnt work
    document.querySelector(".landL > .pairArea").append(cann[xx]);    

}

// create the civilians
for(xx=0; xx < pairSet ; xx++) {    
    civi[xx] = document.createElement("span");
    civi[xx].id = "civi"+xx;
    civi[xx].innerHTML = `<button id =` + civi[xx].id + ` class = "pairButton civi" onclick = "civiMove(this.id)"> </button>`; // have to use span + innerHTML due unable to assign .onlick = function(value) as will execute
    document.querySelector(".landL > .pairArea").append(civi[xx]);
}

// moving the boat
function boatMove() {
    if /* boat is empty */ (boatStatus[0] == 0) {
        boatStatus[1] = "EMPTY"; // change display to UpperC
        boatTextOutput();
        boatStatus[1] = "empty"; // reset for logic check
        return; // return without moving if empty
    }

    let aa = document.querySelector("#boat"); // select boat by ID
    if /* boat is occupied on left */ (boatPOS == true) {        
        aa.classList.add("boatMoveLR");
        aa.classList.remove("boatMoveRL");
        boatPOS = false; // set boatPOS on right on water
    } else if /* boat is occupied on right */ (boatPOS == false) {        
        aa.classList.add("boatMoveRL");
        aa.classList.remove("boatMoveLR");        
        boatPOS = true; // set boatPOS on left on water
        }

    // check of loss condition, cann vs civi
    console.log("cannCounter: ",cannCounter);
    console.log("civiCounter: ",civiCounter);
    
    if ((cannCounter[0] > civiCounter[0] && civiCounter[0] != 0) || (cannCounter[1] > civiCounter[1] && civiCounter[1] != 0)) {
        alert("You lose!");
        document.location.reload(); // reload page
    }
 } // close of boatMove()

 // cann button onclick //
function cannMove(idvalue) {
    
    areaCheck1 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("landL");
    areaCheck2 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("water");
    areaCheck3 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("landR");
    
    bb = idvalue.replace("cann",""); // get index of cann[] from ID
    
    // console.log(areaCheck1, areaCheck2, areaCheck3); // verify location info
    
    if /* boarding when boat full */ (boatStatus[0] == 2 && (areaCheck1 == true || areaCheck3 == true)) {
        boatStatus[1] = "OCCUPIED"; // change display to UpperC
        boatTextOutput();
        boatStatus[1] = "occupied"; // reset for logic check
        return;
        } else if /* board from left */ (areaCheck1 == true && boatPOS == true) {
            boatStatus[0]++;
            cannCounter[0]--;
            boatStatus[1] = "occupied";            
            document.querySelector(".water > #boat").append(cann[bb]);
            } else if /* board from right */ (areaCheck3 == true && boatPOS == false) {
                boatStatus[0]++;
                cannCounter[1]--;
                boatStatus[1] = "occupied";            
                document.querySelector(".water > #boat").append(cann[bb]);
                }
        
    if /* disembark to left */ (areaCheck2 == true && boatPOS == true) {
        boatStatus[0]--;
        cannCounter[0]++;
        document.querySelector(".landL > .pairArea").append(cann[bb]);
        } else if /* disembark to right */ (areaCheck2 == true && boatPOS == false) {
            boatStatus[0]--;
            cannCounter[1]++;
            document.querySelector(".landR > .pairArea").append(cann[bb]);
            }  
    
    if (boatStatus[0] == 0) {
        boatStatus[1] = "empty"            
        } // check boat empty before update boat text

    boatTextOutput();
} // close of cannMove()

// civi button onclick //
function civiMove(idvalue) {
    
    areaCheck1 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("landL");
    areaCheck2 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("water");
    areaCheck3 = document.getElementById(idvalue).parentElement.parentElement.classList.contains("landR");

    bb = idvalue.replace("civi",""); // get index from ID
    
    // console.log(areaCheck1, areaCheck2, areaCheck3); // verify location info
    
    if /* boarding when boat full */ (boatStatus[0] == 2 && (areaCheck1 == true || areaCheck3 == true)) {
        boatStatus[1] = "OCCUPIED"; // change display to UpperC
        boatTextOutput();
        boatStatus[1] = "occupied"; // reset for logic check
        return;
        } else if /* board from left */ (areaCheck1 == true && boatPOS == true) {
            boatStatus[0]++;
            civiCounter[0]--;
            boatStatus[1] = "occupied";            
            document.querySelector(".water > #boat").append(civi[bb]);
            } else if /* board from right */ (areaCheck3 == true && boatPOS == false) {
                boatStatus[0]++;
                civiCounter[1]--;
                boatStatus[1] = "occupied";            
                document.querySelector(".water > #boat").append(civi[bb]);
                }
        
    if /* disembark to left */ (areaCheck2 == true && boatPOS == true) {
        boatStatus[0]--; 
        civiCounter[0]++;       
        document.querySelector(".landL > .pairArea").append(civi[bb]);
        } else if /* disembark to right */ (areaCheck2 == true && boatPOS == false) {
            boatStatus[0]--;
            civiCounter[1]++;           
            document.querySelector(".landR > .pairArea").append(civi[bb]);
            // check win condition
            if /* check win when civi on right match initial pairSet value*/ (civiCounter[1] == pairSet) {
                alert("You WIN!!!!");
                document.location.reload();  
                }
            }
    
    if (boatStatus[0] == 0) {
        boatStatus[1] = "empty"            
        } // check boat empty before update boat text

    boatTextOutput();
} // close of civiMove()

// boat status UI update 
function boatTextOutput(){       
    document.getElementById("boatStatus").textContent = boatStatus[1] + ". " + boatStatus[0] + " onboard"; 
}



