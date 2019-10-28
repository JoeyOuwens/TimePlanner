const validation = require('../classes/validation');
describe('Check zipcode validation', function () {
    it('Test zipcode should pass.', function () {
        expect(validation.zipcode("6523AA")).toBe(true);
        expect(validation.zipcode("6523za")).toBe(true);
        expect(validation.zipcode("6523zZ")).toBe(true);
    });
    it('Test zipcode should fail.', function () {
        expect(validation.zipcode("6523 AA")).toBe(false);
        expect(validation.zipcode("65aaA")).toBe(false);
        expect(validation.zipcode("ABC123")).toBe(false);
    });
});


describe('Check birthdate validation', function () {
    it('Birthdate tests should pass.', function () {
        expect(validation.birthdate("1995-10-12")).toBe(true);
        expect(validation.birthdate("2019-12-31")).toBe(true);
        expect(validation.birthdate("1890-02-02")).toBe(true); 
    });
    it('Birthdate tests should fail.', function () {
        expect(validation.birthdate("1995-13-12")).toBe(false);
        expect(validation.birthdate("2019-12-32")).toBe(false); 
        expect(validation.birthdate("x-12-32")).toBe(false); 
    });
});

describe('Check email validation', function () {
    it('email tests should pass.', function () {
        expect(validation.email("ab.123@avc.com")).toBe(true); 
        expect(validation.email("abcdfeg@avc.xx")).toBe(true); 
    });
    it('email tests should fail.', function () {
        expect(validation.email("as@aa")).toBe(false); 
        expect(validation.email("asa.com")).toBe(false); 
    });
});

describe('Check telephone validation', function () {
    it('telephone tests should pass.', function () {
        expect(validation.telephone("064661234")).toBe(true);
        expect(validation.telephone("+311245555")).toBe(true);
    });
    it('telephone tests should fail.', function () {
        expect(validation.telephone("asbcd")).toBe(false);
        expect(validation.telephone("abcdd")).toBe(false);
    });
});

describe('Check rights validation', function () {
    it('rights tests should pass.', function () {
        expect(validation.rights("USER")).toBe(true);
        expect(validation.rights("MANAGER")).toBe(true);
    });
    it('telephone tests should fail.', function () {
        expect(validation.rights("manager")).toBe(false);
        expect(validation.rights("owner")).toBe(false);
        expect(validation.rights("user")).toBe(false);
        expect(validation.rights("OWNER")).toBe(false);
    });
});


describe('Check workhours validation', function () {
    it('workhours tests should pass.', function () {
        expect(validation.hours("12")).toBe(true);
        expect(validation.hours("1")).toBe(true);
    });
    it('workhours tests should fail.', function () {
        expect(validation.hours("425")).toBe(false);
        expect(validation.hours("avcd")).toBe(false);
    });
});

describe('Check firstName validation', function () {
    it('firstName tests should pass.', function () {
        expect(validation.firstName("Henk")).toBe(true);
        expect(validation.firstName("Ingrid Jan")).toBe(true);
    });
    it('firstName tests should fail.', function () {
        expect(validation.firstName("1234")).toBe(false);
        expect(validation.firstName("")).toBe(false);
    });
});

describe('Check lastName validation', function () {
    it('lastName tests should pass.', function () {
        expect(validation.lastName("vries-puffelen")).toBe(true);
        expect(validation.lastName("vries")).toBe(true);
    });
    it('lastName tests should fail.', function () {
        expect(validation.lastName("1234")).toBe(false);
        expect(validation.lastName("")).toBe(false);
    });
});

describe('Check middleName validation', function () {
    it('middleName tests should pass.', function () {
        expect(validation.middleName("van den")).toBe(true);
        expect(validation.middleName("de")).toBe(true);
        expect(validation.middleName("")).toBe(true);
    });
    it('middleName tests should fail.', function () {
        expect(validation.middleName("1234")).toBe(false);
        expect(validation.middleName("de-ad")).toBe(false);
    });
});


describe('Check address validation', function () {
    it('address tests should pass.', function () {
        expect(validation.address("Straatnaam 1b")).toBe(true);
        expect(validation.address("Straat-naam 2")).toBe(true);
        expect(validation.address("Straat naam 3A")).toBe(true);
        expect(validation.address("Straat naam 44b")).toBe(true);
        expect(validation.address("Straatnaam 144Z")).toBe(true);
    });
    it('address tests should fail.', function () { 
        expect(validation.address("1234")).toBe(false);
        expect(validation.address("1234 B")).toBe(false);
        expect(validation.address("1234 1B")).toBe(false);
        expect(validation.address("")).toBe(false);
        expect(validation.address("de-ad")).toBe(false);
    });
});

describe('Check place validation', function () {
    it('place tests should pass.', function () {
        expect(validation.place("Rotterdam")).toBe(true);
        expect(validation.place("Hendrik-ido-ambacht")).toBe(true);
        expect(validation.place("Cappele aan den ijsel")).toBe(true);
    });
    it('place tests should fail.', function () {
        expect(validation.place("")).toBe(false);
        expect(validation.place("124412")).toBe(false);
    });
});





