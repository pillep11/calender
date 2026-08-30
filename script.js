// =========================================================
//  MINU KALENDER
//  Kogu kalendri "aju" on selles failis. HTML-is on ainult
//  tühi kast (<div id="calendari">), kuhu me siin päevad joonistame.
// =========================================================

// Nädalapäevade nimed. Esimene on esmaspäev, sest kalender algab E-ga.
const NADALAPAEVAD = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Kuude nimed. Number kuu (0=jaanuar) kaudu leiame siit õige nime.
const KUUD = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// See kuupäev näitab, MILLIST kuud parasjagu kuvame.
let naidatavKuu = new Date();

// Kast HTML-ist, kuhu tabeli paneme.
const kalendriKast = document.getElementById("calendari");


function joonistaKalender(suund) {

    const tana = new Date();

    const kuu   = naidatavKuu.getMonth();
    const aasta = naidatavKuu.getFullYear();

    const esimene = new Date(aasta, kuu, 1);
    let algusNihe = esimene.getDay() - 1;
    if (algusNihe < 0) algusNihe = 6;

    const tabel = document.createElement("table");

    // 1. rida: nupud + kuu nimi + aasta
    let html = "<tr>";
    html += "<th colspan='2'><button class='boto-prev'>&#9664;</button></th>";
    html += "<th colspan='3'>" + KUUD[kuu] +
            "<span class='any'>" + aasta + "</span></th>";
    html += "<th colspan='2'><button class='boto-next'>&#9654;</button></th>";
    html += "</tr>";

    // 2. rida: nädalapäevade nimed
    html += "<tr>";
    for (let i = 0; i < 7; i++) {
        html += "<th>" + NADALAPAEVAD[i] + "</th>";
    }
    html += "</tr>";

    // Päevade ruudustik: 6 nädalat x 7 päeva
    let paev = new Date(aasta, kuu, 1 - algusNihe);

    for (let nadal = 0; nadal < 6; nadal++) {
        html += "<tr>";
        for (let n = 0; n < 7; n++) {

            const omaKuus = (paev.getMonth() === kuu);

            const onTana =
                paev.getDate()     === tana.getDate()  &&
                paev.getMonth()    === tana.getMonth() &&
                paev.getFullYear() === tana.getFullYear();

            let klass = "";
            if (!omaKuus) klass += " fora";
            if (onTana)   klass += " avui";

            html += "<td class='" + klass.trim() + "'><span>" +
                    paev.getDate() + "</span></td>";

            paev.setDate(paev.getDate() + 1);
        }
        html += "</tr>";
    }

    tabel.innerHTML = html;

    tabel.querySelector(".boto-prev").addEventListener("click", eelmineKuu);
    tabel.querySelector(".boto-next").addEventListener("click", jargmineKuu);

    const vanaTabel = kalendriKast.querySelector("table");

    if (suund === 1) {
        tabel.classList.add("amagat-dreta");
    } else if (suund === -1) {
        tabel.classList.add("amagat-esquerra");
    }

    kalendriKast.appendChild(tabel);

    void tabel.offsetWidth;

    tabel.classList.remove("amagat-dreta", "amagat-esquerra");

    if (vanaTabel) {
        vanaTabel.classList.add(suund === 1 ? "amagat-esquerra" : "amagat-dreta");
        setTimeout(function () {
            vanaTabel.remove();
        }, 400);
    }
}


function jargmineKuu() {
    naidatavKuu.setMonth(naidatavKuu.getMonth() + 1);
    joonistaKalender(1);
}

function eelmineKuu() {
    naidatavKuu.setMonth(naidatavKuu.getMonth() - 1);
    joonistaKalender(-1);
}


// Käivitame kalendri esimest korda
joonistaKalender(0);