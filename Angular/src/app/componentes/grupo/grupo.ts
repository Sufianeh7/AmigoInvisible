import { GrupoService } from '../../servicios/grupo';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Participante {
  nombre: string;
  email: string;
  exclusiones: string[];
}

@Component({
  selector: 'app-crear-sorteo',
  imports: [FormsModule],
  templateUrl: './grupo.html'
})
export class Grupo {

  private grupoService = inject(GrupoService);
  private router = inject(Router);

  nombreGrupo: string = '';
  presupuesto: string = '';

  // Se inicia la lista con 3 participantes, el mínimo requerido
  participantes: Participante[] = [
    { nombre: '', email: '', exclusiones: [] },
    { nombre: '', email: '', exclusiones: [] },
    { nombre: '', email: '', exclusiones: [] },
  ];

  constructor(){
    const navegacion = this.router.currentNavigation();
    const estado = navegacion?.extras.state as { datos: any }

    if(estado && estado.datos){
      this.nombreGrupo = estado.datos.nombreGrupo;
      this.presupuesto = estado.datos.presupuesto;
      this.participantes = estado.datos.participantes;
    }
  }

  // Agragar participantes
  agregarParticipante(): void {
    this.participantes.push({ nombre: '', email: '', exclusiones: [] });
  }

  // Eliminar participantes
  eliminarParticipante(index: number): void {
    // No se puede eliminar si solo quedan 3
    if (this.participantes.length > 3) {
      this.participantes.splice(index, 1);
    } else {
      alert('¡Vaya! Se necesitan al menos 3 participantes para hacer el sorteo.');
    }
  }

  // Añadir o quitar exclusiones
  exclusiones(indexParticipante: number, nombreAExcluir: string): void {
    const listaExclusiones = this.participantes[indexParticipante].exclusiones;
    const idx = listaExclusiones.indexOf(nombreAExcluir);

    if (idx > -1) {
      // Si ya estaba excluido, lo quitamos
      listaExclusiones.splice(idx, 1);
    } else {
      // Si no estaba, lo añadimos
      listaExclusiones.push(nombreAExcluir);
    }
  }

  // Crear grupo
  crearGrupo(): void {
    if (!this.nombreGrupo.trim()) {
      alert('Debes introducir un nombre de grupo.');
      return;
    }

    // Estructuramos el objeto para Node
    const datosGrupo = {
      nombreGrupo: this.nombreGrupo,
      presupuesto: this.presupuesto,
      participantes: this.participantes,
    };

    this.grupoService.crearSorteo(datosGrupo).subscribe({
      next: (res) => {
        const token = res.adminToken
        this.router.navigate(['/sorteo', token])
      },
      error: (error) => {
        console.error('Error con el servidor: ', error);
      },
    });
  }
}
