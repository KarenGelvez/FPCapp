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
