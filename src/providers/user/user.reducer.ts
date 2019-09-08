import * as UserActions from './user.actions';
import { UserResponse } from './user.interface';

export function userReducer(state: UserResponse, action: UserActions.Actions) {

    switch (action.type) {

        case UserActions.GET_USER_SUCCESS:
            return action.payload;

        default:
            return state;

    }
}
