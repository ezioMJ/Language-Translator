
let langOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector(".from");
let toVoice = document.querySelector(".to");
let cpyBtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');
let exchangeLang = document.querySelector('.bx-transfer');
let startRecognition = document.querySelector('#startRecognition');

langOption.forEach((get, con) => {
    for (let countryCode in language) {
        let selected;
        if (con == 0 && countryCode == "en-GB") {
            selected = "selected";
        } else if (con == 1 && countryCode == "ta-LK") {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);
    }
});

fromText.addEventListener('input', function () {
    let content = fromText.value;
    let fromContent = langOption[0].value;
    let transContent = langOption[1].value;

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

    fetch(transLINK).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText;
    });
});

fromVoice.addEventListener('click', function () {
    let fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
});

toVoice.addEventListener('click', function () {
    let fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langOption[1].value;
    speechSynthesis.speak(fromTalk);
});

cpyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(transText.value);
});

fromText.addEventListener('keyup', function () {
    countValue.innerHTML = `${fromText.value.length}/5000`;
});

exchangeLang.addEventListener('click', function () {
    let tempText = fromText.value;
    fromText.value = transText.value;
    transText.value = tempText;

    let tempOpt = langOption[0].value;
    langOption[0].value = langOption[1].value;
    langOption[1].value = tempOpt;
});


startRecognition.addEventListener('click', function () {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = langOption[0].value;
    recognition.onresult = function (event) {
        fromText.value = event.results[0][0].transcript;
        fromText.dispatchEvent(new Event('input'));
    };
    recognition.start();
});
