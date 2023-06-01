import m from "mithril";
import { Routes, DefaultRoute } from './routes'
/* Wire up mithril app to DOM */
m.route.prefix = '';
m.route(document.body.querySelector('#app'), DefaultRoute, Routes);

