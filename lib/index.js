/**
 * 微信开发者工具
 * @date 2018-03-02
 * @author jkin8010 <jkin8010@gmail.com>
 */
'use strict'

const os = require('os')
const fs = require('fs')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const which = require('which')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')
const platform = os.platform()
const homedir = os.homedir()
const ideEnvFile = {
  darwin: `${homedir}/Library/Application Support/微信web开发者工具/Default/.ide`,
  linux: '',
  win32: `${homedir}/AppData/Local/微信web开发者工具/User Data/Default/.ide`
}
const ideFilename = ideEnvFile[platform] || ''
const platformName = {
  darwin: 'Mac',
  linux: 'Linux',
  win32: 'Windows'
}
const cliFilename = {
  darwin: [
    '/Contents/MacOS/cli',
    '/Contents/Resources/app.nw/bin/cli'
  ],
  linux: 'wxdevtool',
  win32: '/cli.bat'
}

module.exports = (options) => {
  if (!options) {
    console.log(chalk`未找到{cyanBright.bold 微信开发者工具}安装路径配置, 请在项目根目录下面配置 {magenta .wxdevtoolsrc.yaml}`)
    return process.exit(0)
  }

  updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60
  }).notify()

  const args = process.argv.slice(2)

  switch (args[0]) {
    // output versions info
    case '--version':
    case '-v': {
      console.log(pkg.version)
      return process.exit(0)
    }
  }

  const cliPath = cliFilename[platform] || ''
  let appPath = ''
  Object.keys(options).forEach(osName => {
    const name = platformName[platform] || 'Mac'
    const reg = new RegExp(name, 'i')
    if (reg.test(osName)) {
      appPath = options[osName]
    }
  })

  let cliBin = ''

  if (Array.isArray(cliPath)) {
    for (let p of cliPath) {
      const filename = path.join(appPath, p)
      if (fs.existsSync(filename)) {
        cliBin = filename
        break
      }
    }
  } else if (platform === 'linux') {
    cliBin = which.sync(cliPath, { nothrow: true })
  } else {
    cliBin = path.join(appPath, cliPath)
  }

  if (!fs.existsSync(cliBin)) {
    console.log(chalk`1. 请确定{cyanBright.bold 微信开发者工具}是否安装在 {yellowBright ${appPath}} 路径下面，如路径不对请修改 {magenta .wxdevtoolsrc.yaml}`)
    console.log(chalk`2. 还没有安装{cyanBright.bold 微信开发者工具}，请下载 {blue.underline https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html}`)
    return process.exit(0)
  }

  if (!fs.existsSync(ideFilename)) {
    console.log(chalk`如果你是第一次安装{cyanBright.bold 微信开发者工具}，请先手动启动通过系统的{red 安全认证}`)
    return process.exit(0)
  }

  const env = Object.assign({}, process.env)

  const child = execa(cliBin, args, {
    env: env,
    cwd: process.cwd(),
    stdio: 'inherit'
  }).catch(error => {
    console.log(chalk`请查看是否开启工具服务端口，{cyanBright [微信开发者工具] -- [设置] -- [安全] -- [开启服务端口]}`)
    console.error(error)
  })

  child.on('exit', (code) => {
    process.exit(code)
  })

  return child
}
