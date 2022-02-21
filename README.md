# interview-gobble-3
demo project for interview.

### design decisions
> This project uses sequelize and sqlite instead of mongoose. This can easily be converted to mongoose without any issues. changes will cover following
 1) models need to be converted to mongoose.
 2) passport-local-sequelize package needs to be replaced by passport-local-mongoose
 3) lib/facebook-handler.js needs to be refactored.
> db schema is generated with `sqlite-example-database/setup.js`


### setup database
run following to setup database

```$ node sqlite-example-database/setup.js```
