# henry-code-challenge
 Henry Meds Reservation App by Taylor Dennison

# How to run the app
### Run Locally
To run the app locally, ensure that you clone the repo on your computer.  Once you cd into the working directory, run the following commands: 
```
yarn
yarn dev
```

### Run Build 
To test whether or not the app builds (spoiler alert, it does!), run the following commands:
```
yarn
yarn build
yarn preview
```

# Navigating the Application
In order to "sign in" as a client, you will need to enter one of the following email addresses: 
```
bsmith@test.com
jsmith@test.com
```
In order to "sign in" as a provider, you will need to enter one of the following id numbers: 
```
1
2
```

To return to the main screen, click on the Henry Meds Logo! This way, you can preserve Redux state and check to see 
if the app is functioning properly.


# Assumptions / Decisions

* I used Yarn as a package manager instead of npm.  I just like yarn better 🤷🏻‍♂️

* I chose Redux Toolkit for this application, mainly because I have tons of experience with it and it just clicks.  I had 3 
  different slices, ```modalSlice, clientsSlice, and providersSlice```.  Instead of placing modals locally, I used a MUI Dialog
  component that is located in the ```rootLayout.ts```.  This way, I can just dispatch a title, message, dismissText for the button, 
  and whether or not the modal is open.  Super clean way to implement a Dialog for the whole app.  The unfortunate part is that this limits
  the ability to add custom behavior onDismiss of the modal, since functions are not serializable.

* I chose date-fns for handling some of the date/time related functions.  I love this library and prefer it over other time libraries.

* I chose MUI for some of their built in components, including Button, TimePicker, DatePicker, Dialog, and TextField

* When it comes to Provider availability, end times that are "earlier" than the start time are treated as if they are 
  trying to have an availability that spans into the next day, which I did not allow.  

* I went to HenryMeds.com and grabbed a couple assets to make the site design more present.  This includes the logo, font,
  some image assets, and the main color hex of the buttons.

* I assumed that providers would have a default availability time range, which was not in the requirements directly, but made
  too much sense to not add. 

* For Error Handling, I have both an ErrorBoundary component and an errorElement property, both of which utilize
  a VERY general fallbackUI, which is located in the ```ErrorPage``` component in the ```/pages``` directory. 

* Instead of doing a full log in experience due to time constraints, I just had a simple input for each user.
  For Providers, I have them enter an Provider ID. For Clients, I have them enter in an email.  These identifiers are
  useful to achieve full "functionality" of other features, such as having a client confirm an appointment that gets linked back
  to the chosen provider, but most certainly falls short in a real production environment for many obvious reasons.

* I did not create any commits during the development process.  I did this to cut down time and stay focused on implimentation. 
I usually make a commit whenever I have added a new feature, fixed a bug, or otherwise added code to a point where it is
sufficient and stable. 

# Known Pitfalls / Things I would improve with more time

* User login / Auth
* Styling - I am a big fan of Vanilla Extract, which is a my go to for TS safe CSS classes.  Under time constraints however,
  most of this application contains inLine styling via CSS in JS.  (Sorry, I know its a pain to read the JSX...)
* Lack of A11y best practices.
* More Abstraction - There are some places where I could have defined more function handlers, components, etc. 
* JSDoc Comments - I usually add these over all components and helper functions, but time did not allow. 
* Weekend Availability - I would have disabled weekend availability with more time, utilizing the ```shouldDisableDate```
  property on a MUI DatePicker component to do so. 




