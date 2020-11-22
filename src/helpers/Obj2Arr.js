export const covertArrTeacher = (obj) => {
  if (obj === null) {
    return {};
  } else {
    return obj.map(({_data}) => {
      return {uid: _data['uid'], name: _data['name'], code: _data['code']};
    });
  }
};
