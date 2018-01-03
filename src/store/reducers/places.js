const INITIAL_STATE = {
    placesToVisit: [],
    source: '',
    destination: '',
    distanceInKm: ''
}

export function Places(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'PLACES_TO_VISIT':
            return Object.assign({}, state, { placesToVisit: action.ls });

        case 'DIRECTION':
            return Object.assign({}, state, { source: action.src, destination: action.des, distanceInKm: action.km })

        case 'CLEAR_DIRECTION':
            return Object.assign({}, state, { source: action.src, destination: action.des, distanceInKm: action.km })

        default: return state
    }
}