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
    prott += parseFloat((parseFloat(i.tp) * parseFloat(i.kg)).toFixed(3));
    protc += parseFloat((parseFloat(i.prc) * parseFloat(i.kg)).toFixed(3));
    fat += parseFloat((parseFloat(i.gra) * parseFloat(i.kg)).toFixed(3));
    hum += parseFloat((parseFloat(i.hum) * parseFloat(i.kg)).toFixed(3));
    strach += parseFloat((parseFloat(i.alm) * parseFloat(i.kg)).toFixed(3));
    salt += parseFloat((parseFloat(i.salt) * parseFloat(i.kg)).toFixed(3));
    po4 += parseFloat((parseFloat(i.po4) * parseFloat(i.kg)).toFixed(3));
    asc += parseFloat((parseFloat(i.asc) * parseFloat(i.kg)).toFixed(3));
    no2 += parseFloat((parseFloat(i.no2) * parseFloat(i.kg)).toFixed(3));
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
    decrease: porc.toFixed(2),
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
    no2ppm: no2TotalP,
    humprot: humprot.toFixed(3),
    fatprot: fatprot.toFixed(3),
    salhum: salhum.toFixed(3),
    balh2o: balh2o.toFixed(3),
  };
  return result;
};
