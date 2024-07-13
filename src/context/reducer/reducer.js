
export const initialState = {
    user: null,
    loading: false
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "REGISTER_USER":
            return {
                user: action.user
            }
        case "LOADING":
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}

export default reducer