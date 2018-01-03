const INITIAL_STATE = {
    currentUserId: ''
}

export function CurrentUser(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'CURRENT_USER':
            return Object.assign({}, state, { currentUserId: action.id })

        default: return state
    }

}