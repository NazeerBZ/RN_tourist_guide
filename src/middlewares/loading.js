import Actions from '../actions/actions';
import { Alert } from 'react-native';

export class Loading {

    static setDataLoading() {
        return (dispatch) => {
            dispatch(Actions.setDataLoading(false));
        }
    }
}