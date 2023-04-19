import { defineStore } from 'pinia';
import { useFirebaseAuth } from 'vuefire';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import { useToast } from 'vue-toastification';
const auth = useFirebaseAuth();
const toast = useToast();

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log('user: ', user);
          this.router.push('/');
          toast.success(' Account Created successfully', {
            timeout: 2000,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('In Catch', errorCode, errorMessage);

          switch (error.code) {
            case 'auth/email-already-in-use':
              toast.error('There is already an account with this email', {
                timeout: 2000,
              });
              break;
            default:
              toast.error('Sorry, there was an unexpected error', {
                timeout: 2000,
              });
          }
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log('user: ', user);
          this.router.push('/app/home');
          toast.success(' Login  successfull', {
            timeout: 2000,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          switch (error.code) {
            case 'auth/wrong-password':
              toast.error('Incorrect Password', {
                timeout: 2000,
              });
              break;
            case 'auth/user-not-found':
              toast.error('No user found with that email', {
                timeout: 2000,
              });
              break;
            default:
              toast.error('Sorry, there was an unexpected error', {
                timeout: 2000,
              });
          }

          console.log(errorCode, errorMessage);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          this.router.push('/');
          // console.log('User signed out')
        })
        .catch((error) => {
          // console.log(error.message)
        });
    },
  },
});

// Add a new document with a generated id.
// async function addUser(email, name) {
//   try {
//     const user = useCurrentUser();
//     const userId = user.value.uid;
//     const userRef = doc(db, 'users', userId);

//     const newUser = {
//       name: name,
//       email: email,
//       counters: [],
//       estimates: [],
//       customers: [],
//     };

//     const newDoc = await setDoc(userRef, {
//       ...newUser,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
