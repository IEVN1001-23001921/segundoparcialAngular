
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

interface IZodiaco {
  nombre: string;
  Apaterno: string;
  Amaterno: string;
  dia: string;
  mes: string;
  anio: string;
  edad: string;
  signo: string;
  sexo: string;
  imagensigno: string;
}

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registros.html'
})
export class Registros implements OnInit {

  zodiacos: IZodiaco[] = [];
  editando = false;
  indiceEditar = -1;

  formulario = new FormGroup({
    nombre: new FormControl(''),
    Apaterno: new FormControl(''),
    Amaterno: new FormControl(''),
    edad: new FormControl(''),
    sexo: new FormControl(''),
    signo: new FormControl(''),
    nombreCompleto : new FormControl('')
  });

  ngOnInit(): void {
    this.cargarZodiaco();
  }

  cargarZodiaco(): void {
    const datos = localStorage.getItem('zodiacos');
    this.zodiacos = datos ? JSON.parse(datos) : [];
  }

  editar(i: number) {
  let persona = this.zodiacos[i];

  this.formulario.patchValue({
    nombreCompleto: persona.nombre + ' ' + persona.Apaterno + ' ' + persona.Amaterno,
    edad: persona.edad,
    sexo: persona.sexo,
    signo: persona.signo
  });

  this.editando = true;
}

  guardarCambios(): void {
    const datos = this.formulario.value;

    const nombre = (datos.nombre || '').trim();
    const Apaterno = (datos.Apaterno || '').trim();
    const Amaterno = (datos.Amaterno || '').trim();
    const edad = Number(datos.edad);
    const sexo = datos.sexo || '';
    const signo = datos.signo || '';

    

    const persona = this.zodiacos[this.indiceEditar];


    this.zodiacos[this.indiceEditar] = {
      ...persona,
      nombre,
      Apaterno,
      Amaterno,
      edad: edad.toString(),
      sexo,
      signo,
      imagensigno: this.obtenerImagenSigno(signo)
    };

    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));

    this.cancelarEdicion();
  }

  obtenerImagenSigno(signo: string): string {
    switch (signo) {
      case 'Mono':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg';
      case 'Gallo':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/07_horoscopo_chino_Gallo.jpg';
      case 'Perro':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/08_horoscopo_chino_Perro.jpg';
      case 'Cerdo':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/09_horoscopo_chino_Cerdo.jpg';
      case 'Rata':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/01_horoscopo_chino_Rata.jpg';
      case 'Buey':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/02_horoscopo_chino_Buey.jpg';
      case 'Tigre':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/03_horoscopo_chino_Tigre.jpg';
      case 'Conejo':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/04_horoscopo_chino_Conejo.jpg';
      case 'Dragon':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/05_horoscopo_chino_Dragon.jpg';
      case 'Serpiente':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/10_horoscopo_chino_Serpiente.jpg';
      case 'Caballo':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/11_horoscopo_chino_Caballo.jpg';
      case 'Cabra':
        return 'https://confuciomag.com/wp-content/uploads/2016/01/12_horoscopo_chino_Cabra.jpg';
      default:
        return '';
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.indiceEditar = -1;
    this.formulario.reset();
  }

  eliminar(indice: number): void {
    if (this.editando && this.indiceEditar === indice) {
      this.cancelarEdicion();
    } else if (this.editando && this.indiceEditar > indice) {
      this.indiceEditar--;
    }

    this.zodiacos.splice(indice, 1);
    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));
  }
}
