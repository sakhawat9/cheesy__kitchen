import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_X2jogsHYgJQNw8Mxn1iYXZyM001TvFWmtv');

const Payment = ({handlePaymentSuccess, error}) => {
    return (
        <Elements  stripe={stripePromise} >
             <SimpleCardForm handlePayment={handlePaymentSuccess} err={error}></SimpleCardForm>  
        </Elements>
    );
};

export default Payment;