export const covertArrTeacher = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {uid: _data['uid'], name: _data['name'], code: _data['code']};
    });
  }
};

export const covertArrStudent = (obj) => {
  let student = [];
  let studentVerified = [];
  if (obj === null) {
    return {};
  } else {
    obj.map(({_data}) => {
      if (_data['verified']) {
        studentVerified.push({
          uid: _data['uid'],
          name: _data['name'],
          photo: _data['photo'],
          verified: _data['verified'],
        });
      } else {
        student.push({
          uid: _data['uid'],
          name: _data['name'],
          photo: _data['photo'],
          verified: _data['verified'],
        });
      }
    });
  }
  return {student, studentVerified};
};

export const covertDataUser = (obj, collection, method) => {
  if (collection === 'teachers') {
    return {
      uid: obj['uid'],
      name: obj['name'],
      code: obj['code'],
      teacher: true,
      photo: obj['photo'],
      method: method,
    };
  } else {
    return {
      uid: obj['uid'],
      name: obj['name'],
      code: obj['code'],
      verified: obj['verified'],
      uidTeacher: obj['teacher'],
      teacher: false,
      photo: obj['photo'],
      method: method,
    };
  }
};

export const covertArr = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {id: _data['id'], name: _data['name']};
    });
  }
};

export const covertArrProducts = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {
        id: _data['id'],
        name: _data['name'],
        clas: _data['clas'],
      };
    });
  }
};

export const covertArrIngredients = (obj) => {
  //PENDIENTE
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {
        id: _data['id'],
        name: _data['name'],
        pk: _data['pk'],
        gra: _data['gra'],
        prc: _data['prc'],
        tp: _data['tp'],
        hum: _data['hum'],
        salt: _data['salt'],
        po4: _data['po4'],
        asc: _data['asc'],
        no2: _data['no2'],
        alm: _data['alm'],
        cra: _data['cra'],
      };
    });
  }
};

export const covertArrRequirements = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {
        cat: _data['category'],
        clas: _data['classification'],
        fat: _data['fat'],
        hum: _data['humidity'],
        nmp: _data['nonmeatprotein'],
        pro: _data['protein'],
        sta: _data['starch'],
      };
    });
  }
};
