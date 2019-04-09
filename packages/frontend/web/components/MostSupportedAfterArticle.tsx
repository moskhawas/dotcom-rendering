import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { desktop, tablet, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { BigNumber } from '@guardian/guui';
import { AsyncClientComponent } from './lib/AsyncClientComponent';
import { reportError } from '@frontend/web/browser/reportError';
import { SupportButton } from './SupportButton';
// import { debug } from 'util';

const container = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-top: 3px;
    position: relative;

    ${desktop} {
        padding-top: 6px;
    }
`;

const heading = css`
    ${headline(4)};
    color: ${palette.neutral[7]};
    float: left;
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
        ${headline(3)};
        width: 140px;
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
    }

    ${wide} {
        width: 220px;
    }
`;

const subheading = css`
    ${headline(3)};
    color: ${palette.neutral[7]};
    float: left;
    clear: left;
    font-weight: 100;
    max-width: 80%;

    ${leftCol} {
        ${headline(2)};
        width: 140px;
    }

    ${wide} {
        width: 220px;
    }
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
    margin-top: 12px;
    display: grid;
    grid-auto-flow: column;
    clear: left;
    grid-gap: 0 10px;
    grid-template-columns: auto;
    grid-template-rows: repeat(10, auto);

    ${tablet} {
        grid-template-columns: repeat(2, 300px);
        grid-template-rows: repeat(5, auto);
    }

    ${leftCol} {
        margin-top: 0;
        margin-left: 10px;
        clear: none;
    }
`;

const hideList = css`
    display: none;
`;

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    @keyframes in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    animation: in 0.5s;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${palette.neutral[86]};
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    ${tablet} {
        padding-top: 3px;
        padding-bottom: 0;
        min-height: 72px;
    }

    ${desktop} {
        height: 100%;
        display: inline-block;
        width: 100%;
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: ${palette.neutral[7]};
    position: relative;

    &::after {
        position: absolute;
        content: '';
        height: 10px;
        width: 10px;
        background-color: ${palette.highlight.main};
        border-radius: 50%;
        bottom: 2px;
        right: -12px;
    }
`;

const headlineHeader = css`
    margin-top: -4px;
    margin-left: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline(2)};
`;

const liveKicker = css`
    color: ${palette.news.main};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

interface Trail {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
}

// interface Tab {
//     heading: string;
//     trails: Trail[];
// }

interface Props {
    sectionName: string;
}

export class MostSupportedAfterArticle extends Component<
    Props,
    { selectedTabIndex: number }
> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
            order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
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

    public tabSelected(index: number) {
        this.setState({
            selectedTabIndex: index,
        });
    }

    public render() {
        setTimeout(() => {
            this.shuffleOrder();
        }, 1500);

        return (
            <div className={container}>
                <h2 className={heading}>Most supported</h2>
                <h3 className={subheading}>
                    Stories that have most inspired readers to support Guardian
                    journalism
                </h3>
                <SupportButton />
                <AsyncClientComponent f={this.fetchTrails}>
                    {({ data }) => (
                        <div className={listContainer}>
                            <ol className={list} role="tabpanel">
                                {(data || []).filter(article => article && article.url && article.headline).slice(0, 10).map(
                                    (article, i) => (
                                            <li
                                                className={cx(
                                                    listItem,
                                                    css`
                                                        order: ${this.state
                                                            .order[i]};
                                                    `,
                                                )}
                                                key={article.url}
                                            >
                                            <span className={bigNumber}>
                                                <BigNumber index={i + 1} />
                                            </span>
                                            <h2 className={headlineHeader}>
                                                <a
                                                    className={headlineLink}
                                                    href={article.url}
                                                >
                                                {article.headline}
                                                </a>
                                                </h2>
                                            </li>
                                        )
                                    // debugger
                                    // const trail = data[ii];
                                    // console.log(trail);
                                    // return (
                                    //     <li
                                    //         className={cx(
                                    //             listItem,
                                    //             css`
                                    //                 order: ${this.state.order[
                                    //                     ii
                                    //                 ]};
                                    //             `,
                                    //         )}
                                    //         key={trail.url}
                                    //     >
                                    //         <span className={bigNumber}>
                                    //             <BigNumber index={ii + 1} />
                                    //         </span>
                                    //         <h2 className={headlineHeader}>
                                    //             <a
                                    //                 className={headlineLink}
                                    //                 href={trail.url}
                                    //             >
                                    //                 {trail.isLiveBlog && (
                                    //                     <span
                                    //                         className={
                                    //                             liveKicker
                                    //                         }
                                    //                     >
                                    //                         Live
                                    //                     </span>
                                    //                 )}
                                    //                 {trail.linkText}
                                    //             </a>
                                    //         </h2>
                                    //     </li>
                                    // );
                                )}
                            </ol>
                        </div>
                    )}
                </AsyncClientComponent>
            </div>
        );
    }

    public fetchTrails: () => Promise<any> = () => {
        return fetch(
            `https://what-if-streaming-was-a-reality.ophan.co.uk/contributions`,
        )
            .then(response => {
                if (!response.ok) {
                    resolve([]);
                }
                return response.json();
            })
            .then(mostSupported => {
                if (Array.isArray(mostSupported)) {
                    return Promise.all(
                        mostSupported.map((article, index) => {
                            const url = new URL(article.url);
                            const path = url.pathname;
                            const host = url.hostname;
                            if (
                                path.split('/').length > 3 &&
                                host === 'www.theguardian.com'
                            ) {
                                return fetch(
                                    `https://content.guardianapis.com${path}?show-fields=headline&api-key=test`,
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
                // console.log(err);
                // return resolve([]);
            });
    };
}
