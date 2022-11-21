import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetailEmployeeComponent } from '../modal-detail-employee/modal-detail-employee.component';
import { ModalCreateAppointmentComponent } from '../modal-create-appointment/modal-create-appointment.component';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { FormControl, FormGroup } from '@angular/forms';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  progress_bar: boolean = false;
  listTechnicians: any[];
  specialties: any[];
  specialtyFormGroup: any;
  
  constructor(private technicianService: TechnicianService,
              private specialtyService: SpecialtyService,
              public dialog: MatDialog) { }

  genders: Gender[] = [
    {value: 'femenino', viewValue: 'Femenino'},
    {value: 'masculino', viewValue: 'Masculino'},
  ];

  ngOnInit() {
    this.progress_bar = true;
    this.technicianService.getAllTechnicians().subscribe((res:any)=>{
      this.progress_bar = false;
      this.listTechnicians = res;
      console.log('employees', res)
    })
    this.specialtyService.getSpecialties().subscribe(spe => {
      this.specialties = spe;
    })
    this.specialtyFormGroup = new FormGroup({
      specialty: new FormControl()
   });
  }

  filtrarPorEspecialidad(specialtyId){
    this.progress_bar = true;
    this.technicianService.getTechniciansBySpecialtyId(specialtyId.value).subscribe((res:any)=>{
      this.progress_bar = false;
      this.listTechnicians = res;
      console.log('employees', res)
    })
  }

  abrirModalDetail(employee){
    const dialogRef = this.dialog.open(ModalDetailEmployeeComponent, {
      width: '900px',
      height: '600px',
      data: employee
    })
  }

  abrirModalCreateAppo(employee){
    const dialogRef = this.dialog.open(ModalCreateAppointmentComponent, {
      width: '900px',
      height: '500px',
      data: employee
    })

  }

}
