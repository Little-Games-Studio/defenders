const config = {
    type: Phaser.HEADLESS,
    parent: 'phaser-example',
    autoFocus: false,
    width: 1600,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const sessions = {};
const players = {};
const colors = [
    0x1F85DE /* blue*/,
    0xF73F56 /* red */,
    0xDFCE46 /* yellow */,
    0x1FDE68 /* green */,
    0xAA5FE2 /* purple */
];

function preload() {
    this.load.image('player', 'assets/player.png');
}

function create() {

    const self = this;
    const y_position = self.cameras.main.worldView.y + self.cameras.main.height - 130;

    this.players_physics_group = this.physics.add.group();

    io.on('connection', function (socket) {

        players[socket.id] = {
            id: socket.id
        };

        console.log('player', socket.id, 'connected to server, current players: ', Object.keys(players).length);

        socket.on('create-session', function (data) {

            if (!sessions[socket.id]) {

                var session = socket.id;

                var session_positions = [];
                var session_colors = [];
                
                if (data.number_of_players == 1) {
                    session_positions = [
                        {
                            x: self.cameras.main.worldView.x + self.cameras.main.width / 2,
                            y: self.cameras.main.worldView.y + self.cameras.main.height / 2
                        }
                    ]

                    session_colors.push(colors[0])
                }
                
                if (data.number_of_players == 2) {
                    session_positions = [
                        {
                            x: self.cameras.main.worldView.x + 50,
                            y: self.cameras.main.worldView.y + self.cameras.main.height / 2
                        },
                        {
                            x: self.cameras.main.worldView.x + self.cameras.main.width - 50,
                            y: self.cameras.main.worldView.y + self.cameras.main.height / 2
                        }
                    ]

                    session_colors.push(colors[0])
                    session_colors.push(colors[1])
                }

                if (data.number_of_players == 3) {
                    session_positions = [
                        {
                            x: self.cameras.main.worldView.x + 100,
                            y: self.cameras.main.worldView.y + self.cameras.main.height -100
                        },
                        {
                            x: self.cameras.main.worldView.x + self.cameras.main.width - 100,
                            y: self.cameras.main.worldView.y + self.cameras.main.height - 100
                        },
                        {
                            x: self.cameras.main.worldView.x + self.cameras.main.width / 2,
                            y: self.cameras.main.worldView.y + 100
                        }
                    ]

                    session_colors.push(colors[0])
                    session_colors.push(colors[1])
                    session_colors.push(colors[2])
                }

                if (data.number_of_players == 4) {
                    session_positions = [
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 - 150, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 + 150, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 - 300, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 + 300, y: y_position }
                    ]

                    session_colors.push(colors[0])
                    session_colors.push(colors[1])
                    session_colors.push(colors[2])
                    session_colors.push(colors[3])
                }
                    
                if (data.number_of_players == 5) {
                    session_positions = [
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 - 400, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 - 200, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 + 200, y: y_position },
                        { x: self.cameras.main.worldView.x + self.cameras.main.width / 2 + 400, y: y_position }
                    ]

                    session_colors.push(colors[0])
                    session_colors.push(colors[1])
                    session_colors.push(colors[2])
                    session_colors.push(colors[3])
                    session_colors.push(colors[4])
                }

                sessions[session] = {
                    max_players: data.number_of_players,
                    players: [],
                    positions: session_positions,
                    colors: session_colors
                };

                addPlayerToSession(self, socket, session);
                addPlayerToPhysicsGroup(self, players[socket.id]);

                console.log('player', socket.id, 'created a session');
                io.in('session-' + session).emit('message', 'session created');
            }
            else {
                console.log("Session already exists!")
            }
            
            console.log('current sessions:', sessions)
        })

        socket.on('join-session', function (session) {

            if (sessions[session] && sessions[session].players.length < sessions[session].max_players) {

                addPlayerToSession(self, socket, session);
                addPlayerToPhysicsGroup(self, players[socket.id]);

                console.log('player', socket.id, 'joined session', session, 'as', players[socket.id].username);
                io.in('session-' + session).emit('message', 'player ' + players[socket.id].username + ' joined session ' + session);
            }
        });

        socket.on('leave-session', function () {
            removePlayerFromSession(self, socket, 'player ' + socket.id + ' left the session');
            removePlayerFromPhysicsGroup(self, socket.id);
        });

        socket.on('disconnect', function () {
            removePlayerFromSession(self, socket, 'player ' + socket.id + ' disconnected')   
            removePlayerFromPhysicsGroup(self, socket.id);
            delete players[socket.id];

            console.log('player', socket.id, 'disconnected from server, current players: ', Object.keys(players).length);
        });

        socket.on('username', function (username) {
            players[socket.id].username = username;
        });


    });
}

function update() { }

function addPlayerToSession(self, socket, session) {

    socket.join('session-' + session);

    players[socket.id].session = session;
    players[socket.id].position = sessions[session].positions.shift();
    players[socket.id].color = sessions[session].colors.shift();

    sessions[session].players.push(players[socket.id]);

    io.in('session-' + session).emit('currentPlayers', sessions[session].players);
}

function addPlayerToPhysicsGroup(self, playerInfo) {
    const player = self.physics.add.image(playerInfo.x, playerInfo.y, 'player').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    player.id = playerInfo.id;
    self.players_physics_group.add(player);
}

function removePlayerFromSession(self, socket, message) {

    var session = players[socket.id].session;

    if (session) {

        socket.leave('session-' + session);

        var index = sessions[session].players.indexOf(socket.id);
        sessions[session].players.splice(index, 1);

        if (sessions[session].players.length == 0) {
            delete sessions[session]
        }
        else {
            sessions[session].positions.push({ x: players[socket.id].position.x, y: players[socket.id].position.y });
            sessions[session].colors.push(players[socket.id].color);

            io.to('session-' + session).emit('message', message);
            io.to('session-' + session).emit('currentPlayers', sessions[session].players);
        }

        console.log('player', socket.id, 'left session', session)
        console.log('current sessions:', sessions)
    }
}

function removePlayerFromPhysicsGroup(self, id) {
    self.players_physics_group.getChildren().forEach((player) => {
        if (id === player.id) {
            player.destroy();
        }
    });
}

const game = new Phaser.Game(config);

window.gameLoaded();