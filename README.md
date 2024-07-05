# Running the App
## IOS or Android
First make sure your IOS or android native device has expo go installed to host the application:
- [Android installation](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&pli=1)
- [IOS installation](https://apps.apple.com/us/app/expo-go/id982107779)

Then assuming nodejs is installed on the computer running the app, open a new terminal and run the followig:

` npm install ` to install required dependencies.

` npm run start ` to start the expo go app.

This should print a QR code in the terminal which can be scanned by the native device to start using the app.

## Web 
Alternatively the app can also be used on web by navigating to http://localhost:8081 on your desired web browser once the app is running.

It should be acknowledged that the datepicker is not compatible with web and will not work.

## User roles
The app is conigured to support 2 types of users: ADMINS and PARENTS.

To access the app as an admin you will need to login using existing admin credentials:

> email: admin@nursery.com
>
> password: 123456

A parent user can either be created on sign up with a new email or accessed using the below credentials:

> email: parent@nursery.com
>
> password: 123456

Note: This account shows an example profile with child activities that are not just absences.

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

An attempt was made to implement auth persistance for android and ios clients to stay logged in. However it was found that this was problematic when updating emails so will be omitted for this submission.

