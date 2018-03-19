# @doocoop/svc-auth

> doocoop authentication service


## Getting Started

```shell
npm install
npm run dev
```

## Seed

```
db.tokens.remove({});
db.users.remove({});
db.accounts.remove({});
db.applications.remove({});

db.accounts.insert({
  _id: ObjectId('5aa48c1ecf5f5527847fe07a'),
  status: 'active',
  name: 'doocoop.dev'
});

db.applications.insert({
  _id: ObjectId('5aa48c1ecf5f5527847fe07b'),
  account: ObjectId('5aa48c1ecf5f5527847fe07a'),
  origins: ['in.dev.doocoop.io'],
  name: 'doocoop.dev.auth.in',
  status: 'active'
});

db.tokens.find({}).pretty();
db.users.find({}).pretty();
db.accounts.find({}).pretty();
db.applications.find({}).pretty();

```

## Development

```shell
# lint and fix
npm run lint

# run test suite
npm test

# serve test coverage
npm run coverage

# publish a minor version
node_modules/.bin/npm-bump minor
```


## See Also

- [Monkfish](https://github.com/cork-labs/monkfish).


## [MIT License](LICENSE)

[Copyright (c) 2018 Cork Labs](http://cork-labs.mit-license.org/2018)
