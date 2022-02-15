import {createElement} from '../DoDom/DoDom';
import {getSavedApartments} from '../global/DataService';
import {Outcome, OutcomeMethods, setOutcome} from './Outcome';
import InputContainer from './InputContainer';

OutcomeMethods.setCreator({
  select: (state) => {
    const data = getSavedApartments();
    data.sort((a, b) => a.name.localeCompare(b.name));
    const selectedIndex = state ? data.findIndex(({name}) => name === state.name) : '';
    if (data.length) {
      const options = data.map(({name, id}, index) =>
        createElement('option', {
          value: id,
          selected: index === selectedIndex
        }, name)
      )

      return createElement('optgroup', {
        label: 'דירות שמורות'
      }, ...options);
    }
    return '';
  }
})

const ApartmentSelect = () => {


  const handleChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const data = getSavedApartments();
    const index = data.findIndex((item) => item.id === select.value)
    if (index !== -1) {
      const object = data[index];
      setOutcome(object);
    } else {
      setOutcome(null);
    }
  }

  const select = createElement('select', {
      onchange: handleChange
    },
    createElement('option', {
      value: ''
    }, 'דירה חדשה'),
    Outcome.select
  );

  return InputContainer({
    input: select,
    icon: 'house-chimney'
  })
}

export default ApartmentSelect;