import { createElement } from './DoDom/DoDom';
import { Outcome } from './components/Outcome';
import MainForm from './components/MainForm';
import ApartmentSelect from './components/ApartmentSelect';
const App = () => {
    return createElement('div', { className: 'main-app' }, createElement('h1', null, 'המֵחַשְׁבוֹן', createElement('i', { className: 'fa fa-calculator' })), ApartmentSelect(), MainForm(), Outcome.table);
};
export default App;
