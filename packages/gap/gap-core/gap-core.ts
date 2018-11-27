/**
 * This is the main loader for Gap.
 *
 * It exposes a GAP global. Extensions should register themselves on this using
 * GAP. E.g.
 *
 *     GAP.registerElement('gap-list', GapList)
 *
 * where gap-list is the tag name for the extension, and GapList is the
 * extension class.
 */

interface Extension {
    do: (el: HTMLElement) => void;
}

const extensions: Map<string, Extension> = new Map();

/**
 * Main rendering function
 *
 * Instructs extension elements to execute. Eventually this will do clever
 * things like buffer and batch.
 */
const render = () => undefined;

window.GAP = {
    registerElement: (tag: string, extension: Extension) => {
        extensions.set(tag, extension);
        render();
    },
};
