import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';
import easypaisa from '../assets/easypaisaqr.jpeg';

const PaymentPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filename = queryParams.get('filename');
    const price = queryParams.get('price');

    const [paymentMethod, setPaymentMethod] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert('Payment Successful!');
    };

    return (
        <div className="payment-container">
            <h2>Make Payment</h2>
            {filename && <p>File: {filename}</p>}
            {price && <p>Total Price: ${price}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select {...register("paymentMethod", { required: true })} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Select Payment Method</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="easypaisa">Easypaisa</option>
                    </select>
                    {errors.paymentMethod && <p className="error-message">Please select a payment method</p>}
                </div>

                {paymentMethod === 'card' && (
                    <div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" {...register("cardNumber", { required: true })} />
                            {errors.cardNumber && <p className="error-message">Card number is required</p>}
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" {...register("expiryDate", { required: true })} />
                            {errors.expiryDate && <p className="error-message">Expiry date is required</p>}
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input type="text" {...register("cvv", { required: true })} />
                            {errors.cvv && <p className="error-message">CVV is required</p>}
                        </div>
                    </div>
                )}

                {paymentMethod === 'paypal' && (
                    <div className="form-group">
                        <label>PayPal Email</label>
                        <input type="email" {...register("paypalEmail", { required: true })} />
                        {errors.paypalEmail && <p className="error-message">PayPal email is required</p>}
                    </div>
                )}

                {paymentMethod === 'bank' && (
                    <div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input type="text" {...register("accountNumber", { required: true })} />
                            {errors.accountNumber && <p className="error-message">Account number is required</p>}
                        </div>
                        <div className="form-group">
                            <label>Routing Number</label>
                            <input type="text" {...register("routingNumber", { required: true })} />
                            {errors.routingNumber && <p className="error-message">Routing number is required</p>}
                        </div>
                    </div>
                )}

                {paymentMethod === 'easypaisa' && (
                    <div className="qr-code-image">
                        <img src={easypaisa} alt="Easypaisa QR Code" />
                    </div>
                )}

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentPage;
