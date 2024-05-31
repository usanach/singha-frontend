
const getDiscovery = async () => {
    const response = await fetch('./data/discovery.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

const getHeaderData = async () => {
    const response = await fetch('./data/header.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}