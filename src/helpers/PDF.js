export const pdfFPC = (
  userData,
  selectedIngredients,
  requirements,
  selectedData,
  data,
  result,
) => {
  const user = userData.teacher ? 'Docente' : 'Estudiante';
  let rowsIngredient = ``;
  let bache = 0;
  selectedIngredients.map((i) => {
    bache = (
      (parseFloat(i.kg) / parseFloat(result.crude)) *
      parseFloat(selectedData[3])
    ).toFixed(3);
    rowsIngredient += `<tr><td>${i.name}</td><td>${i.kg}</td><td>${bache}</td></tr>`;
  });
  rowsIngredient += `<tr><td><strong>Total Crudo</strong></td><td>${result.crude}kg</td></tr>`;
  let msgHP = '';
  let HP = parseFloat(result.humprot);
  if (HP > 5) {
    msgHP = 'Perderá textura';
  } else if (HP >= 4 && HP <= 5) {
    msgHP = 'Tendrá mejor mordida';
  } else {
    msgHP = 'Será un producto duro';
  }
  let msgFP = '';
  let FP = parseFloat(result.fatprot);
  if (FP > 2) {
    msgFP =
      'Correrá el riesgo de que se separe la grasa del agua y de la proteína';
  }
  let msgSH = '';
  let SH = parseFloat(result.fatprot);
  if (SH > 3.5) {
    msgSH = 'Disminuirá la durabilidad';
  }
  let fatmin = parseInt(requirements.fat.min);
  let fatmax = parseInt(requirements.fat.max);
  let hummin = parseInt(requirements.hum.min);
  let hummax = parseInt(requirements.hum.max);
  let promin = parseInt(requirements.pro.min);
  let promax = parseInt(requirements.pro.max);
  let nmpmin = parseInt(requirements.nmp.min);
  let nmpmax = parseInt(requirements.nmp.max);
  let strmin = parseInt(requirements.sta.min);
  let strmax = parseInt(requirements.sta.max);
  let msgF = 'Cumple con la norma';
  let msgH = '';
  let msgHG = '';
  let msgP = 'Cumple con la norma';
  let msgPN = 'Cumple con la norma';
  let msgS = 'Cumple con la norma';
  if (
    String(requirements.clas).replace(' ', '') == 'LLn8Gi3Bmg5BxIydK6PA' ||
    String(requirements.clas).replace(' ', '') == 'Av47Lg8iWf28j2peDfBN'
  ) {
    //Humedad más grasa
    if (
      parseFloat(result.protc) < promin ||
      parseFloat(result.protc) > promax
    ) {
      msgP = 'No cumple con la norma';
    }
    if (parseFloat(result.fat) < fatmin || parseFloat(result.fat) > fatmax) {
      msgF = 'No cumple con la norma';
    }
    if (
      parseFloat(result.humfat) < hummin ||
      parseFloat(result.humfat) > hummax
    ) {
      msgHG = 'No cumple con la norma';
    } else {
      msgHG = 'Cumple con la norma';
    }
    if (parseFloat(result.stra) < strmin || parseFloat(result.stra) > strmax) {
      msgS = 'No cumple con la norma';
    }
    if (
      parseFloat(result.protv) < nmpmin ||
      parseFloat(result.protv) > nmpmax
    ) {
      msgPN = 'No cumple con la norma';
    }
  } else {
    //Humedad
    if (
      parseFloat(result.protc) < promin ||
      parseFloat(result.protc) > promax
    ) {
      msgP = 'No cumple con la norma';
    }
    if (parseFloat(result.fat) < fatmin || parseFloat(result.fat) > fatmax) {
      msgF = 'No cumple con la norma';
    }
    if (parseFloat(result.hum) < hummin || parseFloat(result.hum) > hummax) {
      msgH = 'No cumple con la norma';
    } else {
      msgH = 'Cumple con la norma';
    }
    if (parseFloat(result.stra) < strmin || parseFloat(result.stra) > strmax) {
      msgS = 'No cumple con la norma';
    }
    if (
      parseFloat(result.protv) < nmpmin ||
      parseFloat(result.protv) > nmpmax
    ) {
      msgPN = 'No cumple con la norma';
    }
  }
  let sal = 2;
  let fost = 0.5;
  let eri = 0.05;
  let nit = 0.02;
  let ppm = 200;
  let msgSal = 'Cumple con la norma';
  let msgFo = 'Cumple con la norma';
  let msgEr = 'Cumple con la norma';
  let msgN = 'Cumple con la norma';
  let msgPPM = 'Cumple con la norma';
  if (parseFloat(result.salt) > sal) {
    msgSal = 'No cumple con la norma';
  }
  if (parseFloat(result.po4) > fost) {
    msgFo = 'No cumple con la norma';
  }
  if (parseFloat(result.asc) > eri) {
    msgEr = 'No cumple con la norma';
  }
  if (parseFloat(result.no2) > nit) {
    msgN = 'No cumple con la norma';
  }
  if (parseFloat(result.no2ppm) > ppm) {
    msgPPM = 'No cumple con la norma';
  }
  rowsIngredient += `<tr><td><strong>${selectedData[2]}% DE MERMA</strong></td><td>${result.decrease}kg</td></tr>`;
  rowsIngredient += `<tr><td><strong>Total Producto Terminado</strong></td><td>${result.total}kg</td></tr>`;
  let rowsComposition = `<tr><td>Proteína Total: </td><td>${result.prot}%</td></tr>
                        <tr><td>Proteína Cárnica: </td><td>${result.protc}% ${msgP}</td></tr>
                        <tr><td>Proteína Vegetal: </td><td>${result.protv}% ${msgPN}</td></tr>
                        <tr><td>Grasa: </td><td>${result.fat}% ${msgF}</td></tr>
                        <tr><td>Humedad: </td><td>${result.hum}% ${msgH}</td></tr>
                        <tr><td>Humedad+Grasa: </td><td>${result.humfat}% ${msgHG}</td></tr>
                        <tr><td>Almidones: </td><td>${result.stra}% ${msgS}</td></tr>
                        <tr><td>Sal: </td><td>${result.salt}% ${msgSal}</td></tr>
                        <tr><td>Fosfatos: </td><td>${result.po4}% ${msgFo}</td></tr>
                        <tr><td>Eritorbatos: </td><td>${result.asc}% ${msgEr}</td></tr>
                        <tr><td>Nitrito: </td><td>${result.no2}% ${msgN}</td></tr>
                        <tr><td>Nitrito (ppm): </td><td>${result.no2ppm} ${msgPPM}</td></tr>`;
  let rowsIndex = `<tr><td>Humedad/Proteína: </td><td>${result.humprot}% ${msgHP}</td></tr>
                    <tr><td>Grasa/Proteína: </td><td>${result.fatprot}% ${msgFP}</td></tr>
                    <tr><td>Sal/Humedad: </td><td>${result.salhum}% ${msgSH}</td></tr>
                    <tr><td>Balance de Agua: </td><td>${result.balh2o}%</td></tr>`;

  let obs = data.obs === '' ? 'Ninguna observación' : data.obs;
  let cant = 0;
  let res = 0;
  let p = ``;
  if (data.g != '') {
    let g = parseInt(data.g);
    cant = Math.trunc((parseFloat(result.total) * 1000) / g);
    res = String(((parseFloat(result.total) * 1000) / g) % 1).substr(0, 6);
    p = `<p style="font-size:15px">De a cuerdo a la cantidad por porción indicada, pueden obtener ${cant} unidades de ${g}g y quedarían ${res}g </p>`;
  }

  const pdf = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    </head>
        <body>
            <div class='container'>
                <h3 style="text-align: center;"><strong>Formulación de Productos Cárnicos Procesados</strong></h3>
                <h4 style="text-align: center;"><strong>Universidad de Pamplona - Ingeniería de Alimentos</strong></h4>
                <hr>
                <p style="font-size:15px"><strong>${user}:</strong> ${userData.name}         <strong>Código:</strong>  ${userData.code}</p>
                <p style="font-size:15px"><strong>Producto:</strong>  ${selectedData[0].name} <strong>Categoría:</strong>  ${selectedData[1].name}</p>
                <div class="container">
                    <div class="row">
                        <div class="col-6">Ingredientes
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">${selectedData[3]} kg/bache</th>
                                </tr>
                            </thead>
                        <tbody>
                            ${rowsIngredient}
                        </tbody>
                        </table>
                        ${p}
                    </div>
                    <div class="col-6">Resultados
                    <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Composición</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsComposition}
                    </tbody>
                    </table>                            
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Índices</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                ${rowsIndex}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="font-size:15px">Observaciones: ${obs}</p>
            </div>
        </div>
    </div>
</body>
</html>`;

  return pdf;
};
