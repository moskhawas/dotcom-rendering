export const parseTemplate: (
    childNodes: HTMLElement[],
    data: any,
) => DocumentFragment = (childNodes, data = {}) => {
    return [...childNodes].reduce((acc, childNode) => {
        const gapRole = childNode.getAttribute('gap-role');
        const src = childNode.getAttribute('gap-src');

        if (gapRole && src) {
            switch (gapRole) {
                case 'list':
                    const template = childNode.querySelector(
                        '#list-item-template',
                    );
                    const templateContent = template.content;

                    if (template) {
                        data[src].forEach(dataItem => {
                            childNode.appendChild(
                                parseTemplate(
                                    templateContent.cloneNode(true).childNodes,
                                    dataItem,
                                ),
                            );
                        });
                    }

                    break;
                case 'listItem':
                    childNode.innerHTML = data[src];

                    break;
            }
        }

        acc.appendChild(childNode);

        return acc;
    }, document.createDocumentFragment());
};
