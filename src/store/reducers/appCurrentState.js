const INITIAL_STATE = {
    toastMessage: '',
    isLoggedIn: false,
    isDataLoading: false
}

export function AppCurrentState(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'SHOW_TOAST':
            Object.assign({}, state, { toastMessage: action.msg })

        case 'CLEAR_TOAST_MESSAGE':
            Object.assign({}, state, { toastMessage: '' })

        case 'SET_LOGIN_STATE':
            return Object.assign({}, state, { isLoggedIn: action.flg })

        case 'SET_DATA_LOADING':
            return Object.assign({}, state, { isDataLoading: action.flg })

        default: return state
    }
}