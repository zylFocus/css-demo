import { useCallback, useEffect, useMemo, useState } from 'react'

function getElement<T extends HTMLElement>(element?: T | string | null, topElement?: T | string | null) {
  if (!element) {
    return null
  }
  if (typeof element === 'string') {
    if (typeof topElement === 'string') {
      return document.querySelector(`${topElement} ${element}`)
    }
    if (topElement) {
      return topElement.querySelector(element)
    }
    return document.querySelector(element)
  }
  return element
}

/**
 *
 * @param wrapperEle 要检测滚动的div
 * @param topElement 从某个容器下面开始选择目标容器
 * @returns
 */
export function useCheckVerticalOverflow<T extends HTMLElement>(
  wrapperEle?: T | string | null,
  topElement?: T | string | null,
) {
  const [overflowTop, setOverflowTop] = useState(false)
  const [overflowBottom, setOverflowBottom] = useState(false)

  const targetWrapper = useMemo(() => getElement<T>(wrapperEle, topElement), [wrapperEle, topElement])

  const checkVerticalOverflow = useCallback(() => {
    if (!targetWrapper) {
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = targetWrapper
    const targetInset = {
      top: 0,
      bottom: clientHeight,
    }
    const childInset = {
      top: -scrollTop,
      bottom: -scrollTop + scrollHeight,
    }

    if (targetInset.top > childInset.top) {
      setOverflowTop(true)
    } else {
      setOverflowTop(false)
    }

    if (targetInset.bottom < childInset.bottom) {
      setOverflowBottom(true)
    } else {
      setOverflowBottom(false)
    }
  }, [targetWrapper])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      checkVerticalOverflow()
    })
    if (targetWrapper) {
      observer.observe(targetWrapper)
      targetWrapper.addEventListener('scroll', checkVerticalOverflow)
    }
    return () => {
      observer.disconnect()
      targetWrapper?.removeEventListener('scroll', checkVerticalOverflow)
    }
  }, [checkVerticalOverflow, targetWrapper])

  return {
    overflow: {
      top: overflowTop,
      bottom: overflowBottom,
    },
    checkVerticalOverflow,
  }
}
