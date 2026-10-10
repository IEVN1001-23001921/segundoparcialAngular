
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface IZodiaco {
  nombre: string;
  Apaterno: string;
  Amaterno: string;
  dia: string;
  mes: string;
  año: string;
  edad: string;
  signo: string;
  sexo: string;
  imagensigno: string;
}

@Component({
  selector: 'app-zodiaco',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})

export class Zodiaco implements OnInit {

  formulario!: FormGroup;

  zodiaco: IZodiaco = {
    nombre: '',
    Apaterno: '',
    Amaterno: '',
    dia: '',
    mes: '',
    año: '',
    edad: '',
    signo: '',
    sexo: '',
    imagensigno: ''
  };

  mostrar = false;

  ngOnInit(): void {

    this.formulario = new FormGroup({

      nombre: new FormControl(''),
      Apaterno: new FormControl(''),
      Amaterno: new FormControl(''),

      dia: new FormControl(''),
      mes: new FormControl(''),
      año: new FormControl(''),

      sexo: new FormControl('')

    });

  }

  muestraZodiaco(): void {

    this.zodiaco.nombre = this.formulario.value.nombre;
    this.zodiaco.Apaterno = this.formulario.value.Apaterno;
    this.zodiaco.Amaterno = this.formulario.value.Amaterno;

    this.zodiaco.dia = this.formulario.value.dia;
    this.zodiaco.mes = this.formulario.value.mes;
    this.zodiaco.año = this.formulario.value.año;

    this.zodiaco.sexo = this.formulario.value.sexo;

    let año = parseInt(this.zodiaco.año);
    let mes = parseInt(this.zodiaco.mes);
    let dia = parseInt(this.zodiaco.dia);

    let fecha = new Date();
    let edad = fecha.getFullYear() - año;

  if (mes > fecha.getMonth() + 1 || (mes == fecha.getMonth() + 1 && dia > fecha.getDate())) {
  edad = edad - 1;
}

this.zodiaco.edad = edad.toString();

    switch (año % 12) {

      case 0:
        this.zodiaco.signo = 'Mono';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg';
        break;

      case 1:
        this.zodiaco.signo = 'Gallo';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg';
        break;

      case 2:
        this.zodiaco.signo = 'Perro';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg';
        break;

      case 3:
        this.zodiaco.signo = 'Cerdo';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg';
        break;

      case 4:
        this.zodiaco.signo = 'Rata';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg';
        break;

      case 5:
        this.zodiaco.signo = 'Buey';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg';
        break;

      case 6:
        this.zodiaco.signo = 'Tigre';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg';
        break;

      case 7:
        this.zodiaco.signo = 'Conejo';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg';
        break;

      case 8:
        this.zodiaco.signo = 'Dragón';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg';
        break;

      case 9:
        this.zodiaco.signo = 'Serpiente';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg';
        break;

      case 10:
        this.zodiaco.signo = 'Caballo';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg';
        break;

      case 11:
        this.zodiaco.signo = 'Cabra';
        this.zodiaco.imagensigno =
          'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg';
        break;
    }

    this.mostrar = true;
  }
}

