
var fs = require('fs')
var path = require('path')
var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 3000))

var staticFile = require('connect-static-file')
var bodyParser = require('body-parser')
var COMMENTS_FILE = path.join(__dirname, 'comments.json')
var publicpath = path.join(__dirname, '../dist')

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^ MIDDLEWARE ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.use('/public/main.min.js', staticFile(publicpath + '/public/main.min.js.gz', {encoded: 'gzip'}))
app.use('/public/main.min.js', staticFile(publicpath + '/public/main.min.js'))
app.use('/', express.static(publicpath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^ SOCKETS ^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// http://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
// var server = require('http').Server(app)
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
var server = app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
var io = require('socket.io')(server)

/**
 * [socketOnConnection description]
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
var socketOnConnection = function (socket) {
  console.log('user connected')
  var COMMENTS = []

  /**
   * [FSReadFile description]
   * @param {[type]} err  [description]
   * @param {[type]} data [description]
   */
  var FSReadFile = function (err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    COMMENTS = JSON.parse(data)
    socket.emit('getComments', COMMENTS)
  }

  /**
   * [FSWriteFile description]
   * @param {[type]} err [description]
   */
  var FSWriteFile = function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    socket.emit('getComments', COMMENTS) // Graceful
  }

  /**
   * [socketPutComment description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  var socketPutComment = function (data) {
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    COMMENTS.push({
      id: Date.now(),
      author: data.author,
      text: data.text
    })

    fs.writeFile(COMMENTS_FILE, JSON.stringify(COMMENTS, null, 4), FSWriteFile)
  }

  fs.readFile(COMMENTS_FILE, FSReadFile)
  socket.on('putComment', socketPutComment)
}

io.on('connection', socketOnConnection)
