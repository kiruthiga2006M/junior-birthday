CUTE BIRTHDAY WISH WEBSITE — QUICK START
========================================

FILES
- index.html  : page layout and styling
- script.js   : name, birthday date, message, countdown, music and effects
- photos/     : add your own pictures here (create this folder)

1) PERSONALIZE THE WEBSITE
Open script.js in a text editor (Notepad or VS Code). At the top, edit CONFIG:

birthdayName: "Bestie"
birthday: "2026-12-01"   <-- change to the next birthday date, YYYY-MM-DD
birthdayMessage: "Your message here"
giftMessage: "Your surprise message here"
photos: ["photos/us.jpg", "photos/funny.jpg", "photos/trip.jpg"]

The countdown uses the birthday month/day and automatically moves to the next year
after that date has passed. Keep the date in YYYY-MM-DD format.

2) ADD PHOTOS
Create a folder called photos beside index.html and copy 3 photos into it.
For example:
  photos/us.jpg
  photos/funny.jpg
  photos/trip.jpg
Then use these exact paths in CONFIG.photos. Use filenames without spaces if possible.
If you do not add photos, the cute emoji placeholders remain visible.

3) PREVIEW ON YOUR COMPUTER
Double-click index.html to open it in Chrome, Edge or Firefox.
Music starts only after the visitor taps “Play music” (browser audio rules).
The melody is generated in the browser; there is no external music file.
An internet connection is only needed for the optional Google Fonts.

4) PUBLISH ONLINE FOR FREE — GITHUB PAGES
A. Sign in or create a free account at https://github.com/
B. Create a new public repository, e.g. birthday-for-bestie.
C. Upload index.html, script.js, README.txt and the photos folder (if used).
D. Open repository Settings → Pages.
E. Under Build and deployment, choose “Deploy from a branch”.
F. Select branch “main” and folder “/(root)”, then Save.
G. Wait a minute or two. GitHub will show your public website URL in Settings → Pages.
H. Open the URL on your phone to test it, then share that link with your friend.

ALTERNATIVE: NETLIFY DROP
Visit https://app.netlify.com/drop and drag the whole project folder into the page
(if the service offers this workflow in your account). Follow its prompts to publish.

CUSTOMIZATION TIPS
- Change the name and messages in CONFIG.
- Replace photos with pictures you have permission to share.
- To change the date, edit CONFIG.birthday.
- Background music begins only when the visitor presses the music button.
- This project is plain HTML/CSS/JavaScript: no npm install or build step required.

PRIVACY
If publishing publicly, use photos and personal details your friend is happy to share.
