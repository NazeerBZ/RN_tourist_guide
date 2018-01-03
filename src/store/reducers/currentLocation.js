const INITIAL_STATE = {
    currentRegion: {},
    currentPosition: {}
}

export function CurrentLocation(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'SET_CURRENT_REGION':
            return Object.assign({}, state, { currentRegion: action.region })

        case 'SET_CURRENT_POSITION':
            return Object.assign({}, state, { currentPosition: action.position })

        default: return state
    }

}