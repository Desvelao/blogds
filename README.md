Note: **Work in progress**

# BlogDS

Create a colaborative blog served as static web but works as dynamic without server.

It uses:
- [ReactJS](https://reactjs.org) - User interface
- [Redux](https://react-redux.js.org) - App State
- [Firebase](https://firebase.google.com) - User authentication, database and image storage
- [Reactstrap](https://reactstrap.github.io) - ReactJS Components based on Bootstrap
- [FontAwesome](https://fontawesome.com/)

## Features

- Serve as static webpage (ex: GitHub Pages).
- Supports multiple users.
- Write posts using Markdown and HTML.
- Edit, delete user posts.
- Upload images to use in the posts.
- Update user info.
- Include [Bootstrap](https://getbootstrap.com/) CSS.

## Install and configuration

Clone this repository and install dependencies.

```bash
npm install
```

Rename `example-config` folder to `config` and configure the blog.

Require Firebase configuration `config/firebase.js`. 