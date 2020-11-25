export const composition = (ingredients, data) => {
  let totalCrude = 0;
  let prott = 0;
  let protc = 0;
  let fat = 0;
  let hum = 0;
  let strach = 0;
  let salt = 0;
  let po4 = 0;
  let asc = 0;
  let no2 = 0;
  ingredients.map((i) => {
    totalCrude += parseFloat(i.kg);
    prott += parseFloat(i.tp) * parseFloat(i.kg);
    protc += parseFloat(i.prc) * parseFloat(i.kg);
    fat += parseFloat(i.gra) * parseFloat(i.kg);
    hum += parseFloat(i.hum) * parseFloat(i.kg);
    strach += parseFloat(i.alm) * parseFloat(i.kg);
    salt += parseFloat(i.salt) * parseFloat(i.kg);
    po4 += parseFloat(i.po4) * parseFloat(i.kg);
    asc += parseFloat(i.asc) * parseFloat(i.kg);
    no2 += parseFloat(i.no2) * parseFloat(i.kg);
  });
  const porc = totalCrude * (data[3] / 100);
  const totalFinished =
    totalCrude.toFixed(3) - totalCrude.toFixed(3) * (data[3] / 100);
  let protTotal =
    parseFloat(prott.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let protcTotal =
    parseFloat(protc.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let protv =
    parseFloat(protTotal.toFixed(3)) - parseFloat(protcTotal.toFixed(3));
  let fatTotal =
    parseFloat(fat.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let humTotal =
    parseFloat(hum.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let humfat =
    parseFloat(humTotal.toFixed(3)) + parseFloat(fatTotal.toFixed(3));
  let stratchTotal =
    parseFloat(strach.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let saltTotal =
    parseFloat(salt.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let po4Total =
    parseFloat(po4.toFixed(3)) / parseFloat(totalFinished.toFixed(3));
  let ascTotal = parseFloat(asc.toFixed(3)) / parseFloat(totalCrude.toFixed(3));
  let no2Total = parseFloat(no2.toFixed(3)) / parseFloat(totalCrude.toFixed(3));
  let no2TotalP =
    (parseFloat(no2.toFixed(3)) / parseFloat(totalCrude.toFixed(3))) * 10000;

  let humprot = humTotal / protTotal;
  let fatprot = fatTotal / protTotal;
  let salhum = (saltTotal / humTotal) * 100;
  let balh2o = 4 * ((protTotal + stratchTotal) / totalFinished);

  const result = {
    crude: totalCrude,
    decrease: porc,
    total: totalFinished,
    prot: protTotal.toFixed(3),
    protc: protcTotal.toFixed(3),
    protv: protv.toFixed(3),
    fat: fatTotal.toFixed(3),
    hum: humTotal.toFixed(3),
    humfat: humfat.toFixed(3),
    stra: stratchTotal.toFixed(3),
    salt: saltTotal.toFixed(3),
    po4: po4Total.toFixed(3),
    asc: ascTotal.toFixed(3),
    no2: no2Total.toFixed(3),
    no2ppm: no2TotalP.toFixed(3),
    humprot: humprot.toFixed(3),
    fatprot: fatprot.toFixed(3),
    salhum: salhum.toFixed(3),
    balh2o: balh2o.toFixed(3),
  };
  return result;
};
