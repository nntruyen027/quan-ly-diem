export const apiFetch = async ({
  url, options = {
  }, queryParams, 
}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Accept': '*/*',
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {
      }), 
    },
  };

  const filteredQueryParams = queryParams ? Object.fromEntries(
    Object.entries(queryParams).filter(([, value,]) => value != null && value !== '')
  ) : {
  };

  const urlObject = new URL(`${process.env.REACT_APP_HOST_IP}/${url}`);
  if (Object.keys(filteredQueryParams).length > 0) {
    urlObject.search = new URLSearchParams(filteredQueryParams).toString();
  }

  try {
    const response = await fetch(urlObject.toString(), finalOptions);
    console.log(response);

    if (!response.ok) {
      const error = new Error('HTTP error');
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    if (response.status === 204) return '';

    const data = await response.json().catch(() => {
      throw new Error('Failed to parse JSON');
    });

    return data;
  } catch (error) {
    console.error('apiFetch error:', error);
    throw error;
  }
};

export const apiImage = ({ url, }) => {
  return `${process.env.REACT_APP_IMAGE_LINK}/${url}`;
};
