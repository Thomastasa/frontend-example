import { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from "react"

type ChildProps = {
    initialValue: string
}

export type ChildPublicType = {
    resetForm: Function,
    getStyleOption: Function,
    getChildValue: Function
}


const Child = forwardRef(({ initialValue }: ChildProps, ref) => {

    const [childValue, setChildValue] = useState(initialValue || "")


    useImperativeHandle(ref, () => ({
        getChildValue
    }))

    const getChildValue = () => {
        return childValue
    }

    return (
        <div>
            <h2>
                Child:
            </h2>
            <input value={childValue} onChange={(event: ChangeEvent<HTMLInputElement>) => setChildValue(event?.target.value)} />
        </div>
    )
})

export default Child
