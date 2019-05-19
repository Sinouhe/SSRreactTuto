import axios from 'axios';
export const FETCH_USERS = 'fetch_users';

export const fetchUsers = () => async (dispatch, getState, axiosInstanceAPI) => {
    const res = await axiosInstanceAPI.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    })
}