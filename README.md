# Express POC

Basic ExpressJS API service boilerplate

```
git clone https://github.com/neozenith/expressjs-auth-poc
cd expressjs-auth-poc
npm install
npm start
```

In another tab:

```
export MY_TOKEN=`curl -s http://localhost:3000/auth/sso`

# Returns uuidv1 as token at the moment
echo $MY_TOKEN
74958070-232f-11e8-b12d-f1a4665f5b1a

curl -s -H "cs-eapi-token: $MY_TOKEN" http://localhost:3000/api/v1/actions/message

message
```

Presuming you haven't changed IP address or the token hasn't expired
