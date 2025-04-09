import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {provideFirebaseApp} from '@angular/fire/app';
import {initializeApp} from 'firebase/app';
import {environment} from './environment';
import {getAuth, provideAuth} from '@angular/fire/auth';

bootstrapApplication(AppComponent, {providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ]})
  .catch((err) => console.error(err));
