import { useRef, useState } from "react"

import Child, { ChildPublicType } from "./Child"

const Parent = () => {

    const [childValue, setChildValue] = useState("")
    const childRef = useRef<ChildPublicType>()

    const updateChildValue = () => {
        const child = childRef?.current?.getChildValue() || ""
        setChildValue(child)
    }

    return (
        <div>
            <h1>
                Parent's Child: {childValue}
            </h1>

            <Child
                ref={childRef}
                initialValue={childValue} />

            <button onClick={() => updateChildValue()}>
                Update Child value in Parent.
            </button>
        </div>
    )
}

export default Parent
