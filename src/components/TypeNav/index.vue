<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveDivOut" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <!-- <h2>嘿嘿</h2> -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ item_on: currentIndex === index }"
                @mouseenter="moveIn(index)"
              >
                <h3>
                  <!-- 第一种  使用声明式导航，会导致最终使用的组件标签很多，代表组件对象就很多，内存占用很大，效率不高 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      categoryName: c1.categoryName,
                      category1Id: c1.categoryId,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link> -->
                  <!-- 把声明式导航改为编程式导航，可以缓解效率不高的问题，但是编程式导航每个a标签都要添加事件，代表最终定义的回调函数
                  又很多，占用内存仍然很大，效率改善不大 -->
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        categoryName: c1.categoryName,
                        category1Id: c1.categoryId,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->
                  <!-- 事件委派就可以把回调函数所占内存降到最低，效率更高 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            categoryName: c2.categoryName,
                            category2Id: c2.categoryId,
                          },
                        }"
                      >
                        {{ c2.categoryName }}</router-link> -->
                        <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: c2.categoryName,
                              category2Id: c2.categoryId,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              categoryName: c3.categoryName,
                              category3Id: c3.categoryId,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link> -->

                          <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                categoryName: c3.categoryName,
                                category3Id: c3.categoryId,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash' 造成体积过大
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      currentIndex: -1, //对比和移入的那个index是否一样
      isShow: true, //控制三级分类 在search页初始化隐藏  在home页初始化显示
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
    // this.getCategoryList(); 
    //原本请求三级分类的数据在这发请求，但是不好，首页和search页都用到这个组件
    // 切换的时候会发两次请求
  },
  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },

    // moveIn(index){
    //   this.currentIndex = index
    //   console.log(index)
    // },

    // moveIn:function(index){
    //   this.currentIndex = index
    //   console.log(index)
    // }

    moveIn: throttle(
      function (index) {
        this.currentIndex = index;
        console.log(index);
      },
      50,
      { trailing: false }
    ),

    moveDivOut() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },

    toSearch(event) {
      // 这个函数是上面事件委派后的回调函数
      // 这个函数可以被div中所有的元素 点击后触发
      // 1我们得去判断点击的是不是我们要委派的a标签
      // 2我们点击的a标签有三种，分别带的参数是不同的，参数我们得区别开来

      let target = event.target;

      let data = target.dataset;
      // console.log(data)
      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        //categoryname 存在代表点的就是a标签
        let location = {
          name: "search",
        };
        
        let query = {
          categoryName: categoryname,
        };

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        location.query = query;


        if(this.$route.params){
          location.params = this.$route.params
        }

        if(this.$route.path !== '/home'){
          this.$router.replace(location); //从search跳转search用replace不保留历史记录
        }else{
          this.$router.push(location);  //从home跳转search用push保留历史记录
        }
        
      }
    },
  },
  computed: {
    //拿state和getters是在计算属性当中去获取
    //拿actions和mutations是在methods当中去获取

    // ...mapState(['categoryList'])
    //之前我们所说的，名称一样，就可以使用数组映射  是针对直接在总的store里面的state当中的数据
    // 总的state{
    //    categoryList:[]    可以使用数组
    // }

    // 总的state{
    //    home{
    //      categoryList:[]    不可以使用数组
    //    }
    // }

    // 只能使用对象形式
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      // background: #fafafa;
      background: skyblue;
      z-index: 999;


      &.sort-enter{
        opacity: 0;
        height: 0;
      }

      &.sort-enter-active{
        transition: all .5s;
      }

      &.sort-enter-to{
        opacity:1;
        height:461px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 615px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
