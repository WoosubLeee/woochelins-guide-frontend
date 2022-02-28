export const snakeToCamel = data => {
  if (data.constructor === Object) {
    const newObj = {};
    for (const key in data) {
      const newKey = key.replace(/_[a-z]/g, c => c[1].toUpperCase());
      let newValue = data[key];
      if (newValue) {
        if ([Object, Array].includes(newValue.constructor)) {
          newValue = snakeToCamel(newValue);
        }
        newObj[newKey] = newValue;
      }
    }
    return newObj;
  } else if (data.constructor === Array) {
    return data.map(element => {
      return snakeToCamel(element);
    });
  } else {
    return data;
  }
};

export const camelToSnake = obj => {
  const newObj = {};
  for (const key in obj) {
    const newKey = key.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);
    let newValue = obj[key];
    if (newValue.constructor === Object) {
      newValue = camelToSnake(newValue);
    }
    newObj[newKey] = newValue;
  }
  return newObj;
}

export const changeGeometryToNum = place => {
  return {
    ...place,
    latitude: Number(place.latitude),
    longitude: Number(place.longitude)
  };
};

export const processGroupData = data => {
  return {
    ...data,
    placeList: {
      ...data.placeList,
      places: data.placeList.places.map(place => {
        const placeData = {
          ...place,
          ...place.place,
          latitude: Number(place.place.latitude),
          longitude: Number(place.place.longitude)
        };
        delete placeData.place;
        return placeData;
      })
    }
  };
};

export const processPlaceListData = data => {
  return {
    ...data,
    places: data.places.map(place => {
      return changeGeometryToNum(place);
    })
  };
};

// Google Place API를 통해 받아온 Place detail 정보를 처리
export const processGooglePlaceData = place => {
  const newData = {
    googleMapsId: place.place_id,
    name: place.name,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
    address: place.formatted_address,
    photos: place.photos ? place.photos.map(photo => photo.getUrl()) : [],
    googleMapsUrl: place.url
  };
  if (place.phoneNumber) newData.phonNumber = place.formatted_phone_number;
  return newData;
};

export const addIsGroupProperty = lists => {
  return lists.map(list => {
    return {
      ...list,
      isGroup: 'members' in list
    }
  });
};
  
export const createPath = (path, location) => {
  return {
    pathname: path,
    search: location.search
  };
};