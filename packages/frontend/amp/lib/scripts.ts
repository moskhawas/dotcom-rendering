const notEmpty = (value: string | null): value is string => value !== null;

export const extractScripts: (
    elements: CAPIElement[],
    mainMediaElements: CAPIElement[],
) => string[] = (elements, mainMediaElements) => {
    return [...new Set([...elements, ...mainMediaElements].map(e => e._type))]
        .map(t => {
            switch (t) {
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return `<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                    return `<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                    return `<script async custom-element="amp-soundcloud" src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                    return `<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>`;
                default:
                    return null;
            }
        })
        .filter(notEmpty) as string[];
    // I have no idea why the type predicate isn't working here. I think it has something to do with the union type.
    // It works with simpler arrays of type Array<string | null> but not this one.
};
