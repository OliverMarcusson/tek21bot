async function main() {
    const date = new Date();
    const Axios = require('axios').default;

    const placeIds = {
        tyresoC: 'QT0xQE89VHlyZXPDtiBjZW50cnVtIChUeXJlc8O2KUBYPTE4MjI5MTYyQFk9NTkyNDQxNDVAVT03NEBMPTMwMDEwODAwMEBCPTFAcD0xNjYyNjg4ODI0QA==',
        nackaS: 'QT0xQE89TmFja2Egc3RyYW5kIChOYWNrYSlAWD0xODE2MDI5NkBZPTU5MzE2NDA5QFU9NzRATD0zMDAxMDQwMzFAQj0xQHA9MTY2MjYwMjQyM0A=',
        nackaF: 'QT0xQE89TmFja2EgRm9ydW0gKE5hY2thKUBYPTE4MTY1NDM3QFk9NTkzMDg1NjJAVT03NEBMPTMwMDEwNDA0MEBCPTFAcD0xNjYyNjAyNDIzQA=='
    }; 
    const placeNames = {
        tyresoC: 'Tyresö+centrum+(Tyresö)',
        nackaS: 'Nacka+strand+(Nacka)',
        nackaF: 'Nacka+Forum+(Nacka)'
    };
    
    const createUrl = (origPlaceId, destPlaceId, origName, destName) => {
        return `https://webcloud.sl.se/v2/api/travels?mode=travelPlanner&origPlaceId=${origPlaceId}&destPlaceId=${destPlaceId}&searchForArrival=false&transportTypes=8&desiredResults=1&origName=${origName}&destName=${destName}&useCache=false`
    };

    const url = createUrl(placeIds.nackaS, placeIds.nackaF, placeNames.nackaS, placeNames.nackaF);

    const travelInfo = await Axios
    .get(url)
    .then(response => {
        const travelInfo = {
            departureName: response.data.travels[0].origin.name,
            arrivalName: response.data.travels[0].destination.name,
            departureTime: response.data.travels[0].origin.departureTime.realTime.split('T')[1].slice(0, 5),
            departureTimeLeft: null,
            arrivalTime: response.data.travels[0].destination.arrivalTime.realTime.split('T')[1].slice(0, 5)
        };
        travelInfo.departureTimeLeft = parseInt(travelInfo.departureTime.split(':')[1]) - date.getMinutes()
        // console.log(`Tid för avgång vid hållplats ${travelInfo.departureName}: ${travelInfo.departureTime}, Tid för ankomst vid hållplats ${travelInfo.arrivalName}: ${travelInfo.arrivalTime}`);
        return travelInfo;
    })
    .catch(error => {
        console.log(error)
    })
    .then(travelInfo => {return travelInfo});

    return travelInfo;
}

main()

exports.main = main
