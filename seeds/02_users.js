
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, password: 'IHaveNoPassword', firstname: 'Elon', middlename: '', lastname: 'Musk', email: 'emusk@spacex.com', employed_since: "2010-11-19", birth_date: "1971-6-29", address: 'SpaceRoad 1M', zip: '4321AB', place: 'Mars', contract_hours: 38, salary: 19.5, phone_number: '646530237', function: 'Kitchen Specialist', role: 'USER',profile_image: '', active: true },
                { id: 2, password: 'SecurePassword', firstname: 'Gerard', middlename: '', lastname: 'Ramsea', email: 'gramsea@gmail.com', employed_since: "2016-01-23", birth_date: "1969-2-2", address: 'KitchenRoad 1A', zip: '5133BB', place: 'Kitchen', contract_hours: 32, salary: 18.5, phone_number: '646123237', function: 'Cook', role: 'MANAGER',profile_image: '', active: true },
                { id: 3, password: 'aPlainTextPassword', firstname: 'Charley', middlename: '', lastname: 'Chopstick', email: 'cc@arealrestaurant.com', employed_since: "2009-01-16", birth_date: "1929-7-1", address: 'RestaurantRoad 2A', zip: '1133AB', place: 'Everywhere', contract_hours: 32, salary: 20.2, phone_number: '643423537', function: 'Owner', role: 'OWNER', profile_image: '', active: true  }

            ]);
        });
};

//t.increments('id');
//t.string('password');
//t.string('firstname');
//t.string('middlename');
//t.string('lastname');
//t.string('email');
//t.date('employed_since');
//t.date('birth_date');
//t.string('address');
//t.string('zip');
//t.string('place');
//t.integer('contract_hours');
//t.decimal('salary')
//t.string('phone_number');
//t.string("function");
//t.string("role");
//t.string("profile_image");
//t.boolean("active"); 