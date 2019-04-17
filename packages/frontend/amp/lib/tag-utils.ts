export const filterForTagsOfType = (
    tags: TagType[],
    tagType: string,
): TagType[] => {
    return tags.filter(
        tag =>
            tag.type === tagType ||
            (tag.type === 'PaidContent' && tag.paidContentType === tagType),
    );
};

export type Tone = 'isOpinion' | 'isPaidContent' | 'isDefault';
// TODO make typesafe - See Pillar.ts??
const toneMap: any = {
    'tone/advertisement-features': 'isPaidContent',
    'tone/comment': 'isOpinion',
};

export const getToneType = (tags: TagType[]): Tone => {
    const key: TagType = filterForTagsOfType(tags, 'Tone')[0];
    return toneMap[key.id] || 'isDefault';
};
