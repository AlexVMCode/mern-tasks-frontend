export default function appReducer(state, action) {
    return {
        ...state,
        token: action.payload
    }
}