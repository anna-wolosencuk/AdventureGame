/**
 * @return {number}
 */
function VerifyInt(min,max,message) {
    // ask user question, verify it fits params, and send it back when it does
    console.log(message);
    let userAnsw;
    userAnsw = prompt(message);
    let validNum = 0;
    while(isNaN(userAnsw) || Number(userAnsw) >max || Number(userAnsw)<min) {
        console.log(userAnsw+" is invalid.\n"+message);
        userAnsw = prompt(userAnsw+" is invalid.\n"+message);
    }
    if(!isNaN(userAnsw)) {
        validNum = userAnsw;
    }
    return validNum;
}

/**
 * @return {string}
 */
function VerifyString(message) {
    console.log(message);
    let validString = "";
    let userAnsw = prompt(message);
    while(userAnsw== null) {
        console.log(userAnsw+" is invalid.\n"+message);
        let newMessage = userAnsw+" is invalid";
        newMessage+=message;
        userAnsw = prompt(newMessage);
    }

    validString+=userAnsw;
    return validString;
}

function WaitForKey() {
    console.log("Press enter to continue...");

}