import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearSorteo } from './componentes/crear-sorteo/crear-sorteo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrearSorteo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Angular');
}
