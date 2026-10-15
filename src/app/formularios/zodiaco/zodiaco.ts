
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrls: ['./zodiaco.css']
})
export class Zodiaco {

  formulario = new FormGroup({
    nombre: new FormControl(''),
    Apaterno: new FormControl(''),
    Amaterno: new FormControl(''),
    dia: new FormControl(''),
    mes: new FormControl(''),
    anio: new FormControl(''),
    sexo: new FormControl('')
  });

  zodiaco: IZodiaco = {
    nombre: '',
    Apaterno: '',
    Amaterno: '',
    dia: '',
    mes: '',
    anio: '',
    edad: '',
    signo: '',
    sexo: '',
    imagensigno: ''
  };

  zodiacos: IZodiaco[] = [];
  mostrar = false;

  constructor(private router: Router) {}

  muestraZodiaco(): void {
    const datos = this.formulario.value;

    const nombre = (datos.nombre || '');
    const Apaterno = (datos.Apaterno || '');
    const Amaterno = (datos.Amaterno || '');
    const diaTexto = datos.dia || '';
    const mesTexto = datos.mes || '';
    const anioTexto = datos.anio || '';
    const sexo = datos.sexo || '';

    const dia = parseInt(diaTexto);
    const mes = parseInt(mesTexto);
    const anio = parseInt(anioTexto);

    if (!nombre || !Apaterno || !Amaterno || !sexo ||
        !diaTexto || !mesTexto || !anioTexto) {
      alert('Completa todos los campos.');
      return;
    }

    const fecha = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    if (
      dia < 1 || dia > 31 ||
      mes < 1 || mes > 12 ||
      anio < 1 ||
      fecha.getDate() !== dia ||
      fecha.getMonth() !== mes - 1 ||
      fecha.getFullYear() !== anio ||
      fecha > hoy
    ) {
      alert('Ingresa una fecha de nacimiento válida.');
      return;
    }

    let edad = hoy.getFullYear() - anio;

    if (
      hoy.getMonth() < mes - 1 ||
      (hoy.getMonth() === mes - 1 && hoy.getDate() < dia)
    ) {
      edad--;
    }

    let signo = '';
    let imagensigno = '';

    

switch (anio % 12) {
  case 0:
    signo = 'Mono';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg';
    break;

  case 1:
    signo = 'Gallo';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg';
    break;

  case 2:
    signo = 'Perro';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg';
    break;

  case 3:
    signo = 'Cerdo';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg';
    break;

  case 4:
    signo = 'Rata';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg';
    break;

  case 5:
    signo = 'Buey';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg';
    break;

  case 6:
    signo = 'Tigre';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg';
    break;

  case 7:
    signo = 'Conejo';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg';
    break;

  case 8:
    signo = 'Dragon';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg';
    break;

  case 9:
    signo = 'Serpiente';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg';
    break;

  case 10:
    signo = 'Caballo';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg';
    break;

  case 11:
    signo = 'Cabra';
    imagensigno = 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg';
    break;
}



    this.zodiaco = {
      nombre,
      Apaterno,
      Amaterno,
      dia: diaTexto,
      mes: mesTexto,
      anio: anioTexto,
      edad: edad.toString(),
      signo,
      sexo,
      imagensigno
    };

    this.cargarZodiaco();
    this.zodiacos.push({ ...this.zodiaco });

    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));

    this.mostrar = true;
    this.formulario.reset();
  }

  cargarZodiaco(): void {
    const datos = localStorage.getItem('zodiacos');
    this.zodiacos = datos ? JSON.parse(datos) : [];
  }

  irARegistros(): void {
    this.router.navigate(['/formularios/registros']);
  }
}
