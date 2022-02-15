/**
 * @private
 */
const _toNode = (value) => typeof value === 'string' ? document.createTextNode(value) : value;
const _setAttributes = (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => key in element ? element[key] = value : element.setAttribute(key, value));
};
const _setStyle = (element, styles) => {
    Object.entries(styles).forEach(([key, value]) => key in element.style ? element.style[key] = value : element.style.setProperty(key, value));
};
const _parseStateValue = (state, prev) => typeof state === 'function' ? state(prev) : state;
/**
 * @exports
 */
export const createElement = (tag, attributes, ...children) => {
    const element = document.createElement(tag);
    const { pointer, style, ...props } = attributes ?? {};
    if (pointer)
        pointer.element = element;
    if (style)
        _setStyle(element, style);
    if (props)
        _setAttributes(element, props);
    element.append(...children.filter(Boolean));
    return element;
};
export const createState = (initialValue, creators = {}) => {
    const initState = (creators, state) => Object.entries(creators).forEach(([key, callback]) => {
        elements[key] = _toNode(callback(state, setState));
    });
    const setState = async (value) => {
        const parsed = _parseStateValue(value, state);
        Object.entries(creators).forEach(([key, callback]) => {
            const node = _toNode(callback(parsed, setState));
            elements[key].replaceWith(node);
            elements[key] = node;
        });
        state = parsed;
        return parsed;
    };
    let state = initialValue;
    const elements = {};
    initState(creators, state);
    return [elements, setState, {
            getState: () => state,
            resetState: () => setState(initialValue),
            setCreator(newCreators) {
                Object.entries(newCreators).forEach(([key, value]) => creators[key] = value);
                initState(newCreators, state);
            }
        }];
};
export const initDoDom = (rootId, ...elements) => {
    const root = document.getElementById(rootId);
    root?.replaceWith(...elements);
};
