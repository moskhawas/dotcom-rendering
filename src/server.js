// @flow

import fs from 'fs';
import path from 'path';
import pify from 'pify';
import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import doc from 'lib/__html';

const readFile = pify(fs.readFile);

const renderPage = async function renderPage(pageName) {
    const page = await import(`./pages/${pageName}`);
    const Page = page.default;
    const state = { page: pageName };
    const styletron = new Styletron();

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <Page />
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return doc({ html, stylesForHead, state });
};

export default async (req: {}): string => {
    if (req.url.includes('/pages/')) {
        return renderPage(req.url.split('/pages/')[1]);
    }
    if (req.url.includes('/assets/javascript/')) {
        return readFile(
            path.join('dist', req.url.split('/assets/javascript/')[1]),
            'utf8',
        );
    }
};
