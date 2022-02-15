import { initDoDom } from './DoDom/DoDom';
import App from './App';
window.addEventListener('DOMContentLoaded', () => {
    initDoDom('root', App());
});
