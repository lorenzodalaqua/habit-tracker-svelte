How I will structure this app:

App will save everything in localStorage while user is not authenticated.

Add the FirebaseUI authentication UI below the (or a maybe a modal that shows when user clicks register)

After user is authenticated, every few seconds we try to save the state to firebase after a change (check for changes in the month store).

So, the habit class should be responsible for the logic of updating and storing the habit data.

The main APP class now handles the creating and deleting of habits, this should be a separate responsibility.
