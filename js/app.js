// Las "llaves" de encryptación que utilizaremos son las siguientes:

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

// Requisitos:

// Debe funcionar solo con letras minúsculas
// No deben ser utilizados letras con acentos ni caracteres especiales
// Debe ser posible convertir una palabra para la versión encryptada también devolver una palabra encryptada para su versión original.
// Por ejemplo:

// "gato" => "gaitober"
// gaitober" => "gato"

// La página debe tener campos para
// inserción del texto que será encryptado o desencryptado, y el usuario debe poder escoger entre as dos opciones.
// El resultado debe ser mostrado en la pantalla.
// Extras:

// Un botón que copie el texto encryptado/desencryptado para la sección de transferencia, o sea que tenga la misma funcionalidad del ctrl+C o de la opción "copiar" del menú de las aplicaciones.
// Tenemos un periodo de tiempo de cuatro semanas para desarrollar el proyecto y vamos a trabajar con el sistema ágil de desarrollo, utilizando el Trello de la siguiente forma:


const arrEncrypt = [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufat']];
const arrAccentedCharacters = [['á', 'a'], ['é', 'e'], ['í', 'i'], ['ó', 'o'], ['ú', 'u'], ['ñ', 'n']];
const arrSpecialCharacters = [['!', ''], ['@', ''], ['#', ''], ['$', ''], ['%', ''], ['&', ''], ['/', ''], ['(', ''], [')', ''], ['=', ''], ['?', ''], ['¡', ''], ['¿', ''], ['*', ''], ['-', ''], ['_', ''], ['+', ''], [';', ''], [':', ''], ['.', ''], [',', ''], ['<', ''], ['>', ''], ['[', ''], [']', ''], ['{', ''], ['}', ''], ['|', ''], ['"', ''], ["'", ''], ['\\', ''], ['^', ''], ['~', ''], ['`', ''], ['¨', ''], ['´', '']];
const regexSpecialCharacters = /^[^a-zA-Z0-9\s]+$/; // Expresión regular para caracteres especiales
const regexAccentedCharacters = /^[áéíóúñ]+$/; // Expresión regular para caracteres acentuados
const regexUppercaseCharacters = /^[A-Z]+$/; // Expresión regular para caracteres acentuados

const $txaInText = document.querySelector('#txa-inText');
const $btnEncrypt = document.querySelector('#btn-encrypt');
const $btnDecript = document.querySelector('#btn-decrypt');
const $pOutText = document.querySelector('#p-outText');
const $divBtnCopy = document.querySelector('#div-btn--copy');
const $divResultMsj = document.querySelector('#div-result-mjs');
const $iconPaste = document.querySelector('.icon-paste');
// let $pOutTextInit;



let verify;
let decriptedText = "";
let initialStatus = true;
let $pOutTextInit;
let $imgDiamond;


function initialState(status) {
    if (document.querySelector('#p-outText-init') !== null) {
        $pOutTextInit = document.querySelector('#p-outText-init');
    } else {
        $pOutTextInit = document.createElement('p');
    }

    if (status) {
        // creo la img del diamante
        $imgDiamond = document.createElement('img');
        $imgDiamond.classList.add('img-diamond');
        $imgDiamond.src = "./img/Muñeco.png";
        $imgDiamond.alt = "Dibujo diamante";
        $divResultMsj.appendChild($imgDiamond);

        // creo el párrafo de mensaje inicial
        $pOutTextInit.id = "p-outText-init";
        $pOutTextInit.classList.add('out-text__result--p1');
        $divResultMsj.appendChild($pOutTextInit);

        let $spanLetterW = document.createElement('span');
        $spanLetterW.classList.add('letter-w');
        $spanLetterW.textContent = "Ningún mensaje fue encontrado";
        $pOutTextInit.appendChild($spanLetterW);

        let $spanLetterL = document.createElement('span');
        $spanLetterL.classList.add('letter-l');
        $spanLetterL.textContent = "Ingresa el texto que desees encriptar o desencriptar";
        $pOutTextInit.appendChild($spanLetterL);

        // creo el parrafo de mensaje resultado
        let $pOutText = document.createElement('p');
        $pOutText.id = "p-outText";
        $pOutText.classList.add('out-text__result--p2');
        $divResultMsj.appendChild($pOutText);

        $divBtnCopy.innerHTML = "";
        $txaInText.value = "";
        $pOutText.textContent = "";


    }
    // cambios si el estado es false
    if (status === false) {
        console.log("Entre al else");
        console.log("status: " + status);
        console.log("$pOutTextInit: " + $pOutTextInit);
        $pOutTextInit.innerHTML = "";
        $imgDiamond.querySelector('.img-diamond');
        $imgDiamond.remove();
    }
}

function addBtnCopy() {
    let $btnCopy = document.createElement('button');
    $btnCopy.id = "btn-copy";
    $btnCopy.classList.add('controls-btns__btn');
    $btnCopy.classList.add('controls-btns__btn--copy');
    $btnCopy.type = "submit";
    $btnCopy.textContent = "Copiar";
    $divBtnCopy.appendChild($btnCopy);
}

function verifyText(text) {
    verify = false;
    for (let i = 0; i < text.length; i++) {
        if (regexSpecialCharacters.test(text[i]) || regexAccentedCharacters.test(text[i]) || regexUppercaseCharacters.test(text[i])) {
            verify = true;
            i = text.length;
        }
    }
    return verify;
}

function encryptCharacter(letter) {
    let encryptedLetter = "";
    for (let i = 0; i < arrEncrypt.length; i++) {
        if (letter === arrEncrypt[i][0]) {
            encryptedLetter = arrEncrypt[i][1];
        }
    }

    return encryptedLetter;
}

function encryptText(text) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        let encryptedTextPartial = encryptCharacter(text[i]);

        if (encryptedTextPartial === "") {
            encryptedText += text[i];
        } else {
            encryptedText += encryptedTextPartial;
        }
    }
    return encryptedText;
}

function writeResultText(text) {
    $pOutText.textContent = text;
}

function decryptCharacter(letter) {
    let objDecryptedLetter = {};
    for (let i = 0; i < arrEncrypt.length; i++) {
        let masterKey = arrEncrypt[i];
        // console.log("masterKey: " + masterKey[1] + " length: " + masterKey[1].length);
        if (letter === masterKey[1][0]) {
            objDecryptedLetter.letter = masterKey[0];
            objDecryptedLetter.length = masterKey[1].length;
        }
    }
    if (objDecryptedLetter.letter === undefined) {
        objDecryptedLetter.letter = letter;
        objDecryptedLetter.length = 1;
    }
    console.log("objDecrypted => Letter: " + objDecryptedLetter.letter + " length: " + objDecryptedLetter.length);

    // AQUI VOY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return objDecryptedLetter;
}

function decryptText(text, controlIndex = 0) {
    if (controlIndex < text.length) {
        for (let i = controlIndex; i < text.length; i++) {
            if (text[controlIndex] !== undefined) {
                console.group("i: " + i);
                console.log("controlIndex: " + controlIndex);
                console.log("letra a evaluad: " + text[controlIndex]);
                console.log("text.length: " + text.length);
                objDecrypted = decryptCharacter(text[controlIndex]);
                decriptedText += objDecrypted.letter;
                controlIndex += objDecrypted.length;
                console.log("decriptedText: " + decriptedText);
            }
        }
        decryptText(text, controlIndex);
    }
    console.log(decriptedText);
    console.groupEnd();
    return decriptedText;
}

function copyResultText() {
    let textToCopy = $pOutText.textContent;
    navigator.clipboard.writeText(textToCopy);
    $iconPaste.classList.remove('icon-paste--disabled');
    $iconPaste.classList.add('icon-paste--enabled');

}

function pasteResultText() {
    navigator.clipboard.readText()
        .then(textToPaste => {
            $txaInText.value = textToPaste;

        })
        .catch(error => {
            console.error('Error al pegar desde el portapapeles:', error);
        });
}

// Eventos *****************************************
// agrego el evento al botón de encryptar
$btnEncrypt.addEventListener('click', (e) => {
    e.preventDefault();
    exeEncryptDecrypt("encrypt");
});

// agrego el evento al botón de desencryptar
$btnDecript.addEventListener('click', (e) => {
    e.preventDefault();
    exeEncryptDecrypt("decript");
});

// agrego el evento al icono de pegar
$iconPaste.addEventListener('click', (e) => {
    e.preventDefault();
    pasteResultText();
});

// Agrega un evento input al textarea
$txaInText.addEventListener('input', function (e) {
    e.preventDefault();
    // Convierte el texto a minúsculas y actualiza el valor del textarea
    this.value = this.value.toLowerCase();
});





// Funciones Principal *******************************
if (initialStatus) {
    initialState(initialStatus);

}
// intialSt

function exeEncryptDecrypt(f) {
    let textToEncryptDecrypt = $txaInText.value;
    let textEncryptedDecrypted = "";
    $pOutText.textContent = "";
    decriptedText = "";


    // verifico que el texto no tenga caracteres especiales, acentuados o mayúsculas
    let verify = verifyText(textToEncryptDecrypt);
    if (verify) {
        alert("El texto no puede contener caracteres especiales, acentuados o mayúsculas");
    } else {
        if (f === "encrypt") {
            let encryptedText = encryptText(textToEncryptDecrypt);
            textEncryptedDecrypted = writeResultText(encryptedText);
        }
        if (f === "decript") {
            let decryptedText = decryptText(textToEncryptDecrypt);
            textEncryptedDecrypted = writeResultText(decryptedText);
        }
    }
    if (document.querySelector('#btn-copy') === null) {
        addBtnCopy();
        let $btnCopy = document.querySelector('#btn-copy');

        // agrego el evento al botón de copiar
        $btnCopy.addEventListener('click', (e) => {
            e.preventDefault();
            copyResultText();
        });
        initialStatus = false;
        initialState(initialStatus);
    }
}


