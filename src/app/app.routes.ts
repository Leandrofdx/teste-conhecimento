import {Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { WinComponent } from './win/win.component';
import { LoseComponent } from './lose/lose.component';



export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'questions/:id', component: QuestionsComponent},
    {path: 'win', component: WinComponent},
    {path: 'lose', component: LoseComponent}

]