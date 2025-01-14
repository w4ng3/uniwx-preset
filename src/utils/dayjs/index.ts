import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { isNumber } from '../'

// 导入本地化语言
import 'dayjs/locale/zh-cn'

// 扩展插件
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

// 设置语言和时区
dayjs.locale('zh-cn')
dayjs.tz.setDefault('Asia/Shanghai')

export type dayJsDate = string | number | Date

/** 判断时间戳是否毫秒 */
export function isMillisecondTimestamp(value: dayJsDate) {
  if (typeof value !== 'number' || value.toString().length !== 13) { return false }

  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

/** 转换为 dayjs 接收参数 */
export function convertToDayjsParam(value: dayJsDate) {
  if (!isMillisecondTimestamp(value) && isNumber(value)) { return value * 1000 }
  return value
}

/** 格式化时间 */
export function formatTime(date?: dayJsDate, format = 'YYYY-MM-DD') {
  if (!date) { return '' }
  return dayjs(convertToDayjsParam(date)).format(format)
}

export function stringFormat(date: string, format: string) {
  return dayjs(date, format)
}

export function formatCalendar(date: dayJsDate) {
  return formatTime(date, 'MM-DD')
}

/** 将时间戳格式化成完整的时间字符串 */
export function formatFullTime(date?: dayJsDate) {
  return formatTime(date, 'YYYY年MM月DD日 HH:mm:ss')
}

/** 计算日期差值 */
export function diffDate(start: dayJsDate, end: dayJsDate, unit: dayjs.OpUnitType = 'day') {
  return dayjs(convertToDayjsParam(start)).diff(dayjs(convertToDayjsParam(end)), unit)
}

/** 获取今天和明天的日期 */
export function getTodayAndTomorrow(template = 'YYYY-MM-DD') {
  const today = dayjs().format(template)
  const tomorrow = dayjs().add(1, 'day').format(template)
  return { today, tomorrow }
}
