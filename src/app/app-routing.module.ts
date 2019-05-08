import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [ AuthGuard ],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
