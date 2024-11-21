import { useState, ChangeEvent, KeyboardEvent } from "react"
import { Container, Row, Col, Image } from "react-bootstrap"

import SharedStyles from "../../styles/shared.module.css"
import SignInStyles from "../../styles/signIn.module.css"

import { useAuth } from "../../components/auth/AuthProvider"
import { isEventKeypressEnter } from "../../utils/ReactUtils"
import { IMAGE } from "../../utils/ResourceUtils"
import UserInfo from "../../components/auth/UserInfo"

const ANSWER = "STEIN"
const EASTER_EGG = "NICE"

const SignInPage = () => {
    const [password, setPassword] = useState("")
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [foundEasterEgg, setFoundEasterEgg] = useState(false)

    const { setSignedIn } = useAuth()

    const validateSignIn = () => {
        // validate easter egg
        const validEasterEgg = (typeof password === 'string' && password.trim().toUpperCase() === EASTER_EGG)
        setShowEasterEgg(validEasterEgg)
        if (validEasterEgg === true) {
            setPassword("")
            setFoundEasterEgg(true)
            return
        }
        // validate answer
        const validAnswer = (typeof password === 'string' && password.trim().toUpperCase() === ANSWER)
        setInvalidPassword(!validAnswer)
        if (validAnswer === true) {
            const userInfo: UserInfo = {
                userAgent: navigator.userAgent,
                foundEasterEgg: foundEasterEgg
            }
            setSignedIn(userInfo)
        }
    }

    const onInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (showEasterEgg === true) {
            setShowEasterEgg(false)
        }
        if (invalidPassword === true) {
            setInvalidPassword(false)
        }
        if (isEventKeypressEnter(event)) {
            validateSignIn()
        }
    }

    return (
        <div className={SharedStyles.page}>
            <Container>
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={{ span: 8, offset: 2 }}
                        xl={{ span: 6, offset: 3 }}>
                        <div className={SignInStyles.top_offset}>
                            <h3>
                                To sign in, answer:
                                <br />
                                <i>
                                    What is this developer's last name?
                                </i>
                            </h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={{ span: 8, offset: 2 }}
                        xl={{ span: 6, offset: 3 }}>
                        <div className="my-3">
                            <input
                                className={SharedStyles.terminal_input}
                                value={password}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event?.target.value)}
                                onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => onInputKeyUp(event)} />
                            <button
                                className={SharedStyles.terminal_button}
                                onClick={() => validateSignIn()}>
                                Sign In
                            </button>
                        </div>
                    </Col>
                </Row>
                {
                    invalidPassword === true ? (
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 8, offset: 2 }}
                                xl={{ span: 6, offset: 3 }}>
                                <Image
                                    className={SignInStyles.image}
                                    src={IMAGE.INVALID_SIGNIN} />
                            </Col>
                        </Row>
                    ) : null
                }
                {
                    showEasterEgg === true ? (
                        <Row>
                            <Col
                                xs={12}
                                sm={12}
                                md={{ span: 8, offset: 2 }}
                                lg={{ span: 8, offset: 2 }}
                                xl={{ span: 6, offset: 3 }}>
                                <div className="mt-3">
                                    <b>
                                        Easter Egg Found!
                                    </b>
                                    <br />
                                    Something tells me you must be NICE!
                                </div>
                            </Col>
                        </Row>
                    ) : null
                }
            </Container>
        </div>
    )
}

export default SignInPage
