// @flow
import normalize from 'normalize.css';

export default ({
    stylesForHead,
    html,
}: {
    stylesForHead: string,
    html: string,
}) => `
    <!doctype html>
    <html>
        <head>
            <title>My Universal App</title>
            <style>
                ${normalize}
            </style>
            ${stylesForHead}
            <script src="/assets/javascript/app.browser.js" async></script>
        </head>
        <body>
            <div id='app'>${html}</div>
        </body>
    </html>
`;
