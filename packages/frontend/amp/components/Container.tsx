import React from 'react';
import { css } from '@emotion/core';

const container = css`
    margin: auto;
    max-width: 600px;
`;

export const Container: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ children, ...props }) => (
    <div css={container} {...props}>
        {children}
    </div>
);
