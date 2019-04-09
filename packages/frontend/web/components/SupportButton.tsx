import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { sans } from '@guardian/pasteup/typography';
import { desktop, tablet, leftCol } from '@guardian/pasteup/breakpoints';
import ArrowRightIcon from '@guardian/pasteup/icons/arrow-right.svg';

const link = css`
    background-color: ${palette.highlight.main};
    border-radius: 100px;
    top: 12px;
    color: ${palette.neutral[7]};
    font-family: ${sans.body};
    font-weight: bold;
    right: 0;
    line-height: 42px;
    padding: 0 20px;
    position: absolute;
    text-decoration: none;
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
        Support <ArrowRightIcon />
    </a>
);
