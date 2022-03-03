
const get = (key, def = false) => {
    let value = localStorage.getItem(key);
    if(value === 'undefined'){
        return false;
    }
    return JSON.parse(value);
};

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const remove = (key) => {
    localStorage.removeItem(key);
};

const clear = () => {
    localStorage.clear();
};

export {
    get, save, remove, clear
}
