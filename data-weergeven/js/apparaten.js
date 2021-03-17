let apparaten = [];

const startCalculator = () => {
  laadJSON("apparaten.json");
};

const laadJSON = (url) => {
  const aanvraag = new XMLHttpRequest();

  aanvraag.onreadystatechange = () => {
    if (aanvraag.readyState === 4 && aanvraag.status === 200) {
      let jsonText = aanvraag.responseText;
      console.log(jsonText);
      apparaten = JSON.parse(jsonText);
      console.log(apparaten);
      toonApparaten();
    }
  };

  aanvraag.open("GET", url, true);

  aanvraag.send();
};

const toonApparaten = () => {
  const apparaatDivs = document.querySelectorAll(".apparaat");
  console.log(apparaatDivs);

apparaatDivs.forEach((apparaatDiv) => {
    const code = apparaatDiv.attributes["data-id"].value;
    const apparaat = apparaten.find((value) => {
      return value.code === code;
    });

    let data = {
      container: apparaatDiv,
      apparaat: apparaat,
      weergave: 'kosten',
      prijs_kwh: 0.20
    };

    maakWidget(data);
  });

};

const maakWidget = (data) => {

  const apparaatDiv = data.container;

  const slider = apparaatDiv.querySelector("input");
  const minuten = apparaatDiv.querySelector("span");
  const knop = apparaatDiv.querySelector("button");

  apparaatDiv.style.backgroundImage = `url(${data.apparaat.image})`;

  slider.addEventListener("input", (event) => {
    minuten.innerHTML = slider.value;
    updateGegevens(data);
  });

  knop.addEventListener("click", () => {
    if (knop.innerText === "Toon verbruik") {
        data.weergave = "verbruik";
        knop.innerText = "Toon kosten";
    } else {
        data.weergave = "kosten";
        knop.innerText = "Toon verbruik";
    }
    updateGegevens(data);
});

    updateGegevens(data);


};

const updateGegevens = (data) => {
  const apparaatDiv = data.container;

  const titel = apparaatDiv.querySelector("h1");
  const nummer = apparaatDiv.querySelector("h2");
  const slider = apparaatDiv.querySelector("input");

  titel.innerHTML = data.apparaat.naam;  

  const minutenPerDag = parseInt(slider.value);

  if (data.weergave === "kosten") {
    let jaarlijkseKosten = berekenJaarKosten(minutenPerDag, data.apparaat.vermogen);
    nummer.innerHTML = "€ " + jaarlijkseKosten + " per jaar";
  } else {
    let jaarlijksVerbruik = berekenJaarVerbruik( minutenPerDag, data.apparaat.vermogen);
    nummer.innerHTML = jaarlijksVerbruik + " KwH";
  }
};

const berekenJaarVerbruik = (minuten_per_dag, vermogen) => {  
  const minutenPerJaar = minuten_per_dag * 365;
  const urenPerJaar = minutenPerJaar / 60;
  const wattPerJaar = urenPerJaar * vermogen;
  const kwhPerJaar = wattPerJaar / 1000;

  return kwhPerJaar.toFixed(2);
};

const berekenJaarKosten = (minuten_per_dag, vermogen) => {
  const prijsPerKwH = 0.2;
  const kwhPerJaar = berekenJaarVerbruik(minuten_per_dag, vermogen);
  const price = kwhPerJaar * prijsPerKwH;
  return price.toFixed(2);
};

window.addEventListener("DOMContentLoaded", startCalculator);
