// util function for fetching value from URL and response path
async function getValueFromURL(url, responsePath) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonData = await response.json();
    const keys = responsePath.split('.');
    let value = jsonData;

    for (const key of keys) {
      if (!value.hasOwnProperty(key)) {
        throw new Error(`Invalid path: ${responsePath}`);
      }
      value = value[key];
    }

    return value;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Util function to get a value, either directly or from a URL
async function resolveValue(arg) {
  try {
    if (typeof arg === 'string' || typeof arg === 'number') {
      return arg;
    } else if (typeof arg === 'object' && arg !== null && 'link' in arg && 'path' in arg) {
      const { link, path } = arg;
      return await getValueFromURL(link, path);
    } else {
      throw new Error('Invalid argument type or missing required fields.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export { resolveValue, getValueFromURL };
