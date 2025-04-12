**Simple login/register/logout using Firebase auth
and simple user CRUD using Firestore database**

**PROCESS**

- User login or register at login form using email and password. This process handle by
Firebase authentication
- System will also save simple user information
[name : taken from email name
email
id : taken from Firebase authentication user UID]
by call backend api. 

- Every calling backend endpoint that register at userRoutes (create user and fetch user) will through middleware.

- Middleware receive token from firebase authentication then check validity of the token using firebase admin.

- After login or register success then directed to user info page
- There is button to fetch user information
- There is button to logout
- Finish


**TECH-STACK :**

- frontend : React with Next framework using typescript
- backend : Node with Express framework using typescript
- frontend auth : Firebase auth
- backend auth : jwt received from firebase auth using middleware
- database : firestore (user collection)
- dev tools : turborepo, Firebase emulator (function only), git

**FOLDER STRUCTURE (USING TURBOREPO)**

![image](https://github.com/user-attachments/assets/85813cda-921b-4b5e-8f94-a72a89f0ac83)

**HOW TO RUN :**

1. open cmd

2. clone source code

3. Firebase project private key `loginapp-private-key.json` sent separately at the email. Put inside loginapp/apps/backend-repo/

4. go to source code root folder (loginapp)

5. run `npm install`

**IF USING TURBOBACK :**

6. run `npm run dev`

7. open browser `http://localhost:3000/` to test

8. finish

**IF USING EMULATOR AT THE BACKEND :**

6. go to `loginapp/apps/backend-repo` run `npm run build && firebase emulators:start --only functions`

7. open another cmd go to `loginapp/apps/frontend-repo` run `npm run dev` to up UI

8. open browser `http://localhost:3000/` to test

9. finish

**NOTES : 
  
- Firebase config for login authentication at loginapp/apps/frontend-repo/config/firebaseConfig.ts
  
- Backend api url config at loginapp/apps/frontend-repo/config/apiUrlConfig.ts

- Default port use for emulator at loginapp/apps/backend-repo/firebase.json 

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

