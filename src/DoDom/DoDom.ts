/**
 * @private
 */

const _toNode = (value: StateCreatorValue): HTMLElement | Text =>
  typeof value === 'string' ? document.createTextNode(value) : value;

const _setAttributes = (element: any, attributes: Partial<HTMLElement>) => {
  Object.entries(attributes).forEach(([key, value]) =>
    key in element ? element[key] = value : element.setAttribute(key, value));
}

const _setStyle = (element: any, styles: ElementStyle) => {
  Object.entries(styles).forEach(([key, value]) =>
    key in element.style ? element.style[key] = value : element.style.setProperty(key, value as string));
}

const _parseStateValue = <T>(state: T | StateModifierCallback<T>, prev: T): T =>
  typeof state === 'function' ? (state as StateModifierCallback<T>)(prev) : state;

/**
 * @exports
 */

export const createElement = (
  tag: string,
  attributes: ElementAttributes | null,
  ...children: Array<Node | string>
): HTMLElement => {
  const element = document.createElement(tag);
  const {pointer, style, ...props} = attributes ?? {};
  if (pointer) pointer.element = element;
  if (style) _setStyle(element, style);
  if (props) _setAttributes(element, props);
  element.append(...children.filter(Boolean));
  return element;
}

export const createState = <T>(
  initialValue: T,
  creators: Record<string, StateCreatorCallback<T>> = {}
): CreateStateReturn<T> => {

  const initState = (creators: Record<string, StateCreatorCallback<T>>, state: T) =>
    Object.entries(creators).forEach(([key, callback]) => {
      elements[key] = _toNode(callback(state, setState));
    });

  const setState: StateModifier<T> = async (value) => {
    const parsed = _parseStateValue(value, state);
    Object.entries(creators).forEach(([key, callback]) => {
      const node = _toNode(callback(parsed, setState));
      elements[key].replaceWith(node);
      elements[key] = node;
    })

    state = parsed;
    return parsed;
  }


  let state = initialValue;
  const elements: Record<string, HTMLElement | Text> = {};
  initState(creators, state);

  return [elements, setState, {
    getState: () => state,
    resetState: () => setState(initialValue),
    setCreator(newCreators) {
      Object.entries(newCreators).forEach(([key, value]) =>
        creators[key] = value);
      initState(newCreators, state);
    }
  }];
}

export const initDoDom = (
  rootId: string,
  ...elements: Array<string | HTMLElement>
): void => {
  const root = document.getElementById(rootId);
  root?.replaceWith(...elements);
}

export type DoDomComponent<T> = (props: T) => HTMLElement;