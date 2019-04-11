import React, { Component } from 'react';
import { css } from 'emotion';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { tablet, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { BigNumber } from '@guardian/guui';
import { AsyncClientComponent } from './lib/AsyncClientComponent';
import { reportError } from '@frontend/web/browser/reportError';
import { SupportButton } from './SupportButton';

const container = css`
    position: relative;
    padding-top: 6px;
    min-height: 300px;
`;

const headingContainer = css`
    position: relative;

    :after {
        content: '';
        display: block;
        position: absolute;
        height: 30px;
        width: 1px;
        background-color: ${palette.neutral[86]};
        right: -11px;
        top: -6px;
    }

    ${leftCol} {
        width: 140px;
    }

    ${wide} {
        width: 220px;
    }
`;

const heading = css`
    ${headline(4)};
    background-color: ${palette.highlight.main};
    color: ${palette.neutral[7]};
    float: left;
    font-weight: 900;
    padding: 3px;
    margin-bottom: 6px;
    white-space: nowrap;

    ${leftCol} {
        ${headline(3)};
    }
`;

const subheading = css`
    ${textSans(3)};
    clear: left;
    color: ${palette.neutral[7]};
    float: left;
    font-weight: 100;
    line-height: 18px;
    max-width: 80%;
`;

const listContainer = css`
    max-width: 460px;

    ${leftCol} {
        margin-left: 160px;
    }

    ${wide} {
        margin-left: 230px;
    }
`;

const list = css`
    clear: left;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0 24px;
    grid-template-columns: auto;
    grid-template-rows: repeat(10, auto);
    margin-top: 12px;

    ${tablet} {
        grid-template-columns: repeat(2, 300px);
        grid-template-rows: repeat(5, auto);
    }

    ${leftCol} {
        clear: none;
        grid-template-columns: repeat(2, 460px);
        margin-left: 10px;
        margin-top: 0;
    }
`;

const listItem = css`
    animation: in 1.5s;
    box-sizing: border-box;
    padding-bottom: 24px;
    padding-top: 6px;
    position: relative;

    @keyframes in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    &:before {
        background-color: ${palette.neutral[86]};
        content: '';
        display: block;
        height: 1px;
        left: 0;
        position: absolute;
        right: 10px;
        top: 0;
        width: 100%;
    }

    &:first-of-type,
    &:nth-of-type(6) {
        padding-top: 0;
    }

    &:first-of-type:before,
    &:nth-of-type(6):before {
        display: none;
    }

    ${tablet} {
        min-height: 72px;
        padding-bottom: 0;
        padding-top: 3px;
    }
`;

const bigNumber = css`
    fill: ${palette.neutral[7]};
    float: left;
    margin-top: 3px;
    position: relative;

    &::after {
        background-color: ${palette.highlight.main};
        border-radius: 50%;
        bottom: 2px;
        content: '';
        height: 10px;
        position: absolute;
        right: -12px;
        width: 10px;
    }
`;

const headlineHeader = css`
    margin-left: 80px;
    margin-top: -4px;
    overflow: hidden;
    padding-bottom: 2px;
    padding-top: 2px;
    word-wrap: break-word;
    margin-right: 30px;
`;

const headlineLink = css`
    ${headline(2)};
    color: ${palette.neutral[7]};
    font-weight: 500;
    text-decoration: none;
`;

interface Article {
    url: string;
    headline: string;
}

export class MostSupportedAfterArticle extends Component<
    {},
    { order: number[] }
> {
    public refresh: NodeJS.Timeout | null;
    constructor(props: {}) {
        super(props);
        this.state = {
            order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        this.refresh = null;
    }

    public componentDidMount() {
        this.refresh = setInterval(() => {
            this.shuffleOrder();
        }, 3000);
    }

    public componentWillUnmount() {
        if (this.refresh != null) {
            clearInterval(this.refresh);
        }
    }

    public shuffleOrder() {
        const newOrder = this.state.order.slice(0);
        const swap1 = Math.floor(Math.random() * newOrder.length);
        const swap2 = Math.floor(Math.random() * newOrder.length);

        const firstElement = newOrder[swap1];
        const secondElement = newOrder[swap2];

        newOrder[swap1] = secondElement;
        newOrder[swap2] = firstElement;

        this.setState({
            order: newOrder,
        });
    }

    public render() {
        return (
            <div className={container}>
                <div className={headingContainer}>
                    <h2 className={heading}>Most supported</h2>
                    <h3 className={subheading}>
                        Stories that have received the most funding from our
                        readers in the last 24 hours
                    </h3>
                </div>
                <SupportButton />
                <AsyncClientComponent f={this.fetchTrails}>
                    {({ data }) => {
                        const articles: Article[] = (data || [])
                            .filter(
                                (article: Article) =>
                                    article && article.url && article.headline,
                            )
                            .slice(0, 10);
                        return (
                            <div className={listContainer}>
                                <ol className={list} role="tabpanel">
                                    {(this.state.order || []).map(
                                        (i: number, ii: number) => {
                                            const article: Article =
                                                articles[i];
                                            return article ? (
                                                <li
                                                    className={listItem}
                                                    key={article.url}
                                                >
                                                    <span className={bigNumber}>
                                                        <BigNumber
                                                            index={ii + 1}
                                                        />
                                                    </span>
                                                    <h2
                                                        className={
                                                            headlineHeader
                                                        }
                                                    >
                                                        <a
                                                            className={
                                                                headlineLink
                                                            }
                                                            href={article.url}
                                                        >
                                                            {article.headline}
                                                        </a>
                                                    </h2>
                                                </li>
                                            ) : null;
                                        },
                                    )}
                                </ol>
                            </div>
                        );
                    }}
                </AsyncClientComponent>
            </div>
        );
    }

    public fetchTrails: () => Promise<Article[]> = () => {
        // const contributionsURL = 'https://what-if-streaming-was-a-reality.ophan.co.uk/contributions'
        const key = 'test';
        const contributionsURL =
            'https://rank-index.s3.eu-west-1.amazonaws.com/2019-04-09.json';
        return fetch(contributionsURL)
            .then(response => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then(mostSupported => {
                if (Array.isArray(mostSupported)) {
                    return Promise.all(
                        mostSupported.map((article, index) => {
                            const url = new URL(`https://${article.url}`);
                            const path = url.pathname;
                            const host = url.hostname;
                            if (
                                path.split('/').length > 3 &&
                                host === 'www.theguardian.com'
                            ) {
                                return fetch(
                                    `https://content.guardianapis.com${path}?api-key=${key}`,
                                )
                                    .then(capiResponse => {
                                        return capiResponse.json();
                                    })
                                    .then(articleJSON => {
                                        article.headline =
                                            articleJSON.response.content.webTitle;
                                        return article;
                                    })
                                    .catch(err => {
                                        reportError(err, {
                                            feature: 'most-supported',
                                        });
                                        return article;
                                    });
                            }
                        }),
                    );
                    return mostSupported;
                }
            })
            .catch(err => {
                reportError(err, {
                    feature: 'most-supported',
                });
            });
    };
}
