# chipassist.com

[master.chipassist.com](https://master.chipassist.com) — Dev live server

### Project Setup:

- `npm install`
- Copy `constants/{what_your_want}-defaults.js >> constants/defaults.js`
- Add in your code editor EditorConfig, ESlint, TSLint, Prettier
- Rules for EditorConfig (.editorconfig), ESlint (.eslintrc), TypeScript (tsconfig.json), Prettier (prettier.config.js)
- JavaScript [airbnb](https://github.com/airbnb/javascript) rules
- Husky for precommit hook. Please make commit via terminal

Amplify 
[
    {
        "source": "/<*>",
        "target": "/index.html",
        "status": "404-200",
        "condition": null
    },
    {
        "source": "https://master.d1oefvkndx999q.amplifyapp.com/",
        "target": "https://master.d1oefvkndx999q.amplifyapp.com/",
        "status": "302",
        "condition": null
    },
    {
        "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
        "target": "/",
        "status": "200",
        "condition": null
    }
]


Amplify adds a trailing slash to prevent urls like /about.html but that's probably not the real cause. Your app/browser is making requests to the server with routes that don't exist server-side (you're using SPA routes which are strictly client-side). Try adding the following redirect rule in the amplify js console (under App Settings: Redirects and rewrites > Edit > Open Text Editor):

[
    {
        "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
        "target": "/",
        "status": "200",
        "condition": null
    }
]
