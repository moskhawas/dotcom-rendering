// @flow
/*
 * A dropdown component
 */

import { styled, Component } from '@guardian/guui';
import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { withProps } from 'recompose';

export type Link = {
    url: string,
    title: string,
    isActive?: boolean,
};

type Props = {
    id: string,
    label: string,
    links: Array<Link>,
};

const EditionButton = styled('button')`
    display: block;
    cursor: pointer;
    background: none;
    border: none;
    line-height: 1.2rem;
    font-size: 14px;
    font-family: ${textSans};
    color: ${palette.neutral[1]};
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: 1px 0 0;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:focus {
        text-decoration: underline;
    }

    &:after {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        margin-left: 6px;
        vertical-align: middle;
        transition: transform 250ms ease-out;
        transform: ${({ expanded }) =>
            expanded ? 'translateY(1px) rotate(-135deg)' : 'translateY(-2px) rotate(45deg)'
        };
    }
`;

const EditionLabel = EditionButton.withComponent('label');
const EditionCheckbox = withProps({
    type: 'checkbox',
})(styled('input')`
    ${screenReaderOnly};
    &:checked + ul {
        display: 'block';
    }
`);

const EditionList = styled('ul')`
    z-index: 1072;
    list-style: none;
    background-color: white;
    padding: 6px 0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    position: absolute;
    right: 0;
    width: 200px;
    display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

const isActive = `
    font-weight: bold;

    &:after {
        content: '';
        border: 2px solid #c70000;
        border-top: 0;
        border-right: 0;
        position: absolute;
        top: 14px;
        left: 10px;
        width: 10px;
        height: 4px;
        transform: rotate(-45deg);
    }
`;
const EditionLink = styled('a')`
    display: block;
    padding: 10px 18px 15px 30px;
    font-size: 15px;
    font-family: ${textSans};
    color: ${palette.neutral[1]};
    line-height: 1.2rem;
    position: relative;
    transition: color 80ms ease-out;
    margin: -1px 0 0 0;
    text-decoration: none;

    :hover {
        background-color: #ededed;
        text-decoration: underline;
    }

    :focus {
        text-decoration: underline;
    }

    :before {
        content: '';
        border-top: 1px solid #ededed;
        display: block;
        position: absolute;
        top: 0;
        left: 30px;
        right: 0;
    }

    ${({ active }) => (active ? isActive : '')};
`;

const EditionItem = styled('li')`
    &:first-child ${EditionLink}:before {
        content: none;
    }
`;

/* no top border for first item */

export default class Dropdown extends Component<
    Props,
    { isExpanded: boolean, noJS: boolean },
> {
    constructor(props: Props) {
        super(props);
        this.state = { isExpanded: false, noJS: true };
        this.toggle_ = this.toggle.bind(this);
    }

    componentDidMount() {
        const dismiss = (event: KeyboardEvent) => {
            const escKey = 'Escape';
            if (event.code === escKey) {
                this.setState(() => ({
                    isExpanded: false,
                }));
            }
        };

        document.addEventListener('keydown', dismiss, false);

        // If componentDidMount runs we know client-side JS is enabled
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            noJS: false,
        });
    }

    toggle_: () => void;

    toggle() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render() {
        const { label, links } = this.props;

        // needs to be unique to allow multiple dropdowns on same page
        // this should be unique because JS is single-threaded
        const dropdownID = `dropbox-id-${this.props.id}`;
        const checkboxID = `checkbox-id-${this.props.id}`;

        return (
            <div>
                {this.state.noJS ? (
                    [
                        <EditionLabel
                            htmlFor={checkboxID}
                            aria-controls={dropdownID}
                            aria-expanded={
                                this.state.isExpanded ? 'true' : 'false'
                            }
                            expanded={this.state.isExpanded}
                        >
                            <EditionCheckbox
                                id={checkboxID}
                                aria-controls={dropdownID}
                                aria-checked="false"
                                tabIndex="-1"
                                key="OpenMainMenuCheckbox"
                                role="menuitemcheckbox"
                            />
                            {label}
                        </EditionLabel>,
                    ]
                ) : (
                    <EditionButton
                        onClick={this.toggle_}
                        aria-controls={dropdownID}
                        aria-expanded={this.state.isExpanded ? 'true' : 'false'}
                        expanded={this.state.isExpanded}
                    >
                        {label}
                    </EditionButton>
                )}

                <EditionList id={dropdownID} expanded={this.state.isExpanded}>
                    {links.map(link => (
                        <EditionItem key={link.title}>
                            <EditionLink href={link.url} active={link.isActive}>
                                {link.title}
                            </EditionLink>
                        </EditionItem>
                    ))}
                </EditionList>
            </div>
        );
    }
}
