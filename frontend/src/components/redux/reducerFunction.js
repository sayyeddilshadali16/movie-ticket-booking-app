const initialState = [];

const bookTickets = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKTICKET':
            return [
                ...state,
                action.payload
            ];
        case 'CANCELTICKET':
            return state.filter((x) => x.id !== action.payload.id);

        default:
            return state;
    }
}

export default bookTickets;