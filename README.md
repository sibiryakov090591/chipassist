# chipassist.com

### Git clone

Create and set the SSH key to GitLab before.

Clone repo: `git clone ssh://git@gitlab.icsearch.ru:2233/developers/fe_spaceone.git`


### Project Setup:

- Node.js v14 required for this project!
- `npm install`
- Create `constants/defaults.js` file and copy the settings from `constants/{{any-settings-file}}-defaults.js`
- Add in your code editor EditorConfig, ESlint, TSLint, Prettier
- Rules for EditorConfig (.editorconfig), ESlint (.eslintrc), TypeScript (tsconfig.json), Prettier (prettier.config.js)
- JavaScript [airbnb](https://github.com/airbnb/javascript) rules
- Husky for precommit hook. Please make commit via terminal!

### Build app:

- `npm run build-dev` for master
- `npm run build-prod` for production

### Deploy app:
- You must have an account with permission for this action and Postman.
- Compress THE CONTENT of dist folder to `dist.zip` (It's important! Do not compress the dist folder, just content into the dist folder).
- Add `Authorization: Token <token>` header into postman. 
- Add `file` and `folder` keys into `form-data`. Set a file type for `file` field, this field for the dist.zip file. Field `folder` is a string and vary depending on a project you are going to deploy. Look below to select the correct `folder` value and url.

#### ChipAssist production:
- POST url: `https://api.chipassist.com/api/zip_upload/`

- folder for chipassist: `www`

- folder for requests: `www_requests`

#### ChipAssist master:
- POST url: `https://api.camaster.site/api/zip_upload/`

- folder for chipassist: `www_master`

- folder for requests: `www_requests_master`

#### ChipOnline production:
To get the token you can log in to your CA prod account using `static.164.7.9.5.clients.your-server.de` instead `api.chiponline.tech` 

- POST url: `https://static.164.7.9.5.clients.your-server.de/api/zip_upload/`

- folder: `chiponline`

#### ICSearch production:
- POST url: `https://api.icsearch.ru/api/zip_upload/`

- folder: `www`

#### PCB Online production:
- POST url: `https://api.pcbonline.spb.ru/api/zip_upload/`

- folder: `pcbonline`
