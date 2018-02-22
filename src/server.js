// @flow

import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import doc from 'lib/__html';

// TODO: routing!
import Page from 'pages/article';

export default (): string => {
    const state = {}; // TODO: get state from request
    const styletron = new Styletron();

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <Page />
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return doc({ html, stylesForHead, state });
};
