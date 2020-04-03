# DevConnector

> full stack social network application using Node.js, Express, React, Redux and MongoDB along with ES6+. We will start with a bank text editor and end with a deployed full stack application. 

> This app includes…

- an extensive backend API with Node.js & Express
- Protecting routes/endpoints with JWT (JSON Web Tokens)
- Integrating React with our backend in an elegant way, creating a great workflow
- Building our frontend to work with the API
Using Redux for app state management
- Creating reducers and actions for our resources
- Creating many container components that integrate with Redux

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

## App Info

### Author

Jesus Aranda
[Jesus Aranda](https://github.com/arandajm)

### Version

1.0.0

### License

This project is licensed under the MIT License
