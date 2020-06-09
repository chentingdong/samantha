import { useRef, useLayoutEffect, useEffect } from "react"

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// custom Hook for getting previous props and state
// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
const usePrevPropsAndState = (props, state) => {
  const prevPropsAndStateRef = useRef({ props: null, state: null })
  const prevProps = prevPropsAndStateRef.current.props
  const prevState = prevPropsAndStateRef.current.state

  useEffect(() => {
    prevPropsAndStateRef.current = { props, state }
  })

  return { prevProps, prevState }
}

// https://blog.logrocket.com/how-is-getsnapshotbeforeupdate-implemented-with-hooks/

const useGetSnapshotBeforeUpdate = (cb, props, state) => {
  // get prev props and state
  const { prevProps, prevState } = usePrevPropsAndState(props, state)

  const snapshot = useRef(null)

  // getSnapshotBeforeUpdate - not run on mount + run on every update
  const componentJustMounted = useRef(true)
  useLayoutEffect(() => {
    if (!componentJustMounted.current) {
      snapshot.current = cb(prevProps, prevState)
    }
    componentJustMounted.current = false
  })

  // 👇 look here
  const useComponentDidUpdate = (_cb) => {
    useEffect(() => {
      if (!componentJustMounted.current) {
        _cb(prevProps, prevState, snapshot.current)
      }
    })
  }
  // 👇 look here
  return useComponentDidUpdate
}

export { usePrevious, usePrevPropsAndState, useGetSnapshotBeforeUpdate }
