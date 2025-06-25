process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Photos', function () {
    it('should list ALL photos on / GET', function (done) {
        this.timeout(60000);
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                done();
            });
    });
});
