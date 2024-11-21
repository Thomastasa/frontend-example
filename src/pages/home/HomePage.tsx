import { Col, Container, Row } from "react-bootstrap"
import SharedStyles from "../../styles/shared.module.css"
import EasterEggHint from "./components/EasterEggHint"


const HomePage = () => {
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
                        <div className="mt-5">
                            <EasterEggHint />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage
