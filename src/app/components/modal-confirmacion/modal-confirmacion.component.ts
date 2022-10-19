import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalConfirmacionComponent>) { }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }

  contratar(){
    // this.userService.deleteUser().subscribe((res:any) =>{
    //   console.log(res);
    // }) 
  }

}
