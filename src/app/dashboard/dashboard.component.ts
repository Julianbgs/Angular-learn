import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '@angular/fire/auth';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Auth, authState, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ]
})
export class DashboardComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);

  userDataForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  saveSuccess = false;
  errorMessage = '';

  constructor() {
    this.userDataForm = this.fb.group({
      displayName: ['', Validators.required],
      age: ['', [Validators.min(18), Validators.max(100)]],
      bio: ['', Validators.maxLength(500)],
      website: ['', Validators.pattern('https?://.+')]
    });
  }

  ngOnInit(): void {
    authState(this.auth).subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserData(user.uid);
      }
    });
  }

  async loadUserData(userId: string) {
    this.isLoading = true;
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userDataForm.patchValue({
          displayName: data['displayName'] || '',
          age: data['age'] || '',
          bio: data['bio'] || '',
          website: data['website'] || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.errorMessage = 'Failed to load user data';
    } finally {
      this.isLoading = false;
    }
  }

  async saveUserData() {
    if (!this.currentUser || this.userDataForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.saveSuccess = false;
    this.errorMessage = '';

    try {
      const userId = this.currentUser.uid;
      const userData = {
        ...this.userDataForm.value,
        lastUpdated: new Date(),
        email: this.currentUser.email
      };

      await setDoc(doc(this.firestore, 'users', userId), userData, { merge: true });

      if (this.userDataForm.value.displayName !== this.currentUser.displayName) {
        await updateProfile(this.currentUser, {
          displayName: this.userDataForm.value.displayName
        });
      }

      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    } catch (error) {
      console.error('Error saving user data:', error);
      this.errorMessage = 'Failed to save user data';
    } finally {
      this.isLoading = false;
    }
  }
}
