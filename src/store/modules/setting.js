export default {
  namespaced: true,
  state: {
    theme: 'dark',
    layout: 'side',
    systemName: 'Just Do It',
    copyright: '  2017-2019 XXX软件技术有限公司版权所有 ',
    footerLinks: [
      {link: 'https://www.baidu.com', name: '公司网站'},
      {link: 'https://www.baidu.com', name: '法律声明'},
      {link: 'https://www.baidu.com', name: '常见问题'}
    ],
    multipage: true
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultipage (state, multipage) {
      state.multipage = multipage
    }
  }
}
