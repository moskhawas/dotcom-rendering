export const parseTemplate: (
    childNodes: HTMLElement[],
    data: any,
) => DocumentFragment = (childNodes, data = {}) => {
    return [...childNodes].reduce((acc, childNode) => {
        const myNode = childNode.cloneNode(true);
        const gapRole = childNode.getAttribute('gap-role');
        const src = childNode.getAttribute('gap-src');

        if (gapRole && src) {
            switch (gapRole) {
                case 'list':
                    const template = myNode.querySelector(
                        '#list-item-template',
                    );

                    if (template) {
                        data[src].forEach(dataItem => {
                            myNode.appendChild(
                                parseTemplate(
                                    template.content.childNodes,
                                    dataItem,
                                ),
                            );
                        });
                    }

                    break;
                case 'listItem':
                    myNode.innerHTML = data[src];

                    break;
            }
        }

        acc.appendChild(myNode);

        return acc;
    }, document.createDocumentFragment());
};
