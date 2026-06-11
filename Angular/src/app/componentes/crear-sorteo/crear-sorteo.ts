import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Participante {
  nombre: string;
  email: string;
  exclusiones: string[];
}

@Component({
  selector: 'app-crear-sorteo',
  imports: [FormsModule],
  templateUrl: './crear-sorteo.html',
  styleUrl: './crear-sorteo.scss',
})
export class CrearSorteo {

  nombreGrupo: string = '';
  presupuesto: string = '';

  // Se inicia la lista con 3 participantes, el mínimo requerido
  participantes: Participante[] = [
    {nombre: '', email: '', exclusiones: []},
    {nombre: '', email: '', exclusiones: []},
    {nombre: '', email: '', exclusiones: []},
  ];

  // Agragar participantes
  agregarParticipante(): void{
    this.participantes.push({nombre: '', email: '', exclusiones: []});
  }

  // Eliminar participantes
  eliminarParticipante(index: number): void{
    // No se puede eliminar si solo quedan 3
    if(this.participantes.length > 3){
      this.participantes.splice(index, 1);
    }else{
      alert('¡Vaya! Se necesitan al menos 3 participantes para hacer el sorteo.')
    }
  }

  // Crear grupo
  crearGrupo():void {
    if(!this.nombreGrupo.trim()){
      alert('Debes introducir un nombre de grupo.')
      return;
    }

    // Estructuramos el objeto para Node
    const datosSorteo = {
      nombreGrupo: this.nombreGrupo,
      presupuesto: this.presupuesto,
      participantes: this.participantes,
    };

    console.log('📦 Datos listos para enviar al Backend:', datosSorteo);
    // Aquí llamaremos a nuestro servicio HTTP en el siguiente paso
  }

}
