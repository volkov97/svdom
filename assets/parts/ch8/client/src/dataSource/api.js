const BASE_URL = 'http://localhost:3000';

export const getSvgs = () => {
  return fetch(`${BASE_URL}/api/svgs`).then((response) => response.json());
};

export const getSvg = (svgId) => {
  return fetch(`${BASE_URL}/api/svgs/${svgId}`).then((response) => {
    if (response.ok === false) {
      throw Error(response.statusText);
    }

    return response.json();
  });
};

export const createSvg = (content) => {
  return fetch(`${BASE_URL}/api/svgs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
    }),
  }).then((response) => response.json());
};

export const likeSvg = (svgId, isLiked) => {
  return fetch(`${BASE_URL}/api/svgs/${svgId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: svgId,
      isLiked,
    }),
  }).then((response) => response.json());
};

export const removeSvg = (svgId) => {
  return fetch(`${BASE_URL}/api/svgs/${svgId}`, {
    method: 'DELETE',
  }).then((response) => response.json());
};
