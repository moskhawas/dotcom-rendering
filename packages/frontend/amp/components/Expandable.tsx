import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import InfoIcon from '@guardian/pasteup/icons/info.svg';
import PlusIcon from '@guardian/pasteup/icons/plus.svg';

import { body, textSans, headline } from '@guardian/pasteup/typography';

const wrapper = (pillar: Pillar) => css`
    background: #f1f1f1;
    position: relative;
    padding: 0 5px 6px;
    margin: 16px 0 36px;

    a {
        color: ${pillarPalette[pillar].dark};
    }

    ${body(2)};
`;

const buttonStyles = css`
    height: 32px;
    background-color: #121212;
    border-radius: 100em;
    color: white;
    border: none;
    ${textSans(2)};
    font-weight: 700;
    padding: 0 15px 0 7px;

    display: inline-flex;
    align-items: center;

    position: absolute;
    bottom: 0;
    transform: translate(0, 50%);

    span {
        display: inline-flex;
        align-items: center;
    }

    svg {
        fill: white;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
`;

const headerStyle = css`
    ${headline(3)};
`;

const creditStyle = css`
    ${textSans(2)};
    display: block;
    margin: 12px 0;
`;

const pillarColour = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].main};
`;

const headers = css`
    margin: 0 0 16px;
`;

const innerStyle = css`
    padding-bottom: 24px;
`;

export const Expandable: React.FC<{
    id: string;
    type: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
    pillar: Pillar;
}> = ({ id, type, title, img, html, credit, pillar }) => (
    <aside className={wrapper(pillar)}>
        <div className={headers}>
            <span className={cx(headerStyle, pillarColour(pillar))}>
                {type}
            </span>
            <h1 className={headerStyle}>{title}</h1>
        </div>

        <div className={innerStyle} hidden={true} id={id}>
            {img && <amp-img src={img} alt={`Image for ${title} explainer`} />}
            <div // tslint:disable-line:react-no-dangerous-html
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
            <span className={creditStyle}>
                <InfoIcon /> {credit}
            </span>
        </div>

        <button
            on={`tap:${id}.toggleVisibility,show-${id}.toggleVisibility,hide-${id}.toggleVisibility`}
            className={buttonStyles}
        >
            <span id={`show-${id}`}>
                <PlusIcon />
                Show
            </span>
            <span hidden={true} id={`hide-${id}`}>
                <PlusIcon />
                Hide
            </span>
        </button>
    </aside>
);
