# instagram-unliker
JavaScript scripts for removing Instagram likes.

Instagram Unliker

JavaScript browser scripts designed to help remove previously added Instagram likes directly from the Instagram website.

The project provides two different methods for removing likes:

- One-by-One Unliker — opens each liked post individually, removes the like, closes it, and moves to the next post.
- Batch Unliker — selects up to 50 visible liked posts at once and removes their likes as a batch.

«⚠️ This project is not affiliated with, endorsed by, or sponsored by Instagram or Meta.»

---

📌 What is this project for?

Instagram allows users to review posts they have previously liked from the Your Activity → Interactions → Likes section.

Removing a large number of likes manually can be slow because you normally have to interact with posts individually or select them manually.

These scripts automate those repetitive actions inside the browser.

They work by interacting with the Instagram webpage itself, using JavaScript to find buttons and media elements and simulate user clicks.

---

🧩 Scripts

1. One-by-One Unliker

File: "auto-unlike-one-by-one.js"

This version removes likes one post at a time.

How it works

For every post, the script:

1. Finds a liked post in the Likes grid.
2. Clicks the post.
3. Waits for the post to open.
4. Checks whether an "Unlike" button is available.
5. Clicks "Unlike".
6. Closes the post or goes back to the previous page.
7. Moves to the next post.
8. Repeats the process.

Diagnostic features

This version includes additional checks to make debugging easier:

- Searches for posts using more than one method.
- Checks whether the post actually opened.
- Prints information about detected elements in the Console.
- Counts consecutive failures.
- Stops after 3 consecutive failed attempts.
- Supports manual stopping through:

window.__stopAutoUnlike = true

Advantages

- More controlled.
- Processes posts individually.
- Easier to see what is happening.
- Provides more diagnostic information.

Disadvantages

- Slower because every post is opened and closed separately.
- More dependent on Instagram's current page structure.

---

2. Batch Unliker

File: "batch-unlike.js"

This version removes likes in batches of up to 50 posts.

How it works

Each round performs these steps:

1. Finds the "Select" button.
2. Activates selection mode.
3. Finds visible image/video elements.
4. Selects up to 50 items.
5. Finds the "Unlike (N)" button.
6. Clicks it.
7. If Instagram displays a confirmation dialog, confirms the action.
8. Scrolls down to load more items.
9. Repeats the process.

The batch size is controlled by:

const BATCH_SIZE = 50;

You can change this value if needed.

Advantages

- Much faster than opening posts individually.
- Designed for large numbers of liked posts.
- Uses Instagram's batch-selection interface.

Disadvantages

- Depends more heavily on the current Instagram interface.
- The displayed total is an approximate count based on the number of selected items.
- Instagram may change the structure of the page and require selector updates.

---

⚙️ How the scripts work

These scripts do not use the Instagram API.

Instead, they run directly inside the browser's JavaScript environment and interact with the elements currently displayed on the Instagram page.

For example, the scripts search for elements such as:

button
div[role="button"]
img
video
a

They also search for Instagram interface labels such as:

Select
Unlike
Unlike (N)
Close

When the correct element is found, the script simulates a click:

element.click();

The scripts also use delays between actions to give the Instagram interface time to update.

---

💻 Using the scripts on a computer

A desktop browser with Developer Tools is the simplest and most reliable environment for running the scripts.

Steps

1. Open Instagram in a desktop browser.

2. Log into your Instagram account.

3. Go to your liked posts through:
   
   Your Activity → Interactions → Likes

4. Open Developer Tools.

Common shortcuts

- Chrome / Edge: "F12" or "Ctrl + Shift + J"
- Firefox: "Ctrl + Shift + K"

5. Open the Console tab.
6. Paste one of the JavaScript scripts.
7. Press Enter.
8. Keep the Instagram page open while the script is running.
9. Monitor the Console for progress messages.

---

📱 Using the scripts on Android

Running JavaScript through a mobile browser is different from running it on a desktop because most standard mobile browsers do not provide a normal Developer Tools Console.

To run these scripts on Android, you need a mobile browser or tool that provides access to a Developer Tools / JavaScript Console.

Recommended setup

1. Install a mobile browser that supports Developer Tools or a JavaScript Console.

2. Open the browser and go to Instagram.

3. Log into your account.

4. Open:
   
   Your Activity → Interactions → Likes

5. Open the browser's Developer Tools / DevTools.

6. Open the Console.

7. Paste one of the scripts from this repository.

8. Run the script.

9. Keep the Instagram page open while the script is running.

«⚠️ Standard mobile browsers such as the normal Android version of Chrome generally do not provide the same DevTools Console available on desktop.»

Because of this, a computer is generally easier and more reliable.

---

⏱️ Can it run for a long time on Android?

The scripts can continue running for a long period as long as the browser page remains active and Android does not suspend the browser.

Depending on the browser and Android device, the script may continue running for one hour or several hours.

However, running continuously for an entire day is not guaranteed.

Android or the browser may:

- Suspend the browser when it goes into the background.
- Kill the browser to save memory.
- Apply battery-saving restrictions.
- Reload the page.
- Interrupt JavaScript execution.
- Stop the process if the device becomes too hot.

Tips for longer runs

For longer operations:

- Keep the browser in the foreground when possible.
- Connect the phone to a charger.
- Disable battery optimization for the browser if your Android version provides that option.
- Keep the screen awake if the browser stops when the screen is locked.
- Avoid opening other memory-heavy applications.
- Check the Console occasionally to make sure the script is still running.

«⚠️ Do not assume that the script will continue running while the browser is completely closed or permanently suspended by Android.»

---

⏹️ Stopping the scripts

Both scripts support a manual stop command.

While the script is running, execute:

window.__stopAutoUnlike = true

The script will check this variable during its execution and stop at the next appropriate point.

---

🔧 Customization

The scripts contain several configuration values.

For example:

const BATCH_SIZE = 50;

controls the maximum number of posts selected during each batch.

The one-by-one version also contains timing settings:

const DELAY = {
  afterOpen: 1500,
  afterUnlike: 800,
  afterClose: 1200,
  scroll: 1200
};

These values control how long the script waits between actions.

Instagram pages can load at different speeds, so increasing these delays may help if the page is slow.

---

⚠️ Important limitations

Instagram's website is dynamic and can change its HTML structure, button labels, accessibility attributes, or page behavior.

Because these scripts interact directly with the webpage, a change to Instagram's interface can cause them to stop working.

For example, selectors based on:

Unlike
Select
Close

or elements such as:

button
div[role="button"]
a
img
video

may need to be updated if Instagram changes its interface.

The scripts should therefore be considered interface-dependent browser automation, not a permanent solution.

---

🛡️ Safety

These scripts are intended to automate actions that a user can perform manually through Instagram's interface.

Before running automation:

- Make sure you are logged into the correct account.
- Review the code before executing it.
- Do not run scripts you do not understand or trust.
- Keep an eye on the browser while the script is running.
- Stop the script if Instagram behaves unexpectedly.

---

📂 Project Structure

instagram-unliker/
│
├── README.md
├── auto-unlike-one-by-one.js
└── batch-unlike.js

---

📜 Disclaimer

This project is provided for educational and personal-use purposes.

It is not affiliated with Instagram or Meta.

Instagram may limit, change, or restrict automated interactions on its platform. The user is responsible for how these scripts are used and for complying with Instagram's applicable rules and terms.

---

⭐ Features at a glance

Feature| One-by-One| Batch
Opens individual posts| ✅| ❌
Removes likes| ✅| ✅
Processes multiple posts automatically| ✅| ✅
Selects up to 50 posts| ❌| ✅
Diagnostic Console output| ✅| Basic
Speed| Slower| Faster
More controlled| ✅| ❌
Depends on Instagram UI| Yes| Yes

---

🚀 Future improvements

Possible future improvements include:

- Better detection of Instagram interface changes.
- More reliable post detection.
- Improved progress tracking.
- Better error recovery.
- Configurable batch sizes.
- A simple browser interface instead of manually using the Console.
