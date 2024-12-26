function setRedirectUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectUrl = urlParams.get('redirect');

    if (redirectUrl) {
        document.getElementById('link').href = redirectUrl;
    }

    if (window.history.replaceState) {
        const urlWithoutQuery = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: urlWithoutQuery }, '', urlWithoutQuery);
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        enterPassword();
    }
}

let enterPassword = function () {
    let inputVal = document.getElementById('input').value;
    let pw = "paria2025";
    let incorrect = "<span style='color: red'>Password incorrect. Try again.</span>";
    if (inputVal === pw) {
        document.getElementById('message').innerHTML = "";
        document.getElementById('hidden').style.display = "block";
        window.location.href = document.getElementById('link').href;
    } else {
        document.getElementById('message').innerHTML = incorrect;
        document.getElementById('hidden').style.display = "none";
    }
}

setRedirectUrl();