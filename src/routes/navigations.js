import { StackNavigator } from 'react-navigation';
import Map from '../containers/map';
import Login from '../containers/login';
import Signup from '../containers/signup';
import AllMarkers from '../containers/allMarkers';

const Navigations = StackNavigator({

    'login': {
        screen: Login
    },

    'signup': {
        screen: Signup
    },

    'map': {
        screen: Map
    },

    'allmarkers': {
        screen: AllMarkers
    }

},
    {
        navigationOptions: {
            header: null
        }
    }

)

export default Navigations;