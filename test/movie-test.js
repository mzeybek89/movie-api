const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

let token;
let movieId;
chai.use(chaiHttp);

describe('Test Movies',()=>{
     before((done)=>{  //testler için token alınır
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

    it('Created Movies',(done)=>{
        const movie ={
            title:"deneme",
            year:2019,
            token
        };

        chai.request(server)
            .post('/api/movies')
            .send(movie)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.should.have.property('status','created');
                res.body.should.have.property('_id');
                movieId= res.body._id;
                done();
            });
    });

    it('Find Movie',(done)=>{

        chai.request(server)
            .get('/api/movies/'+movieId)
            .send({token})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id',movieId);

                done();
            });
    });

    it('Update Movie',(done)=>{
        const movie ={
            title:"denemeUpdated",
            year:2019,
            token
        };

        chai.request(server)
            .put('/api/movies/'+movieId)
            .send(movie)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status','updated');
                done();
            });
    });

    it('Delete Movie',(done)=>{
        chai.request(server)
            .delete('/api/movies/'+movieId)
            .send({token})
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status','deleted');
                done();
            });
    });




});