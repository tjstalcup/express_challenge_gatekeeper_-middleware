const express = require('express');
const queryString = require('query-string');

const app = express();

const USERS = [
  {id: 1,
   firstName: 'Joe',
   lastName: 'Schmoe',
   userName: 'joeschmoe@business.com',
   position: 'Sr. Engineer',
   isAdmin: true,
   password: 'password'
  },
  {id: 2,
   firstName: 'Sally',
   lastName: 'Student',
   userName: 'sallystudent@business.com',
   position: 'Jr. Engineer',
   isAdmin: true,
   password: 'password'
  },
  {id: 3,
   firstName: 'Lila',
   lastName: 'LeMonde',
   userName: 'lila@business.com',
   position: 'Growth Hacker',
   isAdmin: false,
   password: 'password'
  },
  {id: 4,
   firstName: 'Freddy',
   lastName: 'Fun',
   userName: 'freddy@business.com',
   position: 'Community Manager',
   isAdmin: false,
   password: 'password'
  }
];

// ?user=ellen&pass=superSecretPassword
// ?user=freddy@business.com&pass=password

function gateKeeper(req, res, next) {
    for (let i = 0; i < USERS.length; i++) {
        if (req.query.user === USERS[i].userName && req.query.pass === USERS[i].password){
            const query = queryString.stringify(USERS[i]);
            res.redirect(`/api/users/me/user=${query}`);
        }
    }
    next();
}

app.use(gateKeeper);

app.get("/api/users/me", (req, res) => {
  if (req.user === undefined) {
    return res.status(403).json({message: 'Must supply valid user credentials'});
  }
  const {firstName, lastName, id, userName, position} = req.user;
  return res.json({firstName, lastName, id, userName, position});
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
});
