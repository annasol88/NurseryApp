# Running the App

# Implementation Decisions

- inline styles for reusability and managable for the size of project

- folder structure

- not compatible for web becoz...
    - async storage
    - datepicker

- image upload is not efficient.
solution is hacky to be compatible on expo go ideally react native CLI will be used and configured with firebase as described:
https://rnfirebase.io/

- Email enumeration protection is turned off to enable email updates
it is acknowledge that this is not safe and an ideal solution would use a reset email to acomplish this
since fake emails are used in this fake app this would not be possible

- posts stored as flatlist and not linked to user accounts
this breaks when user updates their email
