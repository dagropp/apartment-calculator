import {createState} from '../DoDom/DoDom';
import OutcomeTable from './OutcomeTable';

const [Outcome, setOutcome, OutcomeMethods] = createState<CostObject | null>(
  null,
  {
    table: (state) => state ? OutcomeTable({data: state}) : ''
  }
);

export {Outcome, setOutcome, OutcomeMethods};