import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // stripe expect values of items to be in cents so make all values * 100
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H0kwnKvJ9sUxKanVgIsiinzqyI07aJKevuGD5e3RtAmz5b0sRyLWeCL2wFERXlYOFwJx2MErAExVrFmMBnffKm900FKWH1Ui2';

    const onToken = token => {
        const data = {
            amount: priceForStripe,
            token: token
        }

        axios.post('/payment', data).then(response => {
            alert('Payment Successful');
            console.log(response);
        }).catch(error => {
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card'
            )
            console.log('Payment error', error);
        })
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