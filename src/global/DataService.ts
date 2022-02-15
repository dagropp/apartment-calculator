const SAVED_APARTMENTS = 'saved_apartments';

export const getSavedApartments = (): CostObject[] => {
  const data = localStorage.getItem(SAVED_APARTMENTS);
  return data ? JSON.parse(data) : setSavedApartments([]);
}

export const setSavedApartments = (data: CostObject[]) => {
  localStorage.setItem(SAVED_APARTMENTS, JSON.stringify(data));
  return data;
}

export const addSavedApartment = (obj: CostObject) => {
  const arr = getSavedApartments();
  const index = arr.findIndex(({id}) => id === obj.id);
  index !== -1 ? arr[index] = obj : arr.unshift(obj);
  return setSavedApartments(arr);
}

export const removeApartment = (id: string) => {
  const arr = getSavedApartments();
  const index = arr.findIndex((item) => item.id === id);
  if (index !== -1) arr.splice(index, 1);
  return setSavedApartments(arr);
}