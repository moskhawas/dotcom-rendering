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

        if (template) {
            this.attachShadow({
                mode: 'open',
            }).appendChild(
                parseTemplate(template.content.childNodes, data),
            );
        }
    }
}

export const init = () => {
    if (!window.customElements.get('my-list')) {
        window.customElements.define('my-list', MyList);
    }
};
