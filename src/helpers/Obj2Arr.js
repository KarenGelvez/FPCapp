export const covertArrTeacher = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {uid: _data['uid'], name: _data['name'], code: _data['code']};
    });
  }
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
