import { Stripe, loadStripe } from '@stripe/stripe-js';

export async function checkout(){
	let stripePromise = null

	const getStripe = () => {
		if(!stripePromise) {
			stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
		}
		return stripePromise
	}

	const stripe = await getStripe()

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems: [{
            price: "price_1MqJ5qCGYDFYPte2fhHaCziy",
            quantity: 1
        }],
		successUrl: `${window.location.origin}/view-ticket`,
		cancelUrl: window.location.href
	})

}