export const changeGeometryToNum = data => {
  return {
    ...data,
    places: data.places.map(place => {
      return {
        ...place,
        latitude: Number(place.latitude),
        longitude: Number(place.longitude)
      };
    })
  };
};