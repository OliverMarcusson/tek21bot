async function main() {
    const date = new Date();
    const Axios = require('axios').default;

    const places = {
        nackaS: {
            origPlaceId: 'QT0xQE89TmFja2Egc3RyYW5kIChOYWNrYSlAWD0xODE2MDI5NkBZPTU5MzE2NDA5QFU9NzRATD0zMDAxMDQwMzFAQj0xQHA9MTY2Mjc3NTIyM0A=',
            origName: 'Nacka+strand+(Nacka)',
            origSiteId: '4031'
        }   
    };

    const createApiRequest = (place) => {
        return `https://webcloud.sl.se/api/v2/departures?mode=departures&origPlaceId=${place.origPlaceId}&origSiteId=${place.origSiteId}&desiredResults=3&origName=${place.origName}`;
    };

    const getDepartureData = async (place) => {
        const departureData = await Axios
        .get(createApiRequest(place))
        .then(response => {
            const responseData = response.data;
            const departureData = {
                _840: {
                    destination: 'Handens station',
                    departureTime: responseData.find(({ destination }) => destination === 'Handens station').time.displayTime,
                    line: '840'
                },
                _465: {
                    destination: 'Fisksätra',
                    departureTime: responseData.find(({ destination }) => destination === 'Fisksätra').time.displayTime,
                    line: '465'
                },
                _443: {
                    destination: 'Slussen',
                    departureTime: responseData.find(({ destination }) => destination === 'Slussen').time.displayTime,
                    line: '443'
                },
                _71: {
                    destination: 'Glasbruksgatan',
                    departureTime: responseData.find(({ destination }) => destination === 'Glasbruksgatan').time.displayTime,
                    line: '71'
                }
            };
            return departureData;
        })
        .catch(error => {
            console.log(error)
            return false;
        })
        return departureData;
    };
    const departureData = await getDepartureData(places.nackaS);
    return departureData;
};

exports.main = main;