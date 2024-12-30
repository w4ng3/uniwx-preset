import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { type Reactive, type Ref, ref } from 'vue'
/**
 * 下拉刷新，上拉加载
 * @list 响应列表
 * @url 请求url
 * @query 额外body传参
 * @startPage 起始页 默认 1
 */
export default <T extends IPage>(list: Ref<any[]>, url: string, query: Reactive<T>, startPage: number = 1) => {
  const { page: pageNum, limit } = toRefs(query)
  // 加载状态
  // 可以在列表底部添加组件 <wd-loadmore :state="loadState" /> 显示状态
  const loadState = ref<'loading' | 'finished' | 'error' | undefined>(undefined)

  const onLoadList = (pn: number = startPage) => {
    loadState.value = 'loading'
    if (pn === startPage) {
      pageNum.value = startPage // 防止在onShow里调用onLoadList时pageNum()未回归初始化的问题
    }
    http({ url, data: query })
      .then((res: any) => {
        const respList = res.data.list
        list.value = pn === startPage ? respList : list.value.concat(respList)
        uni.hideLoading()
        uni.stopPullDownRefresh()
        if (respList.length < limit.value) {
          // console.log('没有更多了 :>> ')
          loadState.value = 'finished'
        }
        else {
          loadState.value = undefined
        }
      })
      .catch(() => (loadState.value = 'error'))
  }

  onPullDownRefresh(() => {
    // console.log('usepull2refresh-- 监听用户下拉动作')
    onLoadList()
  })

  onReachBottom(() => {
    // console.log('页面滚动到底部', new Date(), loadState.value)
    if (loadState.value === 'finished') {
      //
    }
    else { onLoadList(++pageNum.value) }
  })

  return { onLoadList, onPullDownRefresh, onReachBottom, pageNum, loadState }
}
