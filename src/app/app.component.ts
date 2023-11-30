import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosPrediccion } from 'src/model/DatosPrediccion';
import { PrediccionService } from 'src/services/prediccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  miFormulario: FormGroup;
  riesgoAltoAcv: boolean = false;
  riesgoBajoAcv: boolean = false;

  constructor(
      private fb: FormBuilder,
      private prediccionService: PrediccionService
    ) {
    this.miFormulario = this.fb.group({
      edad: ['', Validators.required],
      afeccion: ['', Validators.required],
      glucosa: ['', Validators.required],
      hipertension: ['', Validators.required],
      matrimonio: ['', Validators.required],
      fumador: ['', Validators.required],
      ocupacion: ['', Validators.required],
      imc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.warn('Not implemented method');
  }

  submitForm() {
    if (this.miFormulario.valid) {
      console.log('Formulario enviado:', this.miFormulario.value);
      this.prediccionService.predecir(this.getDatos()).subscribe(
        response => {
          console.log('Respuesta de la API:', response);
          this.setAcvValor(response[0]);
          // Realiza acciones adicionales con la respuesta de la API si es necesario
        },
        error => {
          console.error('Error al enviar datos:', error);
          // Maneja el error de la solicitud
        }
      );
    } else {
      // Marcar campos como tocados para mostrar posibles errores al usuario
      this.markFormGroupTouched(this.miFormulario);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getDatos(): DatosPrediccion {
    const datos: DatosPrediccion = {
      age: this.miFormulario.get('edad')?.value,
      heart_disease: this.miFormulario.get('afeccion')?.value,
      avg_glucose_level: this.miFormulario.get('glucosa')?.value,
      hypertension: this.miFormulario.get('hipertension')?.value,
      ever_married: this.miFormulario.get('matrimonio')?.value,
      smoking_formerly_smoked: this.miFormulario.get('matrimonio')?.value,
      work_Self_employed: this.miFormulario.get('ocupacion')?.value,
      bmi: this.miFormulario.get('imc')?.value
    }
    return datos;
  }

  private setAcvValor(valor: number) {
    if (valor === 1) {
      this.riesgoAltoAcv = true;
    } else {
      this.riesgoBajoAcv = true;
    }
  }

  limpiar() {
    this.miFormulario.reset()
    this.riesgoAltoAcv = false;
    this.riesgoBajoAcv = false;
  }

}
