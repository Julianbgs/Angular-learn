import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {provideFirebaseApp} from '@angular/fire/app';
import {initializeApp} from 'firebase/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
