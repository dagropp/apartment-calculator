type StateCreatorValue = string | HTMLElement;

type StateCreatorCallback<T> = (state: T, setState: StateModifier<T>) => StateCreatorValue;

type StateModifierCallback<T> = (prev: T) => T;

type StateModifier<T> = (value: StateModifierCallback<T> | T) => Promise<T>

type ElementStyle = Partial<CSSStyleDeclaration> | Record<string, string>;

type CreateStateReturn<T> = [
  Record<string, HTMLElement | Text>,
  StateModifier<T>,
  StateMethods<T>
]

interface ElementPointer {
  element: HTMLElement | null;
}

interface ElementAttributes extends Partial<Omit<HTMLElement, 'style'>> {
  pointer?: ElementPointer;
  style?: ElementStyle;

  [key: string]: any;
}

interface StateMethods<T> {
  getState(): T;
  resetState(): void;
  setCreator(creators: Record<string, StateCreatorCallback<T>>): void;
}