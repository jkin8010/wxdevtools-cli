const wxdevtools = require('../lib/index')
const toolsBin = require.resolve('../bin/wxdevtools.js')

describe('wxdevtools-cli', () => {
  const originExit = process.exit
  const mockExit = jest.fn()

  beforeEach(() => {
    jest.resetModules()

    process.exit = mockExit
  })

  afterEach(() => {
    process.exit = originExit
  })

  it('-v 显示 cli 版本号', () => {
    console.log = jest.fn()

    process.argv = ['node', 'wxdevtools', '-v']

    require(toolsBin)

    expect(mockExit).toBeCalled()
    expect(console.log).toBeCalled()
  })

  it('-q 退出 微信开发者工具', () => {
    console.log = jest.fn()

    process.argv = ['node', 'wxdevtools', '-q']

    require(toolsBin)

    expect(mockExit).toBeCalled()
    expect(console.log).toBeCalled()
  })

  it('wxdevtools 传递参数至 "微信开发者工具"', () => {
    const mockExec = jest.fn(() => {
      return {on: jest.fn()}
    })

    jest.mock('execa', () => mockExec)

    process.argv = ['node', 'wxdevtools', '-O']

    require(toolsBin)

    expect(mockExec).toBeCalled()
  })

  it('未配置环境配置数据弹出提示', () => {
    console.log = jest.fn()

    wxdevtools(null)

    expect(mockExit).toBeCalled()
    expect(console.log).toBeCalled()
  })

  it('未配置环境配置数据弹出提示', () => {
    console.log = jest.fn()

    wxdevtools(null)

    expect(mockExit).toBeCalled()
    expect(console.log).toBeCalled()
  })

  it('应用安装路径不存在弹出提示', () => {
    console.log = jest.fn()
    const mockFs = { existsSync: () => false }

    jest.mock('fs', () => mockFs)

    wxdevtools({})

    expect(mockExit).toBeCalled()
    expect(console.log).toBeCalled()
  })
})
