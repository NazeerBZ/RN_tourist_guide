

export default class Actions {

    static showToast(msg) {
        return {
            type: 'SHOW_TOAST',
            msg: msg
        }
    }

    static clearToastMessage() {
        return {
            type: 'CLEAR_TOAST_MESSAGE',
            msg: ''
        }
    }

    static setCurrentRegion(currentRegion) {
        return {
            type: 'SET_CURRENT_REGION',
            region: currentRegion
        }
    }

    static setCurrentPosition(currentPosition) {
        return {
            type: 'SET_CURRENT_POSITION',
            position: currentPosition
        }
    }

    static placesToVisit(list) {
        return {
            type: 'PLACES_TO_VISIT',
            ls: list
        }
    }

    static currentUser(userId) {
        return {
            type: 'CURRENT_USER',
            id: userId
        }
    }

    static direction(source, destination, distanceInKm) {
        return {
            type: 'DIRECTION',
            src: source,
            des: destination,
            km: distanceInKm
        }
    }

    static clearDirection() {
        return {
            type: 'CLEAR_DIRECTION',
            src: '',
            des: '',
            km: ''
        }
    }

    static setLoginState(flag) {
        return {
            type: 'SET_LOGIN_STATE',
            flg: flag
        }
    }

    static setDataLoading(flag) {
        return {
            type: 'SET_DATA_LOADING',
            flg: flag
        }
    }
}