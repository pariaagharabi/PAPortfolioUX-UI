let enterPassword = function () {
    let inputVal = document.getElementById('input').value;
    let pw = "2020";
    let correct = "Password correct. You may view my portfolio";
    let incorrectRed = "Password incorrect. Try again.";
    let incorrect = incorrectRed.fontcolor("red");
    if (inputVal === pw) {
        document.getElementById('message').innerHTML = correct;
        document.getElementById('hidden').style.display = "block";
        // document.getElementById('requestPW').style.display = "none";
    } else {
        document.getElementById('message').innerHTML = incorrect;
        document.getElementById('hidden').style.display = "none";
    }
}
