import React from 'react';

const SwgBtn = () => {
    return (
        <section>
            <button
                subscriptions-action="subscribe"
                subscriptions-service="subscribe.google.com"
                // subscriptions-service="local"
                subscriptions-display="NOT data.loggedIn AND data.showSwg"
            >
                Subscribe
            </button>
        </section>
    );
};

export default SwgBtn;
