import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // stripe expect values of items to be in cents so make all values * 100
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H0kwnKvJ9sUxKanVgIsiinzqyI07aJKevuGD5e3RtAmz5b0sRyLWeCL2wFERXlYOFwJx2MErAExVrFmMBnffKm900FKWH1Ui2';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='E-Commerce'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel={'Pay Now'}
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;