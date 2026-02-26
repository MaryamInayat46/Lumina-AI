import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const useSubmit = (onSuccessCallback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const botField = formData.get('bot_field');

        // 1. Honeypot check
        if (botField) {
            console.warn('Bot detected via honeypot');
            setSuccess(true);
            setLoading(false);
            return;
        }

        // 2. Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        // 3. Client-side Rate Limiting (Simple)
        const lastSub = localStorage.getItem('lumina_last_submission');
        const now = Date.now();
        if (lastSub && now - parseInt(lastSub, 10) < 60000) { // 1 minute limit
            setError('Too many requests. Please wait a moment before trying again.');
            toast.error('Slow down! One request per minute permitted.');
            setLoading(false);
            return;
        }

        try {
            // 4. Invoke Supabase Edge Function for secure processing & email
            const { data, error: funcError } = await supabase.functions.invoke('welcome-email', {
                body: { email, location: 'Remote/Web' }
            });

            if (funcError) {
                // Special handling for duplicate emails if returned by function
                if (funcError.message?.includes('duplicate')) {
                    setError('This email is already on our waitlist!');
                    toast.error('You are already registered!');
                } else {
                    throw funcError;
                }
            } else {
                setSuccess(true);
                localStorage.setItem('lumina_last_submission', now.toString());
                if (onSuccessCallback) onSuccessCallback();
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSuccess(false);
        setError(null);
    };

    return { submit, loading, error, success, reset };
};

export default useSubmit;
