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

![image](https://github.com/user-attachments/assets/85813cda-921b-4b5e-8f94-a72a89f0ac83)

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

5. go to `loginapp/apps/backend-repo` run `npx firebase use loginapp-1bf76`

6. run `npm run build && firebase emulators:start --only functions`

7. open another cmd go to `loginapp/apps/frontend-repo` run `npm run dev` to up UI

8. open browser `http://localhost:3000/` to test

9. finish

**NOTES : 

- Firebase project private key `loginapp-private-key.json` sent separately at the email. Put inside loginapp/apps/backend-repo/
  
- Firebase config for login authentication can find at loginapp/apps/frontend-repo/config/firebaseConfig.ts
  
- Backend api url config can find at loginapp/apps/frontend-repo/config/apiUrlConfig.ts

- Default port use for emulator can find at loginapp/apps/backend-repo/firebase.json 

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

