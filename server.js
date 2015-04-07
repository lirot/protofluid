//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*  filename: server.js */
/* description: program proxies traffic to ps PIA (peoplesoft web servers)
 allowing for the local development of CSS and javascript */
{
    var conn = require('./connection.js');
    var c = new conn();
    var RICOCHET_SERVER = c.RICOCHET_SERVER;
    var PING_HOST = c.PING_HOST;
    var RICOCHET_LOGIN = c.RICOCHET_LOGIN;
    var RICOCHET_LOGOUT = c.RICOCHET_LOGOUT;
    var USER_AGENT = c.USER_AGENT;
    var PORT = c.PORT;
    var host =  c.host ;
    //RCHANNER the default user without invoice administrator privelages
    var user = c.user,
        pass = c.pass,
        timezoneOffset = c.timezoneOffset;
    var ping = require('ping'),
        util = require('util'),
        bodyParser = require('body-parser'),
        express = require('express'),
        cors = require('cors'),
        http = require('http'),
        _ = require('underscore'),
        request = require('request'),
        fs = require('fs'),
        inShutdown = false;
}

// First arg identifies User  "A" indicates an approver user type NREAD is used
// Approvers get a different set of tabs and the page is displayed with different
//defaults and  actions. refer to doc/FUNC_SPEC.md for more details.
if (process.argv[2] === 'A') {
    (user = 'NREAD')
}

// DMCGEE user carries credentials for a Finance approver
if (process.argv[2] === 'F') {
    (user = 'DMCGEE')
}

// JSUFFEL is a SAS user and a invoice Administrator 
if (process.argv[2] === 'J') {
    (user = 'JSUFFEL')
}
console.log(process.argv)

function gracefulShutdown() {
    if (inShutdown) {
        return;
    }

    inShutdown = true;

    console.log('Received kill signal, shutting down gracefully.');
    request.get(RICOCHET_SERVER + RICOCHET_LOGOUT, {
        jar: true, // Use saved session cookies
        headers: {
            'User-Agent': USER_AGENT
        }
    }, function(error, response, body) {
        process.exit();
    });
};
// Register shutdown event handlers.
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
/* login Function craeates option object used for proxy */
function login() {
        console.log(user);

        var options = {
            followAllRedirects: true,
            form: {
                timezoneOffset: timezoneOffset,
                userid: user,
                pwd: pass
            },
            jar: true, // Save cookies for logout.
            headers: {
                'User-Agent': USER_AGENT,
                'host': 'nyc0fscqarwb03.na.corp.jwt.com:16102',
                'Referer': 'http://nyc0fscqarwb03.na.corp.jwt.com:16102/psc/fsdev/EMPLOYEE/PSFT_EP/c/XX_AP_CUSTOM_MENU.XX_CONTAINER.?Page=XX_CONTAINER2'
            }
        };

        request.post(RICOCHET_SERVER + RICOCHET_LOGIN, options,
            function(error, response, body) {
                if (error) {
                    console.log('Failed Ricochet Login:', error);
                    process.exit();
                }
            })

    }
    /* ping the development server and make sure its on the network  */
ping.sys.probe(PING_HOST, function(isAlive) {
    var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + PING_HOST + ' is dead';
    util.puts(msg);
    isAlive && login();
});
/* proxy request will call out to the ps web server with credentials in headers
and pass the response back to the browser  */
function proxyRequest(path, req, res) {
        request({
            url: RICOCHET_SERVER + path,
            method: req.method,
            jar: true,
            followAllRedirects: true,
            form: req.body,
            headers: {
                'User-Agent': req.headers['user-agent'],
                'Accept-Language': req.headers['accept-language']
            }
        }, function(error, response, body) {
            if (path.indexOf("MJSON") == -1) {
                // console.log( this.headers)
            }
        }).pipe(res);
    }
    /* express  */
var app = express();
/* body parser */
app.use(bodyParser.urlencoded({
    extended: false
}));
/* web site home folder */
app.use(express.static(__dirname + '/'));
/* shared javascript libraries */
app.use(express.static('../src/'));
/* shared images  */
app.use(express.static('../img/'));
// Launch http server.
var server = http.createServer(app).listen(PORT, function() {
    console.log('Listening on port: ', PORT);
});
//allow cors
app.options('/*', cors());
// all cors (only cross site )traffic will come this call
app.all('/*', cors(), function(req, res, next) {

    if (/\/js\/.+\.js$/.test(req.url)) {
        return res.status(404).end();
    }

    var url = req.url;

    // Workaround for invalid URLs which result in the error:
    // "Site name is not valid. Check your url syntax and try again."
    url = url.replace(/^\/psc\/undefined/g, '/psc/fsdev');
    url = url.replace(/^\/EMPLOYEE/g, '../../../EMPLOYEE');

    console.log(url);

    //forward poeplesoft
    return proxyRequest(url, req, res);
});
