import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/typography';
import { leftCol } from '@guardian/pasteup/breakpoints';

const link = css`
    ${textSans(3)};
    background-color: ${palette.highlight.main};
    border-radius: 100px;
    color: ${palette.neutral[7]};
    font-weight: medium;
    line-height: 30px;
    padding: 0 10px;
    position: absolute;
    right: 0;
    text-decoration: none;
    top: 6px;
    vertical-align: middle;

    svg {
        vertical-align: middle;
    }

    ${leftCol} {
        top: initial;
        bottom: 12px;
        left: 0;
        right: initial;
    }
`;

export const SupportButton: React.FC = () => (
    <a className={link} href="//support.theguardian.com/">
        Support The Guardian ⇾
    </a>
);
