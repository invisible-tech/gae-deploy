#!/usr/bin/env node
'use strict'

const { spawn } = require('child_process')
const shell = require('shelljs')

const exec = (cmd, args) => {
  console.log(`> ${cmd} ${args.join(' ')}`)
  return spawn(cmd, args, { stdio: 'inherit' })
}

// change directory out of node_modules (in order to find .env)
shell.cd('../..')

const isOnCloud = Boolean(process.env.GAE_SERVICE)
if (isOnCloud) {
  exec('node_modules/.bin/sync')
} else { // Dev ENV
  exec('node_modules/.bin/deploy', ['setup'])
  exec('node_modules/.bin/deploy', ['download'])
}
