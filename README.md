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
curl -s http://localhost:3000/auth/sso

# Returns uuidv1 as token
74958070-232f-11e8-b12d-f1a4665f5b1a

curl -s -H "cs-eapi-token: 74958070-232f-11e8-b12d-f1a4665f5b1a" http://localhost:3000/api/v1/action/message

message
```

Presuming you haven't changed IP address or the token hasn't expired
