const TelegramBot = require("node-telegram-bot-api");
const token = "7016772774:AAEM7uMN5n4Oryu3Mh5xhjzPLtw0Z-MoisY";
const sepsupriatnaaBot = new TelegramBot(token, { polling: true });

const prefix = ".";
const gempa = RegExp(`^${prefix}gempa$`);

const url = `https://data.bmkg.go.id/DataMKG/TEWS/`;

sepsupriatnaaBot.onText(gempa, async (data) => {
  const res = await fetch(url + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Shakemap },
    },
  } = await res.json();

  const image = url + Shakemap;

  let dataGempa = `
    Waktu: ${Tanggal}, ${Jam}
    Magnitude: ${Magnitude} SR
    Kedalaman: ${Kedalaman}
    Wilayah: ${Wilayah}
  `;

  sepsupriatnaaBot.sendPhoto(data.from.id, image, {
    caption: dataGempa,
  });
});
