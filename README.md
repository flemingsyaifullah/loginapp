**Simple login/register/logout using Firebase auth
and simple user CRUD using Firestore database**

**TECH-STACK :**

- frontend : React with Next framework using typescript
- backend : Node with Express framework using typescript
- frontend auth : Firebase auth
- backend auth : jwt received from firebase auth using middleware
- database : firestore (user collection)
- dev tools : turborepo, Firebase emulator (function only), git

**FOLDER STRUCTURE (USING TURBOREPO)**

oginapp (Root Folder)
├── apps/
│   ├── frontend-repo/
│   └── backend-repo/
└── packages/
└── shared/
├── config/
│   └── firebase-account.json
└── src/
└── user.ts

**HOW TO RUN :**

1. open cmd
2. clone source code
3. go to source code root folder (loginapp)
4. run `npm install`

**IF USING TURBOBACK :**

5. run `npm run dev`

6. open browser `http://localhost:3000/` to test

7. finish

**IF USING EMULATOR AT THE BACKEND :**

5. go to `loginapp/apps/backend-repo` run `npx firebase use ebuddy-bd4a1`
   (better use your own firebase project name)

6. run `npm run build && firebase emulators:start --only functions`

7. open another cmd go to `loginapp/apps/frontend-repo` run `npm run dev` to up frontend

8. open browser `http://localhost:3000/` to test

9. finish

**NOTES : 

Firebase project credential file `"firebase-account.json"` you can find at folder 
`loginapp/packages/shared/config` 

- firestoreAccount section : to access Firestore user collection
- firebaseAuthAccount section : to access Firebase auth when login/register/logout at login form
- backendApi section : backend endpoint url for turborepo and emulator

(better use your own firebase project credential)

Default port use for emulator can find at backend-repo/firebase.json 

```json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "functions": {
      "port": 5001
    },
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}

