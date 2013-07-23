load('application');

action(function index() {

//	render({title: 'Page'});

	Client.all(function (err, clients) {
        render({
		title: 'Client Plus',
            clients: clients,
            err: err
        });
    });

});

