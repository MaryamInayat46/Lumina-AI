import { useState } from 'react';

const useSubmit = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.email || !validateEmail(data.email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        // Honeypot check
        if (data.bot_field) {
            console.warn('Bot detected via honeypot.');
            setLoading(false);
            setSuccess(true); // Faking success to bots
            return;
        }

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccess(true);
            if (onSuccess) onSuccess(data);
        } catch (err) {
            setError('Something went wrong. Please try again.');
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
