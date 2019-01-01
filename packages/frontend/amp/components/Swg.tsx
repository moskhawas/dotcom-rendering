import React from 'react';

const SwgBtn = () => {
    return (
        <section>
            <button
                subscriptions-action="subscribe"
                subscriptions-service="subscribe.google.com"
                subscriptions-display="NOT data.isLoggedIn"
            >
                Subscribe
            </button>
        </section>
    );
};

export default SwgBtn;
