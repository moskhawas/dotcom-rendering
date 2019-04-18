type Switches = { [key: string]: boolean };

type Weighting =
    | 'inline'
    | 'thumbnail'
    | 'supporting'
    | 'showcase'
    | 'halfwidth'
    | 'immersive';

interface TextBlockElement {
    _type: 'model.dotcomrendering.pageElements.TextBlockElement';
    html: string;
}

interface SubheadingBlockElement {
    _type: 'model.dotcomrendering.pageElements.SubheadingBlockElement';
    html: string;
}

interface RichLinkBlockElement {
    _type: 'model.dotcomrendering.pageElements.RichLinkBlockElement';
    url: string;
    text: string;
    prefix: string;
    sponsorship: string;
}

interface ImageBlockElement {
    _type: 'model.dotcomrendering.pageElements.ImageBlockElement';
    media: { allImages: Image[] };
    data: { alt: string; credit: string; caption?: string; copyright?: string };
    imageSources: ImageSource[];
    displayCredit: boolean;
    role: string;
}
interface YoutubeBlockElement {
    _type: 'model.dotcomrendering.pageElements.YoutubeBlockElement';
    id: string;
    assetId: string;
    channelId: string;
    mediaTitle: string;
}

interface InstagramBlockElement {
    _type: 'model.dotcomrendering.pageElements.InstagramBlockElement';
    html: string;
    url: string;
    hasCaption: boolean;
}

interface TweetBlockElement {
    _type: 'model.dotcomrendering.pageElements.TweetBlockElement';
    html: string;
    url: string;
    id: string;
    hasMedia: boolean;
}

interface Image {
    index: number;
    fields: {
        height: string;
        width: string;
        isMaster?: string;
    };
    mediaType: string;
    mimeType: string;
    url: string;
}

interface ImageSource {
    weighting: Weighting;
    srcSet: SrcSet[];
}

interface SrcSet {
    src: string;
    width: number;
}

interface CommentBlockElement {
    _type: 'model.dotcomrendering.pageElements.CommentBlockElement';
    body: string;
    avatarURL: string;
    profileURL: string;
    profileName: string;
    permalink: string;
    dateTime: string;
}

interface SoundcloudBlockElement {
    _type: 'model.dotcomrendering.pageElements.SoundcloudBlockElement';
    html: string;
    id: string;
    isTrack: boolean;
    isMandatory: boolean;
}

interface EmbedBlockElement {
    _type: 'model.dotcomrendering.pageElements.EmbedBlockElement';
    safe?: boolean;
    alt?: string;
    html: string;
    isMandatory: boolean;
}

interface DisclaimerBlockElement {
    _type: 'model.dotcomrendering.pageElements.DisclaimerBlockElement';
    html: string;
}

interface PullquoteBlockElement {
    _type: 'model.dotcomrendering.pageElements.PullquoteBlockElement';
    html: string;
    role: string;
}

interface QABlockElement {
    _type: 'model.dotcomrendering.pageElements.QABlockElement';
    id: string;
    title: string;
    img?: string;
    html: string;
    credit: string;
}

type CAPIElement =
    | TextBlockElement
    | SubheadingBlockElement
    | ImageBlockElement
    | YoutubeBlockElement
    | InstagramBlockElement
    | TweetBlockElement
    | RichLinkBlockElement
    | CommentBlockElement
    | SoundcloudBlockElement
    | EmbedBlockElement
    | DisclaimerBlockElement
    | PullquoteBlockElement
    | QABlockElement;
