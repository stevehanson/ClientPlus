var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function ClientStub () {
    return {
        name: '',
        description: ''
    };
}

describe('ClientController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /clients/new
     * Should render clients/new.ejs
     */
    it('should render "new" template on GET /clients/new', function (done) {
        request(app)
        .get('/clients/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/clients\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /clients
     * Should render clients/index.ejs
     */
    it('should render "index" template on GET /clients', function (done) {
        request(app)
        .get('/clients')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/clients\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /clients/:id/edit
     * Should access Client#find and render clients/edit.ejs
     */
    it('should access Client#find and render "edit" template on GET /clients/:id/edit', function (done) {
        var Client = app.models.Client;

        // Mock Client#find
        Client.find = sinon.spy(function (id, callback) {
            callback(null, new Client);
        });

        request(app)
        .get('/clients/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Client.find.calledWith('42').should.be.true;
            app.didRender(/clients\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /clients/:id
     * Should render clients/index.ejs
     */
    it('should access Client#find and render "show" template on GET /clients/:id', function (done) {
        var Client = app.models.Client;

        // Mock Client#find
        Client.find = sinon.spy(function (id, callback) {
            callback(null, new Client);
        });

        request(app)
        .get('/clients/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Client.find.calledWith('42').should.be.true;
            app.didRender(/clients\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /clients
     * Should access Client#create when Client is valid
     */
    it('should access Client#create on POST /clients with a valid Client', function (done) {
        var Client = app.models.Client
        , client = new ClientStub;

        // Mock Client#create
        Client.create = sinon.spy(function (data, callback) {
            callback(null, client);
        });

        request(app)
        .post('/clients')
        .send({ "Client": client })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Client.create.calledWith(client).should.be.true;

            done();
        });
    });

    /*
     * POST /clients
     * Should fail when Client is invalid
     */
    it('should fail on POST /clients when Client#create returns an error', function (done) {
        var Client = app.models.Client
        , client = new ClientStub;

        // Mock Client#create
        Client.create = sinon.spy(function (data, callback) {
            callback(new Error, client);
        });

        request(app)
        .post('/clients')
        .send({ "Client": client })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Client.create.calledWith(client).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /clients/:id
     * Should redirect back to /clients when Client is valid
     */
    it('should redirect on PUT /clients/:id with a valid Client', function (done) {
        var Client = app.models.Client
        , client = new ClientStub;

        Client.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/clients/1')
        .send({ "Client": client })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/clients/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /clients/:id
     * Should not redirect when Client is invalid
     */
    it('should fail / not redirect on PUT /clients/:id with an invalid Client', function (done) {
        var Client = app.models.Client
        , client = new ClientStub;

        Client.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/clients/1')
        .send({ "Client": client })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /clients/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Client on DELETE /clients/:id');

    /*
     * DELETE /clients/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Client on DELETE /clients/:id if it fails');
});
