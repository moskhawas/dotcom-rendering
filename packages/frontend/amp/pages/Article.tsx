import React from 'react';
import { Footer } from '@frontend/amp/components/Footer';
import { Container } from '@frontend/amp/components/Container';
import { Body } from '@frontend/amp/components/Body';
import { Header } from '@frontend/amp/components/Header';
import { palette } from '@guardian/pasteup/palette';
import { Onward } from '@frontend/amp/components/Onward';
import { AdConsent } from '@frontend/amp/components/AdConsent';
import { css } from 'emotion';
import { Sidebar } from '@frontend/amp/components/Sidebar';
import { Analytics, AnalyticsModel } from '@frontend/amp/components/Analytics';
import { filterForTagsOfType } from '../lib/tag-utils';

const backgroundColour = css`
    background-color: ${palette.neutral[97]};
`;

export interface ArticleModel {
    headline: string;
    standfirst: string;
    mainMediaElements: CAPIElement[];
    elements: CAPIElement[];
    author: AuthorType;
    webPublicationDateDisplay: string;
    pageId: string;
    ageWarning?: string;
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    };
    pillar: Pillar;
    sectionLabel?: string;
    sectionUrl?: string;
    sectionName: string;
    tags: TagType[];
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
    webURL: string;
    shouldHideAds: boolean;
    guardianBaseURL: string;
    hasRelated: boolean;
    hasStoryPackage: boolean;
    isCommentable: boolean;
    editionId: Edition;
    contentType: string;
    commercialProperties: CommercialProperties;
    isImmersive: boolean;
    starRating?: number;
}

export const Article: React.FC<{
    nav: NavType;
    articleData: ArticleModel;
    config: ConfigType;
    analytics: AnalyticsModel;
}> = ({ nav, articleData, config, analytics }) => (
    <>
        <Analytics key="analytics" analytics={analytics} />
        <AdConsent />

        {/* /TODO change to gray bgcolor */}
        <div key="main" className={backgroundColour}>
            <Container>
                <Header
                    nav={nav}
                    activePillar={articleData.pillar}
                    config={config}
                    guardianBaseURL={articleData.guardianBaseURL}
                />
                <Body
                    pillar={articleData.pillar}
                    data={articleData}
                    config={config}
                />
                <Onward
                    shouldHideAds={articleData.shouldHideAds}
                    pageID={articleData.pageId}
                    webURL={articleData.webURL}
                    sectionID={articleData.sectionName}
                    hasRelated={articleData.hasRelated}
                    hasStoryPackage={articleData.hasStoryPackage}
                    seriesTags={filterForTagsOfType(articleData.tags, 'Series')}
                    guardianBaseURL={articleData.guardianBaseURL}
                />
                <Footer nav={nav} />
            </Container>
        </div>

        {/* The sidebar has to live here unfortunately to be valid AMP
            but note the click handler lives in the Header. */}
        <Sidebar key="sidebar" nav={nav} />
    </>
);
