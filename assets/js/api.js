
const getData = async (path) => {
    const response = await fetch(`${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getHeaderData = async () => {
    const response = await fetch(`${window.location.origin}/data/header.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getFooterData = async () => {
    const response = await fetch(`${window.location.origin}/data/footer.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const brandCollectionData = async () => {
    const response = await fetch(`${window.location.origin}/data/brand-collection.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getHeroBanner = async () => {
    const token = "889d9b89f022da5b4c0eaad08735de6691592858cd0413fceb4e174574285f4b1d906b3e5cbff6eb85164e6235e8bab0d45b74d6b6814a0285d21a52dc49c82930a7bd052fac8fcf130d9cab7d9ca100de9565c5b201355fa0c1d0dbb3a68919461a0f8e663be7bd5f160af5473565e821b72bc966a9fb2d631fe98cb52706c4";
    const response = await fetch('https://singha-cms-new.newdigitalcampaigns.com/api/hero-banners', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
    });
    return await response.json();
}
// const getSocialMedia = async () => {
//     // const token = "889d9b89f022da5b4c0eaad08735de6691592858cd0413fceb4e174574285f4b1d906b3e5cbff6eb85164e6235e8bab0d45b74d6b6814a0285d21a52dc49c82930a7bd052fac8fcf130d9cab7d9ca100de9565c5b201355fa0c1d0dbb3a68919461a0f8e663be7bd5f160af5473565e821b72bc966a9fb2d631fe98cb52706c4";
//     const response = await fetch('https://residential-uat-cms.singhaestate.co.th/api/social-links?locale=th&fields[0]=title&fields[1]=url&sort[0]=ordering:asc&sort[1]=updatedAt:desc&populate[image][fields][0]=url', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Authorization': `bearer ${token}`
//         }
//     });

//     return await response.json();
// }
const getSocialMedia =  () => {
    const response = {
        "data": [
            {
                "id": 1,
                "attributes": {
                    "title": "Line",
                    "url": "https://line.me",
                    "image": {
                        "data": {
                            "id": 9,
                            "attributes": {
                                "url": "/assets/line.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 2,
                "attributes": {
                    "title": "Facebook",
                    "url": "https://www.facebook.com/SinghaEstate",
                    "image": {
                        "data": {
                            "id": 10,
                            "attributes": {
                                "url": "/assets/facebook.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 3,
                "attributes": {
                    "title": "Youtube",
                    "url": "https://www.youtube.com/SinghaEstatePCL",
                    "image": {
                        "data": {
                            "id": 8,
                            "attributes": {
                                "url": "/assets/youtube.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 4,
                "attributes": {
                    "title": "Instagram",
                    "url": "https://www.instagram.com/Singha_Estate/",
                    "image": {
                        "data": {
                            "id": 7,
                            "attributes": {
                                "url": "/assets/ig.svg"
                            }
                        }
                    }
                }
            }
        ],
        "meta": {
            "pagination": {
                "page": 1,
                "pageSize": 25,
                "pageCount": 1,
                "total": 4
            }
        }
    }

    return  response;
}