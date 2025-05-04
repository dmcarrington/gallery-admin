# gallery-admin

This is a temporary solution for uploading images to Cloudinary, and creating the corresponding LNbits paywall links for lnbits-gallery. Ideally this would become a new page behind auth on lnbits-gallery, but for now this is a standalone app to be run locally.

## Usage

Set up the environment variables in .env, with the keys to your Cloudinary account, Mongodb account, and LNbits. Once complete, run `yarn install` to install the dependencies, then `yarn dev` to start the application. Connect to `http://localhost:3000` to access the app.

Now you can use the `Upload` button to upload images one at a time to the Cloudinary gallery. Note that the free Cloudinary tier limits image sizes to 10MB.
