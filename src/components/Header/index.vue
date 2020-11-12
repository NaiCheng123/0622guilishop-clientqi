<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.users.userInfo.name">
            <a href="javascript:;">{{ $store.state.users.userInfo.name }}</a>
            -->
            <a href="###" class="register" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model="keyword"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },
  methods: {
    toSearch() {
      // 1、路由传参的写法   字符串拼接（+）   模板字符串     对象（name）
      // 2、路由传参参数有几种  params和query
      // this.$router.push('/search/' + this.keyword + '?keyword1=' + this.keyword.toUpperCase())
      // this.$router.push(`/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`)
      // this.$router.push({
      //   name: "search",
      //   query: { keyword1: this.keyword.toUpperCase() },
      //   params: { keyword: this.keyword },
      // }).catch(() => {});

      let location = {
        name: "search",
        // query: { keyword1: this.keyword.toUpperCase() },
        params: { keyword: this.keyword },
      };

      if (this.$route.query) {
        location.query = this.$route.query;
      }

      if (this.$route.path !== "/home") {
        this.$router.replace(location); //从search跳转search用replace不保留历史记录
      } else {
        this.$router.push(location); //从home跳转search用push保留历史记录
      }

      // 3、能不能不用name,用path和params参数配合去写
      // 答：不能
      // 不可以用path和params配置的组合,
      // 只能用name和params配置的组合
      // query配置可以与path或name进行组合使用
      // 最终使用name和参数去配合是万能方案
      // this.$router.push({path:'/search',query:{keyword1:this.keyword.toUpperCase()}) 错的  不能用path和params去组合传参

      // 4、params参数如何可传可不传
      // 在路由配置的时候，接收参数的哪个名称后添加?

      // 5、如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
      // 答： 空串不能传递params参数，会影响路径
      // 如果要传空串，就传一个undefined 代表什么都不传 (前提是路由params参数要可传可不传)

      // 一般我们在传递params参数都会加上      || undefined
      // this.$router.push({
      //   name: "search",
      //   query: { keyword1: this.keyword.toUpperCase() },
      //   params: { keyword: this.keyword || undefined},
      // });

      // 6、 props 为了简化 组件当中使用路由参数的写法
      // 可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
      // 实现: props: (route)=>({keyword:route.params.keyword, keyword1: route.query.keyword })
    },
    clearKeyword() {
      this.keyword = "";
    },
    async logout(){
      try{ 
        const result = await this.$store.dispatch('userLogout')
        if(result === 'ok'){
          alert('退出登录成功')
          this.$router.push('/')
        }else{
          alert('退出登录失败')
        }
      }catch(error){
      alert('退出登录失败')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
