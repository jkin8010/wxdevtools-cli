# wxdevtools-cli

> 开发者工具提供了命令行与 HTTP 服务两种接口供外部调用，开发者可以通过命令行或 HTTP 请求指示工具进行登录、预览、上传等操作。

安装命令

```sh
npm i -D wxdevtools-cli
# 或 全局安装
npm i -g wxdevtools-cli
```

微信开发者工具默认安装路径为：

```sh
Mac: /Applications/wechatwebdevtools.app
Windows: C:\Program Files (x86)\Tencent\微信web开发者工具
```

如果你程序安装在非默认路径，建议你在项目根路径下，添加配置文件 `.wxdevtoolsrc`、`.wxdevtoolsrc.yml` 或 `.wxdevtoolsrc.yaml`, 配置如下:

```yaml
Windows: D:\Program Files (x86)\Tencent\微信web开发者工具
```

## 命令行

通过命令行调用安装完成的工具可执行文件，完成登录、预览、上传、自动化测试等操作。调用返回码为 0 时代表正常，为 -1 时错误。

### 1. 命令行启动工具

`-o, --open [projectpath]`: 打开工具，如果不带 projectpath，只是打开工具。如果带 project path，则打开路径中的项目，每次执行都会自动编译刷新，并且自动打开模拟器和调试器。projectpath 不能是相对路径。项目路径中必须含正确格式的 project.config.json 且其中有 appid 和 projectname 字段。

示例：

```sh
# 打开工具
wxdevtools -o
# 打开路径 /Users/username/demo 下的项目
wxdevtools -o base64@/Users/username/demo
```

### 2. 命令行登录

命令行提供两种登录方式：一是将登录二维码转成 base64 给用户，让用户自己集成到自己系统中使用；二是将二维码打印在命令行中。

`-l, --login`: 启动登录逻辑。

`--login-qr-output [format[@path]]`: 指定二维码输出形式，format 可选值包括 terminal（命令行输出）, base64, image。如果有填 path，表示结果输出到指定路径的文件中。如果没填 path，表示将结果输出到命令行。不使用此选项或使用了但没有填 format 的话则默认为命令行打印。

示例：

```sh
# 登录，在终端中打印登录二维码
wxdevtools -l
# 登录，在终端中打印登录 base64 形式的二维码
wxdevtools -l --login-qr-output base64
# 登录，二维码转成 base64 并存到文件 /Users/username/code.txt 
wxdevtools -l --login-qr-output base64@/Users/username/code.txt
```

### 3. 命令行提交预览

预览时必须处于登录状态，如果没有登录，会提示需先登录。预览的二维码可命令行打印也可以转成 base64。ES6 等项目配置从 project.config.json 读。

`-p, --preview <project_root>`: 预览代码，project_root 指定项目根路径。

`--preview-qr-output [format[@path]]`: 指定二维码输出形式，语义同登录用的选项 `--login-qr-output`。

示例：

```sh
# 预览，在终端中打印登录二维码
wxdevtools -p /Users/username/demo
# 预览，二维码转成 base64 并存到文件 /Users/username/code.txt
wxdevtools -p /Users/username/demo --preview-qr-output base64@/Users/username/code.txt
```

### 4. 命令行上传代码

上传代码时必须处于登录状态，如果没有登录，会提示需先登录。

上传代码需要的信息包括项目根目录、版本号、以及可选的版本备注。

`-u, --upload <version@project_root>`: 上传代码，`version` 指定版本号，`project_root` 指定项目根路径。

`--upload-desc <desc>`: 上传代码时的备注。

示例：

```sh
# 上传路径 /Users/username/demo 下的项目，指定版本号为 1.0.0，版本备注为 initial release
wxdevtools -u 1.0.0@/Users/username/demo --upload-desc 'initial release'
```

### 5. 支持自动化测试

`-t, --test <project_root>`: 提交自动化测试，project_root 指定项目根路径。

示例：

```sh
# 提交测试路径 /Users/username/demo 下的项目
wxdevtools -t /Users/username/demo
```

### 6. 退出微信开发者工具

`-q, --quit`: 退出所有微信开发者工具

示例：

```sh
wxdevtools --quit
```

## 最新命令详情

参见开微信发者工具 [命令行](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/cli.html)
