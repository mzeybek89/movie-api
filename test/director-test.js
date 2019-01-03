const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

let token;
let directorId;
chai.use(chaiHttp);

describe('Director Api Test',()=>{
    before((done)=>{ //testlere başlamadan önce token al
        chai.request(server)
            .post('/auth')
            .send({username:'admin',password:'asdf1234'})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('List Director',(done)=>{
        chai.request(server)
            .get('/api/directors')
            .send({token})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });



    it('Add Director',(done)=>{
        const director =  {
            name:"Tst",
            surname:"surname",
            token
        };

        chai.request(server)
            .post('/api/directors')
            .send(director)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                directorId = res.body._id;
                done();
            });
    });



    it('Update Director',(done)=>{
        const director = {
            bio: "deneme deneme deneme",
            token
        };

        chai.request(server)
            .put('/api/directors/'+directorId)
            .send(director)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status','updated');
                done();
            });
    });


    it('Find Director',(done)=>{
        chai.request(server)
            .get('/api/directors/'+directorId)
            .send({token})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id',directorId);
                done();
            });
    });


    it('Delete Director',(done)=>{
        chai.request(server)
            .delete('/api/directors/'+directorId)
            .send({token})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status','deleted');
                done();
            });
    });


});