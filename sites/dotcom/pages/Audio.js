// @flow

/* eslint-disable react/no-danger */

import { styled } from '@guardian/guui';
import { connect } from 'unistore/preact';

import { Row, Cols } from '@guardian/guui/grid';
import { textEgyptian, headline } from '@guardian/pasteup/fonts';
import palette from '@guardian/pasteup/palette';
import { clearFix } from '@guardian/pasteup/mixins';

import Page from '../components/Page';
import Header from '../components/Header';
import AudioPage from '../components/Audio';

const Headline = styled('h1')({
    fontFamily: headline,
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 700,
    color: palette.red.dark,
    paddingBottom: 36,
    paddingTop: 3,
});

const Body = styled('section')({
    p: {
        fontFamily: textEgyptian,
        lineHeight: 1.4,
        marginBottom: '1rem',
        color: palette.neutral[1],
    },
    h2: {
        fontFamily: headline,
        color: palette.neutral[1],
        fontSize: 20,
        lineHeight: 1.2,
        fontWeight: 900,
        marginTop: 27,
        marginBottom: 1,
    },
    '.gu-video': {
        maxWidth: '100%',
    },
});

const Standfirst = styled('p')({
    color: palette.neutral[1],
    fontFamily: textEgyptian,
    fontSize: 20,
    fontWeight: 100,
    lineHeight: 1.2,
    marginBottom: 12,
    maxWidth: 540,
    paddingTop: 2,

    a: {
        color: palette.red.dark,
        textDecoration: 'none',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: palette.neutral[5],
    },

    '.bullet': {
        color: 'transparent',
        height: '0.75em',
        width: '0.75em',
        borderRadius: '50%',
        marginRight: 2,
        backgroundColor: palette.red.dark,
        display: 'inline-block',
        lineHeight: 0.8,
    },
});

const Labels = styled('div')({ ...clearFix, paddingTop: 6 });

const SectionLabel = styled('div')({
    color: palette.red.dark,
    fontFamily: textEgyptian,
    fontWeight: 900,
    paddingRight: 6,
    float: 'left',
});

const SeriesLabel = styled(SectionLabel)({
    fontSize: 15,
    fontWeight: 500,
});

export default connect('CAPI')(({ CAPI = {} }) => (
    <Page>
        <article>
            <Header />
            <Row>
                <Cols wide={12} leftCol={12}>
                    <Headline>{CAPI.headline}</Headline>
                    <Standfirst
                        dangerouslySetInnerHTML={{
                            __html: CAPI.standfirst,
                        }}
                    />
                </Cols>
            </Row>
            <div
                dangerouslySetInnerHTML={{
                    __html: CAPI.main,
                }}
            />
            <Body>
                <AudioPage data={CAPI} />
            </Body>
        </article>
    </Page>
));
