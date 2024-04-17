/* You're given a time in the format HH:MM and some digits are replaced with ?. Replace them with numbers such that the result is a valid time and the latest possible valid time. */


/*
- It depends on the digit, yeah? First digit can only be 0 or 1, so if it's ?, we want 1
- Second digit we want 9 if first digit is 0, but 1 otherwise
- Third and fourth digit we always want 5 and 9 respectively, no?
- I am not sure how this is an algorithm? o_o 

*/



/**
 * @param {string} s
 * @return {string}
 */
function findLatestTime(s) {
    let [hours, minutes] = s.split(":")
    if (hours === "??") { hours = "11" }
    else if (hours[0] === "?") {
        if (Number(hours[1]) >= 2) {
            hours = "0" + hours[1]
        } else {
            hours = "1" + hours[1]
        }
    }
    else if (hours[1] === "?"){
        if (Number(hours[0]) === 0) {
            hours = hours[0] + "9"
        }
        else {
            hours = hours[0] + "1"
        }
    }
    if (minutes === "??") { minutes = "59" }
    else if (minutes[0] === "?") {
        minutes = "5" + minutes[1]
    }
    else if (minutes[1] === "?"){
        minutes = minutes[0] + "9"
    }
    return [hours, minutes].join(":")
};