import { Routes } from '@angular/router';
import { Grupo } from './componentes/grupo/grupo';
import { Sorteo } from './componentes/sorteo/sorteo';

export const routes: Routes = [
  // Ruta por defecto
  { path: '', component: Grupo},

  // Pantalla sorteo
  { path: 'sorteo/:adminToken', component: Sorteo },

  // Si alguien escribe una URL que no existe, se le redirige a inicio
  { path: '**', redirectTo: ''}
];
