load('application');

before(loadClient, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New client';
    this.client = new Client;
    render();
});

action(function create() {
    Client.create(req.body.Client, function (err, client) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: client && client.errors || err});
                } else {
                    send({code: 200, data: client.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Client can not be created');
                    render('new', {
                        client: client,
                        title: 'New client'
                    });
                } else {
                    flash('info', 'Client created');
                    redirect(path_to.clients);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Clients index';
    Client.all(function (err, clients) {
        switch (params.format) {
            case "json":
                send(clients);
                break;
            default:
                render({
                    clients: clients
                });
        }
    });
});

action(function show() {
    this.title = 'Client show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.client});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Client edit';
    switch(params.format) {
        case "json":
            send(this.client);
            break;
        default:
            render();
    }
});

action(function update() {
    var client = this.client;
    this.title = 'Edit client details';
    this.client.updateAttributes(body.Client, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: client && client.errors || err});
                } else {
                    send({code: 200, data: client});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Client updated');
                    redirect(path_to.client(client));
                } else {
                    flash('error', 'Client can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.client.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy client');
                } else {
                    flash('info', 'Client successfully removed');
                }
                send("'" + path_to.clients + "'");
            });
        });
    });
});

function loadClient() {
    Client.find(params.id, function (err, client) {
        if (err || !client) {
            if (!err && !client && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.clients);
        } else {
            this.client = client;
            next();
        }
    }.bind(this));
}
