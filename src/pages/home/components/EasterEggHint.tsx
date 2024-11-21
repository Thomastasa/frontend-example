import { useAuth } from "../../../components/auth/AuthProvider"

const EasterEggHint = () => {
    const { user } = useAuth()

    if (user?.foundEasterEgg === true) {
        return (
            <div>
                You found the easter egg! NICE!
            </div>
        )
    }
    return (
        <div>
            To find the easter egg, sign out and see if any other passwords work.
            <br />
            Maybe you'll find a <i>nice</i> one that'll do the trick.
        </div>
    )

}

export default EasterEggHint
