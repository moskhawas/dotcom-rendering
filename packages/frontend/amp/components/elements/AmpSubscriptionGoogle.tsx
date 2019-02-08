import React from 'react';

import { css } from 'emotion';

const ampSubscriptionGoogleStyles = css`
    width: 150px;
    height: 30px;
    min-height: 30px;
    padding: 9px;
`;

export const AmpSubscriptionGoogle: React.FunctionComponent = () => (
    <button
        subscriptions-action="subscribe"
        subscriptions-service="subscribe.google.com"
        subscriptions-display="true"
        className={ampSubscriptionGoogleStyles}
    >
        Subscribe
    </button>
);
