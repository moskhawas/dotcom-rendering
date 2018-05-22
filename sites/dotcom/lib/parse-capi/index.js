// @flow

import compose from 'compose-function';
import { string as curly } from 'curlyquotes';
import get from 'lodash.get';

import clean from './clean';
import bigBullets from './big-bullets';

const headline = compose(clean, curly);
const standfirst = compose(clean, bigBullets);
const main = clean;
const body = clean;

type props = {
    contentFields?: {},
    config?: {},
};

const defaultArgs = { config: {}, contentFields: {} };

export default ({ contentFields, config }: props = defaultArgs) => ({
    // here we create our own object of CAPI content on the 'CAPI' key
    CAPI: {
        headline: headline(get(config, 'page.headline', '')),
        standfirst: standfirst(get(contentFields, 'fields.standfirst', '')),
        main: main(get(contentFields, 'fields.main', '')),
        body: body(
            get(contentFields, 'fields.blocks.body', [])
                .map(block => block.bodyHtml)
                .filter(Boolean)
                .join(''),
        ),
        components: {
            audio: {
                source: 'https://flex.acast.com/audio.guim.co.uk/2018/05/04-54514-gnl.books.20180504.st.henryeliotmazes.mp3',
                image: 'https://uploads.guim.co.uk/2018/01/15/Football_Weekly_1400x1400.jpg'   
            }
        }
    },
});
