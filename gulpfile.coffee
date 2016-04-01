gulp = require('gulp')
spawn = require('child_process').spawn
node = undefined

gulp.task 'server', ->
  if node
    node.kill()
  node = spawn('node', [ 'server.js' ], stdio: 'inherit')
  node.on 'close', (code) ->
    if code == 8
      gulp.log 'Error detected, waiting for changes...'
    return
  return


gulp.task 'default', ->
  gulp.run 'server'
  gulp.watch [
    './server.js'
    './app/**/*.js'
  ], ->
    gulp.run 'server'
    return

  return

process.on 'exit', ->
  if node
    node.kill()
  return
