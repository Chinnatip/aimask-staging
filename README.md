### Run project in localhost

- ADD .env.local file (this file has only 1 environment var.)
  - NEXT_PUBLIC_GOOGLE_MAP_KEY=XXXXXXX_GOOGLE_MAP_API_KEY_XXXXX
- yarn install
- yarn dev
- access to http://localhost:3000

### Deploy project

- yarn build to imspect any error in build
- push code to Git repository
- sign in to vercel and import project
- ADD .env in https://vercel.com/[YOUR-VERCEL-ACCOUNT]/covidmap/settings/environment-variables
  - see image below !
- enjoy !

![](https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/Screen+Shot+2564-01-13+at+08.37.17.png)
![](https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/find_repo.png)
![](https://koh-assets.s3-ap-southeast-1.amazonaws.com/superai/set_env.png)
