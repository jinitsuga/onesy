# Random twitter 'clone'

Some of the things I've had to think about while working on this project:

- Thinking about features in components beforehand and then actually implementing them, BEFORE moving onto another component.
- Lots backend/database structure planning.
- incorporating a new hook (useRef hook) to detect clicking outside of an element. useRef essentially allows us to select a DOM node of our choosing
  through the proper setup.
- incorporated useCallback hook as well, specifically for autofocusing the modal that pops when we want to post a comment. This allowed me to add interaction with both ENTER and ESC keys to either send the comment or close the modal without sending it. It wouldn't work without the comment input being on focus, which is what led me to the useCallback hook

- Forced to come up with a way of getting random documents from Firebase, since it doesn't have any sort of method that would allow me to do that. Ended up giving every user (documents that I want randomly pulled in) an incremental index on creation, while also tracking the number of users on the database to know exactly which # of user to give to the client when they first log in.

-CHECKING THAT FUNCTIONALITY IS CORRECT BEFORE DOUBTING ON THE LIBRARY'S SYSTEMS :D
