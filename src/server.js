// @flow

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import requireDir from 'require-dir';
import doc from 'lib/__html';

const pages = requireDir('./pages');
const readFile = promisify(fs.readFile);

const renderPage = async function renderPage(pageName) {
    const Page = pages[pageName].default;
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
    if (req.url.includes('/healthcheck')) {
        return 'OK';
    }
    if (req.url.includes('/pages/')) {
        return renderPage(req.url.split('/pages/')[1]);
    }

    // TODO: retreive static assets from CDN
    if (req.url.includes('/assets/javascript/')) {
        return readFile(
            path.join('dist', req.url.split('/assets/javascript/')[1]),
            'utf8',
        );
    }
};
