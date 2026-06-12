import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // 👈 Añadido Router
import { GrupoService } from '../../servicios/grupo';

@Component({
  selector: 'app-sorteo',
  standalone: true,
  imports: [],
  templateUrl: './sorteo.html',
  styleUrl: './sorteo.scss'
})
export class Sorteo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // 👈 Inyectamos el Router
  private grupoService = inject(GrupoService);

  adminToken: string = '';
  grupo = signal<any>(null);
  enviando = signal<boolean>(false);

  ngOnInit(): void {
    // Recogemos el token
    this.adminToken = this.route.snapshot.paramMap.get('adminToken') || '';

    // Si existe, recuperamos los datos del backend
    if (this.adminToken) {
      this.grupoService.getGrupo(this.adminToken).subscribe({
        next: (datosDelBackend) => {
          this.grupo.set(datosDelBackend)
        },
        error: (err) => {
          console.error('Error al traer el sorteo:', err);
          alert('No se ha podido recuperar la información de este sorteo.');
        }
      });
    }
  }

  // Vuelve atrás conservando los datos
  volverAEditar(): void {
    this.router.navigate(['/'], { state: { datos: this.grupo() } });
  }

  // Función para el botón gordo de lanzar el sorteo
  lanzarSorteo(): void {
    if(confirm('¿Estás seguro de que la lista es correcta? Se enviarán los correos ahora mismo.')){
      this.enviando.set(true); // Se bloquea el botón

      this.grupoService.lanzarSorteo(this.adminToken).subscribe({
        next: (res) => {
          alert('¡Éxito! El algoritmo ha emparejado a todos y los correos ya están volando hacia sus bandejas de entrada.');
          this.enviando.set(false); // Desbloqueamos el botón
        },
        error: (err) => {
          console.error('Error al lanzar el sorteo:', err);
          alert('Hubo un error al enviar los correos.');
          this.enviando.set(false); // Desbloqueamos por si quiere reintentar
        }
      })
    }
  }
}
