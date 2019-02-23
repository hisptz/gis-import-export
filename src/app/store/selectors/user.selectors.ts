import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { selectAllUsers } from '../reducers/user.reducer';
import { User } from '../../core';
export const getUserState = createSelector(
  getRootState,
  (state: State) => state.user
);

export const getAllUser = createSelector(getUserState, selectAllUsers);

export const getCurrentUser = createSelector(
  getAllUser,
  (users: User[]) => users[0]
);

export const getCurrentUserManagementAuthoritiesStatus = createSelector(
  getCurrentUser,
  (currentUser: User) => {
    if (!currentUser) {
      return false;
    }

    return currentUser && currentUser.authorities
      ? currentUser.authorities.includes('ALL')
      : false;
  }
);
