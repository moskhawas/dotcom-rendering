import React from 'react';
import { css } from 'react-emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 18px;
    margin-bottom: 6px;

    margin-top: 0.75rem;
`;

const tagLinkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 0.3rem;
    padding-right: 0.35rem;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 15px;
    line-height: 1.375rem;

    :after {
        content: '/';
        font-size: 1em;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -0.19em;
        color: #767676;
    }
`;

const tagItemStyle = css`
    display: inline-block;

    :last-of-type > a::after {
        content: '';
    }
`;

const tagListStyle = css`
    display: inline-block;
    margin-left: -0.35rem;
`;

const tagsWrapper = css`
    padding-top: 0.375rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.0625rem solid #dcdcdc;
    margin-bottom: 0.375rem;
`;

const labelLinkStyle = (pillar: Pillar) => css`
    position: relative;
    display: block;
    padding-left: 0.3em;
    padding-right: 0.35em;
    font-weight: 500;
    line-height: 1.375rem;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    text-decoration: none;

    :after {
        content: '/';
        font-size: 1em;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -0.19em;
        color: #767676;
    }
`;

const labelItemStyle = css`
    display: inline-block;

    :last-of-type > a::after {
        content: '';
    }
`;

const labelListStyle = css`
    margin-left: -0.35rem;
`;

const topicStyle = css`
    font-size: 13px;
    line-height: 1rem;
    color: #767676;
    display: block;
    margin-bottom: -0.1875rem;
    font-family: ${serif.body};
`;

const Submeta: React.SFC<{
    pillar: Pillar;
    sections: SimpleLinkType[];
    keywords: SimpleLinkType[];
}> = ({ pillar, sections, keywords }) => {
    const tagLinks = keywords.map(tag => (
        <li className={tagItemStyle} key={tag.url}>
            <a
                className={tagLinkStyle(pillar)}
                href={`https://www.theguardian.com/${tag.url}`}
            >
                {tag.title}
            </a>
        </li>
    ));

    const labels = sections.map(label => (
        <li className={labelItemStyle} key={label.url}>
            <a
                className={labelLinkStyle(pillar)}
                href={`https://www.theguardian.com/${label.url}`}
            >
                {label.title}
            </a>
        </li>
    ));

    return (
        <div className={guardianLines}>
            <span className={topicStyle}>Topics</span>
            <ul className={labelListStyle}>{labels}</ul>
            <div className={tagsWrapper}>
                <ul className={tagListStyle}>{tagLinks}</ul>
            </div>
        </div>
    );
};

export default Submeta;
