<template>
  <div class="container">
   <div class="header" >
     <input type="text" placeholder="请输入待办事项" :value="inputVal" @change="handleIptChg" />
     <el-button type="success" @click="addItemToDo">添加待办</el-button>
   </div>
    <hr>
    <ul class="willdo">
     <li v-for="item in infoList" :key="item.id"> <input type="checkbox" :checked="item.done" @change="(e) => {cbdoneChanged(e, item.id)}"><span>{{item.info}} </span><a href="javascript:;" @click="removeItemToDo(item.id)">❎</a> </li>
    </ul>
<div class="footer">
  <span>{{doingLen}}条待办事项</span>
  <el-button type="success" plain @click="changeListToDo('all')" >全部</el-button>
  <el-button type="success" plain @click="changeListToDo('doing')">未完成</el-button>
  <el-button type="success" plain @click="changeListToDo('done')">已完成</el-button>
  <a href="javascript::" @click="cleanToDo">清除已完成</a>
</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  //  1.  在 声明周期函数 created 进行数据请求
  created () {
    this.$store.dispatch('getList')
  },
  // updated () {
  //   this.$store.dispatch('modifyList')
  // },
  computed: {
    ...mapState(['inputVal', 'viewStr']),
    ...mapGetters(['doingLen', 'infoList'])
  },
  methods: {
    // 2.  拿到用户输入的值  e.target 会拿到事件对象
    handleIptChg (e) {
      // console.log(e.target.value)
      this.$store.commit('setinputVal', e.target.value)
    },
    //  3.  添加待办事项
    addItemToDo () {
      if (this.inputVal.trim().length === 0) return this.$message.warning('待办事项不能为空')
      //   3.1 为空则弹出警告框 $message,inputVal 是store中的值，通过mapState变成了一个计算属性

      //   3.2  不为空就添加一项
      this.$store.commit('addItem')
    },
    //   4.  根据Id删除事件
    removeItemToDo (id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
    },
    //   5.  复选框状态改变
    cbdoneChanged (e, id) {
      // console.log(e.target.checked, id)
      const pars = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('doneChanged', pars)
    },
    //  6.  清除所有完成事件
    cleanToDo () {
      this.$store.commit('clean')
    },
    //  7.  修改页面上展示的数据
    changeListToDo (viewStr) {
      // console.log(viewStr)
      this.$store.commit('changeList', viewStr)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0px;
  margin: 0px;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
.container {
  width: 100%;
  margin: 10px auto;
  background-color: skyblue;
  .header{
    height: 50px;
    background-color:  #b3e19d; // #e1f3d8;
     padding-left: 20px;
    input {
      height: 30px;
      width: 300px;
      margin: 10px 10px  10px 0px;
    }
  }
}

.willdo {
  background: #f0f9eb;
   padding-left: 20px;
  li {
    position: relative;
    border-bottom: 2px dashed #b3e19d;
    height: 30px;
    line-height: 30px;
    span{
    display: inline-block;
    width: 80%;
    width: auto;
    overflow: hidden;
     white-space: nowrap;
    text-overflow: ellipsis;
    }
    a{
      position: absolute;
      right: 10px;
    }
    input{
      margin-right: 5px;
      margin-top: 7px;
      width: 20px;
      height: 15px;
      vertical-align: top;
    }
  }
}

.footer {
  padding: 10px;
  background: #e1f3d8;
  button {
    margin: 0px;
    // border-radius:  0px;
  }
}
</style>
