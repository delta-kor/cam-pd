function getCurrentData(target: any, current: number) {
  const keys = Object.keys(target).map(item => parseInt(item) * 10);

  let targetKey = keys[0];
  for (const key of keys) {
    if (key > current) break;
    targetKey = key;
  }

  return target[targetKey / 10];
}

export default getCurrentData;
