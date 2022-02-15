import {createElement} from '../DoDom/DoDom';
import {Outcome, OutcomeMethods, setOutcome} from './Outcome';
import {addSavedApartment} from '../global/DataService';
import {buildCostObject} from '../global/CostObjectService';
import {numberDisplay, stringToNumber, verifyNumber} from '../global/Utils';
import InputContainer from './InputContainer';

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = numberDisplay(input.value);
}

OutcomeMethods.setCreator({
  nameInput: (state) =>
    InputContainer({
      input: createElement('input', {
        name: 'name',
        placeholder: 'שם הדירה',
        required: true,
        autocomplete: 'off',
        type: state ? 'hidden' : 'text',
        value: state?.name ?? ''
      }),
      icon: state ? '' : 'pen'
    }),
  costInput: (state) =>
    InputContainer({
      input: createElement('input', {
        name: 'cost',
        inputMode: 'numeric',
        required: true,
        autocomplete: 'off',
        placeholder: 'עלות',
        oninput: handleInput,
        value: state?.initial.value.toLocaleString() ?? ''
      }),
      icon: 'shekel-sign'
    }),
  button: (state) =>
    createElement('button', {
      type: 'submit'
    }, state ? 'חישוב חדש' : 'חישוב')
})

const MainForm = () => {

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const {cost, name} = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const object = buildCostObject(verifyNumber(stringToNumber(cost)), name);
    addSavedApartment(object);
    setOutcome(object);
  }

  return createElement('form', {
      onsubmit: handleSubmit
    },
    Outcome.nameInput,
    Outcome.costInput,
    Outcome.button
  )
}

export default MainForm;