import {createElement, DoDomComponent} from '../DoDom/DoDom';
import OutcomeTableRow from './OutcomeTableRow';
import RemoveApartmentButton from './RemoveApartmentButton';

interface Props {
  data: CostObject;
}

const OutcomeTable: DoDomComponent<Props> = ({data}) => {

  const {name, id, ...rest} = data;

  return createElement('div', {className: 'outcome-container'},
    createElement('table', null,
      OutcomeTableRow({
        value: 'עלות',
        breakdown: 'פירוט'
      }),
      ...Object.values(rest).map(OutcomeTableRow)
    ),
    RemoveApartmentButton({id: data.id})
  )
}

export default OutcomeTable;