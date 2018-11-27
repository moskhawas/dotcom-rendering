import 'ophan-tracker-js';
import { init } from '@frontend/web/hack/MyList';

// kick off the app
const go = () => {
    if (module.hot) {
        module.hot.accept();
    }

    // kick-off client side MyList enhancement
    init();

    import('@frontend/web/lib/ga').then(({ init }) => {
        init();
    });
};

// make sure we've patched the env before running the app
if (window.guardian.polyfilled) {
    go();
} else {
    window.guardian.onPolyfilled = go;
}
