import Alpine from 'alpinejs';
import { app } from './components/app.js';

import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style.css';

window.Alpine = Alpine;

Alpine.data('app', app);
Alpine.start();