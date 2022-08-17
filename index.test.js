const server = require('./Controller/index');
 const supertest = require('supertest');
 const request = supertest(server);
jest.useRealTimers();
    jest.setTimeout(100000000)
  

 describe("POST /create-account", () => {

    describe("given that the user data is posted to the /create-account", () => {

        test("should Post data to the create-account route", () => {
const response =  request.post('/create-account').send({
    
          FullName: "Dele Akpan",
          Age: 13,
          Address: "tam 3, ireakari estate",
          Email: "usmanwhwjasjk@gmail.com",
          Password:   "Whites",
          UserName: "usmanRice"
})
.set('Accept','application/json').expect('Content-Type', /json/)
.expect(200)
.end(function(err,res){
    if(err) return done(err);
})
})




    })

    describe("given that the data is saved to database and no error /create-account", () => {

        test("should Save data to database", async () => {
const response = await request.post('/create-account').send({
    
          FullName: "Wales Olewale",
          Age: 13,
          Address: "tam 3, ireakari estate",
          Email: "usmanWhitsteqRich@ppgmqssuuawil.com",
          Password:   "Whitess",
          UserName: "usmanSodisqstq"
})

expect(response.statusCode).toBe(200);
})

describe("given that the data Returned Content Type is JSON", () => {
test("should Specify JSon in the Content Type Header", async () => {
    const response = await request.post('/create-account').send({
        
              FullName: "Dele Akpan",
              Age: 13,
              Address: "tam 3, ireakari estate",
              Email: "whwjasjk@ppgmail.com",
              Password:   "Whitess",
              UserName: "Riceaa"
    })
    
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
})




    })

    describe("given that account already exist /create-account", () => {

        test("Account already exist",async () => {
const response = await request.post('/create-account').send({
    
          FullName: "Dele Akpan",
          Age: 13,
          Address: "tam 3, ireakari estate",
          Email: "whwjasjk@gmail.com",
          Password:   "Whites",
          UserName: "Rice"
})
 
expect(response.statusCode).toBe(400);
 
})




    })

    
 })

 describe("POST /fund-account", () => {

    
     describe("given that the user data is posted to the /fund-account", () => {

        test("should Post data to the fund-account route", () => {
const response =  request.post('/fund-account').send({
    
  CardNumber : 1234567890123456,
  CV: 347,
  Amount: 3000.00,
  UserName: "Rice",
  Password: "Whites",
   AccountNum : 497260608

})
.set('Accept','application/json').expect('Content-Type', /json/)
.expect(200)
.end(function(err,res){
    if(err) return done(err);
    return done();
}); 
jest.setTimeout(30000);
})
})
 describe("given that the account is funded /fund-account", () => {

        test("Account balance is updated", async () => {
const response = await request.post("/fund-account").send({
      
        CardNumber : 1234567890123456,
        CV: 347,
        Amount: 3000.00,
        UserName: "Rsices",
        Password: "Whites",
        AccountNumber : 497260608
      
})
expect(response.statusCode).toBe(200);
 
})
    })
    
    describe("given that the account number is valid /fund-account", () => {

        test("Account number is valid", async () => {
const response = await request.post("/fund-account").send({
      
        CardNumber : 1234567890123456,
        CV: 347,
        Amount: 3000.00,
        UserName: "Rsices",
        Password: "Whites",
        AccountNumber : 497260608
      
})
expect(response.statusCode).toBe(200);
 
})
   })
    
});


describe("POST /Withdraw-account", () => {

    describe("given that the user data is posted to the /transfer-account", () => {

        test("should Post data to the create-account route", () => {
const response =  request.post('/transfer-account').send({
    
  Amount: 200,
  Password: "hosman",
  OwnAccountNumber: "497260608",
  DestinationAccountNumber: "1197083699"

})
.set('Accept','application/json').expect('Content-Type', /json/)
.expect(200)
.end(function(err,res){
    if(err) return done(err);
    
})
})
    });

    describe("given that the data is saved to database and no error /transfer-account", () => {

                test("should Save data to database", async () => {
        const response = await request.post('/transfer-account').send({
            
  Amount: 200,
  Password: "hosman",
  OwnAccountNumber: "497260608",
  DestinationAccountNumber: "1197083699"
        })
        
        expect(response.statusCode).toBe(200);
        })
         })
        
});


describe("POST /withdraw-account", () => {

    describe("given that the user data is posted to the /withdraw-account", () => {

        test("should Post data to the create-account route", () => {
const response =  request.post('/Withdraw-account').send({
    
  
  "Amount": 20,
  "Password": "hshs",
  "AccountNumber": "1197083699"


})
.set('Accept','application/json').expect('Content-Type', /json/)
.expect(200)
.end(function(err,res){
    if(err) return done(err);
    
})
})
    });

    describe("given that the data is saved to database and no error /Withdraw-account", () => {

                test("should Save data to database", async () => {
        const response = await request.post('/Withdraw-account').send({
            
 
  "Amount": 20,
  "Password": "hshs",
  "AccountNumber": "497260608"
})
        
        expect(response.statusCode).toBe(200);
        })
         })
        
});







