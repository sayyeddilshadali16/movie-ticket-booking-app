export const bookTicket = (ticket) => {
    return {
        type: 'BOOKTICKET',
        payload: ticket
    }
};

export const cancelTicket = (ticket) => {
    return {
        type: 'CANCELTICKET',
        payload: ticket
    }
};