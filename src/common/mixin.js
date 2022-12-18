//混入,对象里面有很多相同的代码用混入
import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop";


//scroll重计算刷新
export const itemListenerMiXin ={
  data(){
      return{
         itemImgListener:null
      }
  },
  mounted(){
      let newRefresh = debounce(this.$refs.scroll.refresh,100)
      this.itemImgListener = () =>{
          newRefresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)
      // console.log(789)
  }
}

export const backTopMixin = {
  components:{
      BackTop
  },
  data(){
      return{
          isShowBackTop: false,
      }
  },
  methods:{
      backClick() {
          this.$refs.scroll.scrollTo(0, 0,300)
        },
  }
}