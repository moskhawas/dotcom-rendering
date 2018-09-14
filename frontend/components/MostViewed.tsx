import React, { Component } from 'react';
import { css } from 'react-emotion';
import { headline, egyptian } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import {
    desktop,
    mobileLandscape,
    tablet,
    leftCol,
} from '@guardian/pasteup/breakpoints';
import { BigNumber } from '@guardian/guui';

const container = css`
    border-top: 1px solid #dcdcdc;
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }
`;

const heading = css`
    font-family: ${headline};
    color: ${palette.neutral[7]};
    font-size: 24px;
    font-weight: 900;
    line-height: 1;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
        font-size: 20px;
        line-height: 1.2;
        width: 140px;
        position: relative;

        :after {
            content: '';
            display: block;
            position: absolute;
            height: 30px;
            width: 1px;
            background-color: #dcdcdc;
            right: -11px;
            top: -6px;
        }
    }

    ${leftCol} {
        width: 220px;
    }
`;

const list = css`
    margin-top: 12px;

    ${desktop} {
        border-top: 1px solid #dcdcdc;
        width: 620px;
        min-height: 300px;
        column-width: 300px;
        column-gap: 20px;
        column-fill: balance;
        column-count: 2;
    }

    ${leftCol} {
        margin-left: 160px;
    }

    ${leftCol} {
        margin-left: 240px;
    }
`;

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #dcdcdc;
    }

    :first-child {
        &:before {
            display: none;
        }
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

        :nth-child(6) {
            &:before {
                display: none;
            }
        }
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: #121212;
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
    color: #121212;
    font-family: ${egyptian};
    font-size: 16px;
    line-height: 1.2;
    font-weight: 500;
`;

interface Trail {
    url: string;
    linkText: string;
}

export default class MostViewed extends Component<{}, { trails: Trail[] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            trails: [],
        };
    }

    public componentDidMount() {
        fetch('https://api.nextgen.guardianapps.co.uk/most-read-geo.json?guui')
            .then(resp => resp.json())
            .then(({ trails }) => {
                this.setState({
                    trails,
                });
            });
    }

    public render() {
        return (
            <div className={container}>
                <h2 className={heading}>Most Viewed</h2>
                <ul className={list}>
                    {this.state.trails.map((trail, i) => (
                        <li className={listItem} key={trail.url}>
                            <span className={bigNumber}>
                                <BigNumber index={i + 1} />
                            </span>
                            <h2 className={headlineHeader}>
                                <a className={headlineLink} href={trail.url}>
                                    {trail.linkText}
                                </a>
                            </h2>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
