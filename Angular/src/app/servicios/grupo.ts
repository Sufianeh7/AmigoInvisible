import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class GrupoService{
  // Url del backend (Node)
  private apiUrl = 'https://amigo-invisible-node-87yz-gnu3rx68d-sufianeh7s-projects.vercel.app/';

  constructor(private http: HttpClient){}

  // Función para enviar los datos del nuevo grupo
  crearSorteo(datosGrupo: any): Observable<any>{
    return this.http.post(this.apiUrl, datosGrupo);
  }

  // Obtiene los datos del grupo por token
  getGrupo (adminToken: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${adminToken}`);
  }

  // Lanza el sorteo y envia los correos
  lanzarSorteo ( adminToken: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/${adminToken}/lanzar`, {})
  }
}
