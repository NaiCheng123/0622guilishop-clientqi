//这个文件才是正儿八经模拟接口的文件
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

//通过Mock.mock去模拟接口

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})




