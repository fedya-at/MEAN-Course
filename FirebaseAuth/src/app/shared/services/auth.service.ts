import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toast!: toastPayload;

  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private cs: CommonService // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.handleAuthentication(result.user);
      })
      .catch((error) => {
        this.showToast('error', error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, displayName);
      })
      .catch((error) => {
        this.showToast('error', error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.showToast(
          'success',
          'Password reset email sent, check your inbox.'
        );
      })
      .catch((error) => {
        this.showToast('error', error.message);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.handleAuthentication(result.user);
      })
      .catch((error) => {
        this.showToast('error', error.message);
      });
  }

  private handleAuthentication(user: any) {
    this.SetUserData(user, null);
    this.afAuth.authState.subscribe((authUser) => {
      if (authUser) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  SetUserData(user: any, displayName: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName, // Add display name here
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Update user profile
  updateUserProfile(updatedUser: User): Promise<void> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        // Update the user profile in Firebase Auth
        return user
          .updateProfile({
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          })
          .then(() => {
            // Update the user document in Firestore
            const userRef: AngularFirestoreDocument<any> = this.afs.doc(
              `users/${user.uid}`
            );

            const userData: User = {
              uid: user.uid,
              email: user.email,
              displayName: updatedUser.displayName,
              photoURL: updatedUser.photoURL,
              emailVerified: user.emailVerified,
            };

            return userRef.set(userData, { merge: true });
          });
      }
      return Promise.reject('User not authenticated');
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
  showToast(type: string, message: string) {
    this.toast = {
      message: message,
      title: '',
      type: type,
      ic: {
        timeOut: 5000,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
}
