import { NgModule}           from '@angular/core';
import { MatTabsModule}      from '@angular/material/tabs';
import { MatCardModule}      from '@angular/material/card';
import {MatToolbarModule}    from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule}      from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';



@NgModule({
    imports: [
        MatTabsModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDialogModule,
        MatBadgeModule,
        MatTableModule,
        MatProgressBarModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
        
    ],
    exports: [
        MatTabsModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDialogModule,
        MatBadgeModule,
        MatTableModule,
        MatProgressBarModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})

export class MaterialModules {}