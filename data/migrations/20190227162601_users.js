exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("firstname").notNullable();
    tbl.string("lastname").notNullable();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password", 255).notNullable();
    tbl.string("department").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
