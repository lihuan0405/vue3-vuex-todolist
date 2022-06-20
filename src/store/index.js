import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    //   2.  定义所有的数据列表
    list: [],
    //  5.  将state与输入框的值与进行双向绑定
    inputVal: '',
    nextId: 3,
    viewStr: 'all'
  },
  mutations: {
    //  3.  state中的数据只能通过 mutation 更改
    initList (state, list) {
      state.list = list
    },
    //  6.  将文本框中用户输入的数值 val 赋值给state中的inputVal
    setinputVal (state, val) {
      state.inputVal = val
    },
    //  7.  用户添加待办事项
    addItem (state) {
      const item = {
        id: state.nextId,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.unshift(item)
      state.nextId++
      state.inputVal = ''
    },
    //   8.  删除待办事项
    removeItem (state, id) {
      //  8.1  根据 id 查找事项在list中的索引
      const i = state.list.findIndex(x => x.id === id)
      //  8.2  根据索引 删除 list 中数据
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    //  9.  在state中修改list复选框的状态
    doneChanged (state, pars) {
      const i = state.list.findIndex(x => x.id === pars.id)
      if (i !== -1) {
        state.list[i].done = pars.done
      }
    },
    //  11.  清楚所有完成事件
    clean (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    //  12.  修改 all/doing/done
    changeList (state, view) {
      state.viewStr = view
    }
  },
  actions: {
    //   1. 发起请求 拿到 list.json 中的数据
    getList (context) {
      axios.get('list.json').then(({ data }) => {
        // console.log(data)
        //   4.  通过 commit 来触发 mutation 中的函数
        context.commit('initList', data)
      })
    }
    //  huan 1. 发请求，修改 list.json 中的数据
    // modifyList (context) {
    //   axios.post('/public/list.json', {
    //     id: this.state.nextId,
    //     info: this.state.inputVal.trim(),
    //     done: false
    //   }).then(({ data }) => {
    //     // console.log(data)
    //     //   4.  通过 commit 来触发 mutation 中的函数
    //     context.commit('initList', data)
    //   })
    // }
  },
  //   getters 对数据进行包装 不改变原数组
  getters: {
    //  10. 统计待办事项的个数
    doingLen (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewStr === 'all') {
        return state.list
      } else if (state.viewStr === 'doing') {
        return state.list.filter(x => !x.done)
      } else {
        return state.list.filter(x => x.done)
      }
    }
  },
  modules: {
  }
})
