const get = (key: string) => {
  const res = localStorage.getItem(key);

  if (res) {
    return JSON.parse(res);
  } else {
    return null;
  }
};

const set = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const lsHelper = {
  get,
  set,
};

export default lsHelper;
