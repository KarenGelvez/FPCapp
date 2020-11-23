Firestore.collection('requirements')
  .add({
    classification: 'fRFaunlDElHuKP1zdTPw',
    //category: '14L3TCzSSlMq4M2t3zsE', //Premium
    //category: 'zVcAiezJGxwtO2dG2O2Q', //Seleccionada
    category: 'zfFmoLfpvGIvIT0k8bAa', //Estandar
    protein: {
      name: 'Proteína',
      min: 18,
      max: 100,
    },
    fat: {
      name: 'Grasa',
      min: 0,
      max: 50,
    },
    humidity: {
      name: 'Humedad más grasa',
      min: 0,
      max: 40,
    },
    starch: {
      name: 'Almidón',
      min: 0,
      max: 0,
    },
    nonmeatprotein: {
      name: 'Proteína no cárnica',
      min: 0,
      max: 3,
    },
  })
  .then(() => console.log('Registrado'));
