# Random twitter 'clone'

The last assignment on the Javascript section in The Odin Project is "copying" a known website, something we use often like any of the social medias, youtube, etc. My initial idea was starting with some sort of Twitter-like app and then give it some flavor, but just getting slightly close to how twitter does things was more than enough work I'd say. I still have some ideas I might implement soon, but for now we're moving on to the next project!

### How to run this project -

Clone the repo to a local folder, navigate to it on the console, make sure you install its dependencies by running 'npm install' and once it's done, run:

### npm start

## Some of the things I've had to think about while working on this project and some things to work on moving forward:

- Thinking about features in components beforehand and then actually implementing them, BEFORE moving onto another component.
- Lots backend/database structure planning.
- incorporating a new hook (useRef hook) to detect clicking outside of an element. useRef essentially allows us to select a DOM node of our choosing
  through the proper setup.
- incorporated useCallback hook as well, specifically for autofocusing the modal that pops when we want to post a comment. This allowed me to add interaction with both ENTER and ESC keys to either send the comment or close the modal without sending it. It wouldn't work without the comment input being on focus, which is what led me to the useCallback hook
- When the scope and magnitude of a project or app is hard to predict, always try to think and plan as far ahead as possible before laying down the code. If I had known how convoluted things could get, I would've probably resorted to potentially adding redux to give it easier scalability.
- Forced to come up with a way of getting random documents from Firebase, since it doesn't have any sort of method that would allow me to do that. Ended up giving every user (documents that I want randomly pulled in) an incremental index on creation, while also tracking the number of users on the database to know exactly which # of user to give to the client when they first log in.
- Need to implement cleaner and better folder organization. This will also come with thinking far ahead about the project's scale and its structure.
  -CHECKING THAT FUNCTIONALITY IS CORRECT BEFORE DOUBTING ON THE LIBRARY'S SYSTEMS - Spent a couple hours thinking how to work around an issue that I was sure stemmed from React, while it was just one of my functions not doing things correctly... :)
