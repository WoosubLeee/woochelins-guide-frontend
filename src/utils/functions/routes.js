export const routeTo = (route, params, location) => {
  switch (route) {
    case 'Home':
      return createPath('/', location);
    case 'PlaceInfoCard':
      return createPath(`/place/${params.googleMapsId}`, location);
    case 'PlaceAddList':
      return createPath(`/place/${params.googleMapsId}/add`, location);
    case 'PlaceRecommenders':
      return createPath(`/place/${params.googleMapsId}/recommenders`, location);
    case 'PlaceList':
      return createPath('place/list', location);
    case 'GroupInfo':
      return createPath('/group/info', location);
    case 'GroupList':
      return createPath('/group/list', location);
    case 'GroupCreate':
      return createPath('/group/create', location);
    case 'PlaceListCreate':
      return createPath('/placelist/create', location);
    case 'Menu':
      return createPath('/menu', location);
    case 'Signup':
      return createPath('/auth/signup');
    case 'Login':
      return createPath('/auth/login');
    default:
      return;
  }
};
  
export const createPath = (path, location) => {
  return {
    pathname: path,
    search: location?.search
  };
};