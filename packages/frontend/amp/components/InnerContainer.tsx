import React from 'react';
import { css } from '@emotion/core';

const style = css`
    padding-left: 10px;
    padding-right: 10px;
`;

export const InnerContainer: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ children, ...props }) => (
    <div css={style} {...props}>
        {children}
    </div>
);
