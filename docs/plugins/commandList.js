const commandList = {
  version: {
    description: '查看此项目版本.',
    messages: [
      { message: 'V 1.0.0' }
    ]
  },
  contact: {
    description: '如何联络作者.',
    messages: [
    { message: '博客: http://vijar-wang.github.io' },
    { message: 'Email: 1419908068@qq.com' },
    { message: 'Github: https://github.com/vijar-wang' },
    { message: 'QQ: 1419908068' }
    ] },
  about: {
    description: '关于作者',
    messages: [
    { message: '我叫王文杰.我是一名程序员(暂且称为),你可以访问我的个人网站http://vijar-wang.github.io来了解更多关于我的信息。' }
    ]
  },
  readme: {
    description: '关于这个项目.',
    messages: [
    { message: '这是一个在Vue中模拟命令终端的组件' }
    ] },
  document: {
    description: '本项目文档.',
    messages: [
      { message: {
        text: '在建设中...',
        list: [
        { label: 'hello', type: 'error', message: 'this is a test message' }
        ]
      } }]
  }
}
