export const utilService = {
<<<<<<< HEAD
  load: loadFromStorage,
  save: saveToStorage,
  getRandomInt,
  debounce,
  makeId,
};
=======
    load: loadFromStorage,
    save: saveToStorage,
    getRandomInt,
    makeId,
}
>>>>>>> 4ef79747c6704a1e3a3635b442efd4979372ce27

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getRandomInt(min, max) {
<<<<<<< HEAD
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function debounce(func, wait = 1000) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function makeId(length = 7) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
=======
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function makeId(length = 7) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
>>>>>>> 4ef79747c6704a1e3a3635b442efd4979372ce27
