import qs from 'query-string';

function formatUri(uri, query) {
    let formatted = uri;
    if (query) {
        const queries = qs.stringify(query);
        if (queries != '') {
            formatted += '?' + qs.stringify(query);
        }
    }
    return formatted;
}

const rxOne = /^[\],:{}\s]*$/;
const rxTwo = /\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g;
const rxFour = /(?:^|:|,)(?:\s*\[)+/g;
const isJSON = input =>
    input.length &&
    rxOne.test(
        input
            .replace(rxTwo, '@')
            .replace(rxThree, ']')
            .replace(rxFour, ''),
    );

const request = async function (method = 'GET', url = '', request = {}, customHeaders = {}) {
    const uri = formatUri(url, method === 'GET' ? request : undefined);
    const headers = Object.assign({}, customHeaders);
    const data = { method, headers, mode: 'cors' };

    console.log('FetchURI      : ', method, uri);
    console.log('FetchHeader   : ', headers);
    if (method !== 'GET') {
        const jsonBody = JSON.stringify(request);
        Object.assign(data, { body: jsonBody });
        console.log('FetchBody     : ', request);
    }

    try {
        const response = await fetch(uri, data);
        const text = await response.text();
        console.log(response);
        console.log('FetchResponse : ', text)
        if (!isJSON(text)) {
            throw new Error(text);
        }
        return JSON.parse(text);
    } catch (err) {
        throw err
    }
}

class API {

    reloadServerEndpoints = async (connection, password) => {
        const endpoints = await request("GET", connection, {}, { 'x-oscrud-dev': password });
        return endpoints;
    }

    sendRequest = async (connection, endpoint, json, password) => {
        const response = await request("POST", connection, { endpoint, request: json }, { 'x-oscrud-dev': password });
        return response;
    }
}

export default API;