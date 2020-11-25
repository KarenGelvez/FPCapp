import {Firestore} from '../firebase/Firebase';
import {types} from '../Types';
import {
  covertArr,
  covertArrIngredients,
  covertArrProducts,
} from '../helpers/Obj2Arr';
import {loading} from './ui.action';

export const getCategories = (categories) => {
  return {
    type: types.getCategories,
    payload: categories,
  };
};

export const getClassifications = (classifications) => {
  return {
    type: types.getClassifications,
    payload: classifications,
  };
};

export const getProducts = (products) => {
  return {
    type: types.getProducts,
    payload: products,
  };
};

export const getIngredients = (ingredients) => {
  return {
    type: types.getIngredients,
    payload: ingredients,
  };
};

export const getCategoriesFirestore = () => {
  return async (dispatch) => {
    await Firestore.collection('categories')
      .get()
      .then(({docs}) => {
        const categoriesArr = covertArr(docs);
        dispatch(getCategories(categoriesArr));
        dispatch(loading(false));
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const getClassificationsFirestore = () => {
  return async (dispatch) => {
    await Firestore.collection('classifications')
      .get()
      .then(({docs}) => {
        const classificationsArr = covertArr(docs);
        dispatch(getClassifications(classificationsArr));
        dispatch(loading(false));
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const getProductsFirestore = () => {
  return async (dispatch) => {
    await Firestore.collection('products')
      .orderBy('name', 'asc')
      .get()
      .then(({docs}) => {
        const productsArr = covertArrProducts(docs);
        dispatch(getProducts(productsArr));
        dispatch(loading(false));
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const registerProduct = (products) => {
  return async (dispatch) => {
    await Firestore.collection('products')
      .add(products)
      .then((res) => {
        const id = res.id;
        Firestore.collection('products')
          .doc(id)
          .update({id: id})
          .then(() => {
            dispatch(getProductsFirestore());
          })
          .catch((e) => {
            dispatch(loading(false));
            console.log(e);
          });
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    await Firestore.collection('products')
      .doc(product.id)
      .update(product)
      .then(() => {
        dispatch(getProductsFirestore());
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await Firestore.collection('products')
      .doc(id)
      .delete()
      .then(() => {
        dispatch(getProductsFirestore());
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const getIngredientsFirestore = () => {
  return async (dispatch) => {
    await Firestore.collection('ingredients')
      .orderBy('name', 'asc')
      .get()
      .then(({docs}) => {
        const ingredientsArr = covertArrIngredients(docs);
        dispatch(getIngredients(ingredientsArr));
        dispatch(loading(false));
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const registerIngredient = (ingredient) => {
  const reviewIngredient = {
    name: ingredient['name'],
    pk: ingredient['pk'] === '' ? 0 : ingredient['pk'],
    gra: ingredient['gra'] === '' ? 0 : ingredient['gra'],
    prc: ingredient['prc'] === '' ? 0 : ingredient['prc'],
    tp: ingredient['tp'] === '' ? 0 : ingredient['tp'],
    hum: ingredient['hum'] === '' ? 0 : ingredient['hum'],
    salt: ingredient['salt'] === '' ? 0 : ingredient['salt'],
    po4: ingredient['po4'] === '' ? 0 : ingredient['po4'],
    asc: ingredient['asc'] === '' ? 0 : ingredient['asc'],
    no2: ingredient['no2'] === '' ? 0 : ingredient['no2'],
    alm: ingredient['alm'] === '' ? 0 : ingredient['alm'],
    cra: ingredient['cra'] === '' ? 0 : ingredient['cra'],
    id: 'id',
  };
  return async (dispatch) => {
    await Firestore.collection('ingredients')
      .add(reviewIngredient)
      .then((res) => {
        const id = res.id;
        Firestore.collection('ingredients')
          .doc(id)
          .update({id: id})
          .then(() => {
            dispatch(getIngredientsFirestore());
          })
          .catch((e) => {
            dispatch(loading(false));
          });
      });
  };
};

export const updateIngredient = (ingredient) => {
  const reviewIngredient = {
    name: ingredient['name'],
    pk: ingredient['pk'] === '' ? 0 : ingredient['pk'],
    gra: ingredient['gra'] === '' ? 0 : ingredient['gra'],
    prc: ingredient['prc'] === '' ? 0 : ingredient['prc'],
    tp: ingredient['tp'] === '' ? 0 : ingredient['tp'],
    hum: ingredient['hum'] === '' ? 0 : ingredient['hum'],
    salt: ingredient['salt'] === '' ? 0 : ingredient['salt'],
    po4: ingredient['po4'] === '' ? 0 : ingredient['po4'],
    asc: ingredient['asc'] === '' ? 0 : ingredient['asc'],
    no2: ingredient['no2'] === '' ? 0 : ingredient['no2'],
    alm: ingredient['alm'] === '' ? 0 : ingredient['alm'],
    cra: ingredient['cra'] === '' ? 0 : ingredient['cra'],
    id: ingredient['id'],
  };
  return async (dispatch) => {
    await Firestore.collection('ingredients')
      .doc(ingredient.id)
      .update(reviewIngredient)
      .then(() => {
        dispatch(getIngredientsFirestore());
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const deleteIngredient = (id) => {
  return async (dispatch) => {
    await Firestore.collection('ingredients')
      .doc(id)
      .delete()
      .then(() => {
        dispatch(getIngredientsFirestore());
      })
      .catch((e) => dispatch(loading(false)));
  };
};

export const getRequirementsFirestore = (category, classification) => {
  return async (dispatch) => {
    await Firestore.collection('requirements')
      .where('category', '==', category)
      .where('classification', '==', classification)
      .get()
      .then(({docs}) => {
        console.log(docs);
        //const ingredientsArr = covertArrIngredients(docs);
        //dispatch(getIngredients(ingredientsArr));
      })
      .catch((e) => dispatch(loading(false)));
  };
};
