import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Dynamicsection } from './components/dynamicsection/dynamicsection';
import { AuthGuard } from './guards/auth.guard';
import { Adminhome } from './components/admin/adminhome/adminhome';
import { Login } from './components/login/login';
import { Jsoneditor } from './components/admin/jsoneditor/jsoneditor';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },                    // move before :section
  { path: 'admin/home', component: Adminhome, canActivate: [AuthGuard] },
  { path: 'admin/json-editor', component: Jsoneditor, canActivate: [AuthGuard] },
  { path: ':section', component: Dynamicsection },        // always keep dynamic route last
];
