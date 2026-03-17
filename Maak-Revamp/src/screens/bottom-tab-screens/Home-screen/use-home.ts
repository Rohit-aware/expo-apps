const useHomeHook = () => {
    const transactions = [
        {
            productName: 'Food Good',
            paymentMode: 'Cash',
            restaurantName: 'Restaurant 1',
            price: 'EGP 254',
            date: '25th Sept',
            paymentType: 'Failed',
        },
        {
            productName: 'Burger King',
            paymentMode: 'Card',
            restaurantName: 'Restaurant 2',
            price: 'EGP 500',
            date: '26th Sept',
            paymentType: 'Successful',
        },
        {
            productName: 'Burger King',
            paymentMode: 'Card',
            restaurantName: 'Restaurant 2',
            price: 'EGP 500',
            date: '26th Sept',
            paymentType: 'Pending',
        },
    ];


    return {
        transactions
    };
};
export { useHomeHook };