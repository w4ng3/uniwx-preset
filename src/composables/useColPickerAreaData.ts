
import { useCascaderAreaData } from '@vant/area-data'
import type { ColPickerColumnChange } from 'wot-design-uni/components/wd-col-picker/types'
import { sleep } from '@/utils'


// 参考：https://wot-design-uni.cn/component/col-picker.html
export interface CascaderOption {
  text: string
  value: string
  children?: CascaderOption[]
}

interface ColPickerConfirmOption {
  value: (string | number)[]
  selectedItems: Record<string, any>[]
}

export type ColPickerConfirm = (option: ColPickerConfirmOption) => void

/**
 * 使用'@vant/area-data'作为数据源，构造ColPicker组件的数据
 */
export function useColPickerAreaData() {
  // '@vant/area-data' 数据源
  const cascaderAreaData: CascaderOption[] = useCascaderAreaData()

  // 根据code查找子节点，不传code则返回所有节点
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
    if (!code) {
      return data
    }
    for (const item of data) {
      if (item.value === code) {
        return item.children || null
      }
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }
    return null
  }

  const colPickerData = [cascaderAreaData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  })]

  const columnChange: ColPickerColumnChange = async ({ selectedItem, resolve, finish }) => {
    await sleep(0.2)

    const areaData = findChildrenByCode(cascaderAreaData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text,
          }
        }),
      )
    }
    else {
      finish()
    }
  }

  // 格式化方法
  const displayFormat = (selectedItems: Record<string, any>[]) => {
    return `${selectedItems[selectedItems.length - 2].label}-${selectedItems[selectedItems.length - 1].label}`
  }

  return { colPickerData, findChildrenByCode, columnChange, displayFormat }
}
