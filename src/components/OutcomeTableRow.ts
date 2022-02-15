import {createElement, DoDomComponent} from '../DoDom/DoDom';

type Props = {
  breakdown?: string;
  title?: string;
  value: string | number;
}

const OutcomeTableRow: DoDomComponent<Props> = ({breakdown = '', title = '', value}) => {

  const parsed = typeof value === 'number' ? '₪' + value.toLocaleString() : value;

  return createElement('tr', null,
    createElement('td', {className: 'title'}, title),
    createElement('td', {className: 'value'}, parsed),
    createElement('td', {className: 'breakdown'}, breakdown)
  );
}

export default OutcomeTableRow;