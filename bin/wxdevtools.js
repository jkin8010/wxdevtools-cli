#!/usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const findUp = require('find-up')
const userHome = require('user-home')
const devtools = require('../lib/index')

const defaultRCPath = path.join(__dirname, '../.wxdevtoolsrc.yaml')
const rcFilenames = ['.wxdevtoolsrc', '.wxdevtoolsrc.yml', '.wxdevtoolsrc.yaml']
const userRCPath = findUp.sync(rcFilenames, {
  cwd: process.cwd()
})
const homeRCPath = findUp.sync(rcFilenames, {
  cwd: userHome
})
const defaultConfig = yaml.safeLoad(fs.readFileSync(defaultRCPath))
const homeConfig = homeRCPath ? yaml.safeLoad(fs.readFileSync(homeRCPath)) : null
const userConfig = userRCPath ? yaml.safeLoad(fs.readFileSync(userRCPath)) : null

devtools(Object.assign({}, defaultConfig, homeConfig, userConfig))
