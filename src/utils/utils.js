export  function add(a, b) {
  return a + b;
}

export function mix(a, b) {
  return a - b;
}

export function asyncImportComponent() {
  return import( /* webpackChunkName: "lodash" */ 'lodash')
    .then(({ default: _ }) => {
      const com = document.createElement('div');
      com.innerText = _.join(['zhao', 'zhan', 'put'])
      return com;
    })
    .then(e => {
      document.body.appendChild(e)
    })
}