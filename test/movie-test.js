const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

let token;

chai.use(chaiHttp);

describe('Test Movies',()=>{
     before((done)=>{
         chai.request(server)
             .post('/auth')
             .send({username:'admin',password:'asdf1234'})
             .end((err,res)=>{
                 token=res.body.token;
                 done();
             });
     });


    it('GET all movies',(done)=>{
        chai.request(server)
            .get('/api/movies')
            .send({token})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });


});