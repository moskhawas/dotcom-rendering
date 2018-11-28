import { parseTemplate } from './parseTemplate';

class MyList extends HTMLElement {
    constructor() {
        super();

        const data = {
            toDoList: [
                {
                    id: 'foo',
                },
                {
                    id: 'bar',
                },
            ],
        };

        const template = this.querySelector('#list-template');
        const templateContent = template.content;

        templateContent.cloneNode(true).childNodes

        if (template) {
            this.attachShadow({
                mode: 'open',
            }).appendChild(
                parseTemplate(templateContent.cloneNode(true).childNodes, data),
            );
        }
    }
}

export const init = () => {
    if (!window.customElements.get('my-list')) {
        window.customElements.define('my-list', MyList);
    }
};
