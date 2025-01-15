const videoBtn = document.getElementById('videoBtn');
const videoPopup = document.getElementById('videoPopup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

videoBtn.onclick = function () {
    videoPopup.style.display = 'block';
    overlay.style.display = 'block';
}

closeBtn.onclick = function () {
    videoPopup.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.onclick = function () {
    videoPopup.style.display = 'none';
    overlay.style.display = 'none';
}
