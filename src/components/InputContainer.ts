import {createElement, DoDomComponent} from '../DoDom/DoDom';

type Props = {
  input: Node;
  icon?: string;
}

const InputContainer: DoDomComponent<Props> = ({input, icon}) => {

  return createElement('div', {className: 'input-wrapper'},
    icon ? createElement('i', {className: `fa fa-${icon}`}) : '',
    input
  )
}

export default InputContainer;