import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import 'ophan-tracker-js';
import { getRaven } from '@frontend/web/browser/raven';
import {
    init as initGa,
    sendPageView as sendGaPageView,
} from '@frontend/web/browser/ga';
// import { Article } from './pages/Article';
import { ReportedError } from '@frontend/web/browser/reportError';

if (module.hot) {
    module.hot.accept();
}

// Kick off the app
const go = () => {
    const hydrate = () => {
        // const { cssIDs, data } = window.guardian.app;

        initGa();

        const container = document.getElementById('app');

        if (container) {
            /**
             * TODO: Remove conditional when Emotion's issue is resolved.
             * We're having to prevent emotion hydrating styles in the browser
             * in development mode to retain the sourceMap info. As detailed
             * in the issue raised here https://github.com/emotion-js/emotion/issues/487
             */
            // if (process.env.NODE_ENV !== 'development') {
            //     hydrateCSS(cssIDs);
            // }
            // hydrateApp(React.createElement(Article, { data }), container);
            // import('@frontend/web/components/ClientComponent').then(c => {
            //     console.log('hello', c);
            //     const hello = document.getElementById('hello');
            //     hydrateApp(React.createElement(c.default, {}), hello);
            // });
            const islands = document.querySelectorAll('.js-island');
            // tslint:disable-next-line:no-unused-expression
            [].forEach.call(islands,island => {
                console.log(island)
                const path = island.dataset.island;
                const d = JSON.parse(island.dataset.data);

                // can't really use the @frontend/web/ syntax in the browser
                import('./components/' +  path).then(component => {
                    hydrateApp(
                        React.createElement(component.default, d),
                        island,
                    );
                });
            });
        }

        sendGaPageView();
    };

    getRaven()
        .catch(err => {
            hydrate();
        })
        .then(raven => {
            if (!raven) {
                return;
            }

            const oldOnError = window.onerror;

            /**
             * Make sure global onerror doesn't report errors
             * already manually reported via reportError module
             * by checking for 'reported' property
             */
            window.onerror = (
                message,
                filename,
                lineno,
                colno,
                error: ReportedError | undefined,
            ) => {
                // Not all browsers pass the error object
                if (!error || !error.reported) {
                    oldOnError(message, filename, lineno, colno, error);
                }
            };

            // Report unhandled promise rejections
            window.addEventListener('unhandledrejection', event => {
                // Prevent error output on the console:
                event.preventDefault();

                // Typecast Event to PromiseRejectionEvent for TypeScript
                const { reason } = event as PromiseRejectionEvent;

                raven.captureException(reason);
            });

            raven.context(
                {
                    tags: {
                        feature: 'hydrate',
                    },
                },
                hydrate,
            );
        })
        .catch(() => {
            /**
             * Raven will have reported any unhandled promise
             * rejections from this chain so return here.
             */
            return;
        });
};

// Make sure we've patched the env before running the app
if (window.guardian.polyfilled) {
    go();
} else {
    window.guardian.onPolyfilled = go;
}

console.log('HELLO IM RUNNIGN');
