import {createElement, DoDomComponent} from '../DoDom/DoDom';
import {removeApartment} from '../global/DataService';
import {setOutcome} from './Outcome';

type Props = {
  id: string
}

const RemoveApartmentButton: DoDomComponent<Props> = ({id}) => {

  const handleClick = () => {
    removeApartment(id);
    setOutcome(null);
  }

  return createElement('a', {
      className: 'remove-apartment',
      'aria-role': 'button',
      onclick: handleClick
    },
    createElement('i', {
      className: 'fa fa-trash'
    }),
    'הסרת דירה'
  )
}

export default RemoveApartmentButton;