import Alpine from 'alpinejs';
import * as bootstrap from 'bootstrap';

import { app } from './components/app.js';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style.css';

window.bootstrap = bootstrap;
window.Alpine = Alpine;

Alpine.data('app', app);
Alpine.start();