
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { IAlumno } from './alumnos';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})

export class ListaAlumnos implements OnInit {

  formulario!: FormGroup;

  alumnos: IAlumno[] = [];
  indiceEdicion: number = -1;

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });

    this.cargarAlumnos();
  }

  muestraAlumnos(): void {
    this.nuevoAlumno = {
      matricula: this.formulario.value.matricula || '',
      nombre: this.formulario.value.nombre || '',
      correo: this.formulario.value.correo || '',
      materia: this.formulario.value.materia || ''
    };

    this.agregarAlumno();
  }

  agregarAlumno(): void {
    if (
      this.nuevoAlumno.matricula.trim() === '' ||
      this.nuevoAlumno.nombre.trim() === '' ||
      this.nuevoAlumno.correo.trim() === '' ||
      this.nuevoAlumno.materia.trim() === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno
      };
    } else {
      this.alumnos.push({
        ...this.nuevoAlumno
      });
    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    this.formulario.reset();
    this.indiceEdicion = -1;

    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    } else {
      this.alumnos = [];
    }
  }

  editarAlumno(index: number): void {
    const alumno = this.alumnos[index];

    this.nuevoAlumno = {
      ...alumno
    };

    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });

    this.indiceEdicion = index;
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);

    if (this.indiceEdicion === index) {
      this.formulario.reset();
      this.indiceEdicion = -1;

      this.nuevoAlumno = {
        matricula: '',
        nombre: '',
        correo: '',
        materia: ''
      };
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }

}
