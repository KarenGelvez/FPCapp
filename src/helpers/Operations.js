export const composition = (ingredients, data) => {
  Number.prototype.toFixedNoRounding = function (n) {
    const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g');
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf('.');
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + '.' + '0'.repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + '0'.repeat(b) : a;
  };

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
  const totalFinished = totalCrude - totalCrude * (data[3] / 100);
  let protTotal = prott / totalFinished;
  let protcTotal = protc / totalFinished;
  let protv = protTotal - protcTotal;
  let fatTotal = fat / totalFinished;
  let humTotal = hum / totalFinished;
  let humfat = humTotal + fatTotal;
  let stratchTotal = strach / totalFinished;
  let saltTotal = salt / totalFinished;
  let po4Total = po4 / totalFinished;
  let ascTotal = asc / totalCrude;
  let no2Total = no2 / totalCrude;
  let no2TotalP = no2Total * 10000;

  let humprot = humTotal / protTotal;
  let fatprot = fatTotal / protTotal;
  let salhum = (saltTotal / humTotal) * 100;
  let balh2o = 4 * ((protTotal + stratchTotal) / totalFinished);

  const result = {
    crude: totalCrude,
    decrease: porc,
    total: totalFinished,
    prot: protTotal.toFixedNoRounding(3),
    protc: protcTotal.toFixedNoRounding(3),
    protv: protv.toFixedNoRounding(3),
    fat: fatTotal.toFixedNoRounding(3),
    hum: humTotal.toFixedNoRounding(3),
    humfat: humfat.toFixedNoRounding(3),
    stra: stratchTotal.toFixedNoRounding(3),
    salt: saltTotal.toFixedNoRounding(3),
    po4: po4Total.toFixedNoRounding(3),
    asc: ascTotal.toFixedNoRounding(3),
    no2: no2Total.toFixedNoRounding(3),
    no2ppm: no2TotalP.toFixedNoRounding(2),
    humprot: humprot.toFixedNoRounding(3),
    fatprot: fatprot.toFixedNoRounding(3),
    salhum: salhum.toFixedNoRounding(3),
    balh2o: balh2o.toFixedNoRounding(3),
  };
  return result;
};
