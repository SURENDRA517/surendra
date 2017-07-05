This step corresponds with this slide of the presentation.

First we need to link this new Ionic project with our reference repo on github. Clone and checkout the initial commit (e37d84e) of this repo so we can start working on the app:

git clone https://github.com/startapplabs/jsconfuy.git
cd jsconfuy
git checkout e37d84e
After this, we need to set up some stuff before starting working on the Ionic project. To do so, run these commands:

npm install
bower install
ionic setup sass
Note: If you are starting a brand new project with Ionic, run these commands instead:

ionic start jsconfuy sidemenu
cd jsconfuy
ionic setup sass
Finally, to see the current state of the project, run:

ionic serve