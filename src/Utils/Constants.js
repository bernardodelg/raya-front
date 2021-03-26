// export const BASE_API = 'http://172.16.0.157:8000/api/v1/';
// export const BASE_URL = 'http://172.16.0.157:8000';

//export const BASE_API = 'https://rayaadmin2.messoft.net/api/v1/';
//export const BASE_URL = 'https://rayaadmin2.messoft.net';

// export const BASE_API = 'https://admon.rayafrutasyverduras.com.mx/api/v1/';
// export const BASE_URL = 'https://admon.rayafrutasyverduras.com.mx';

export const BASE_API = 'https://testcomprasadmin.rayafrutasyverduras.com.mx/api/v1/';
export const BASE_URL = 'https://testcomprasadmin.rayafrutasyverduras.com.mx';

// export const SHIPPING_COST = 49;


export const fetchPost = async (endpoint, params, token='') => {
  const res = await fetch(BASE_API + endpoint, {
    method: 'POST',
    body: params,
    headers: {
      'Accept': 'application/json',
      'Authorization':'Bearer ' + token

    }
  });
  return await res.json();
};

export const fetchGet = async (endpoint, token='') => {
  const res = await fetch(BASE_API + endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization':'Bearer ' + token
    }
  });
  return await res.json();
};
