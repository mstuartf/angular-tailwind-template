import * as UserActions from '../providers/user/user.actions';


// all actions are passing through the meta reducers before being handed over to the feature reducers
export function metaReducer(reducer) {

    return (state, action) => {

        switch (action.type) {

            case UserActions.LOGOUT_SUCCESS:
                return {};

            default:
                return reducer(state, action);

        }
    };

}
