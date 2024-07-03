# Running the App
## IOS or Android
IOS or android native device must first have expo go installed to host the application.

android installation: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&pli=1

IOS installation: https://apps.apple.com/us/app/expo-go/id982107779

Assuming nodejs is installed on the computer running the app, open a new terminal and run the followig:

` npm install ` to install required dependencies.

` npm run start ` to start the expo go app.

this should print a QR code in the terminal which can be scanned by the native device to start interacting with the app.

## Web 
Alternatively the app can also be tested on web however it is not optimised for this and  has known drawbacks:
- datepicker is not compatible at all and will not work.
- auth persistance is also not available (to keep a user logged in across sessions).

Since auth persistance is not available you will need to change how the app auth is initialised by:
- uncommenting line 20 in src/firebase/main
- and commenting lines 24-26 in src/firebase/main

Then run the same commands as before `npm install` if not done so already and `npm run start` to run the app. 

Then navigate to http://localhost:8081 on your desired web browser to start interacting with the app.

## User roles
The app is conigured to support 2 types of users: ADMINS and PARENTS.

A parent user can be created upon signup with a new email. 

However you cannot create an admin user. To access the app as an admin you will need to login using existing admin credentials:

email: admin@nursery.com

password: 123456

# Implementation Decisions
## Folder Structure
The file structure is intended to logically group files with related functions:
- components: for reused react functional components in the view (currently only used for lists renders).
- context: for context providers 
- features: for react functional components that render the different screens in the app. These are grouped by navigator to maintain a logical hierarchy.
- firebase: contains main.js file with the required firebase configuration to connect to the backend.
- navigators: for all the apps navigators.
- services: contains functions used for CRUD data management operations.

## Acknowledgements 
To allow users to update their email addresses, e-mail enumeration protection is turned off in firebase.
It is acknowledge that this is not safe since this makes the app vulnerable to e-mail enumeration attacks.

Since only fake emails are used in the app which stores fake data, this risk is negligable and should not pose any threat.

