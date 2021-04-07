import RootContext from '#/db';
import React, { useContext, useState } from 'react';
import {
    Button, Col, Grid,
    HelpBlock, Icon, Radio,
    RadioGroup, Row, SelectPicker,
    Modal, Alert
} from 'rsuite';

const themes = [
    "ambiance", "chaos", "chrome", "clouds", "clouds_midnight",
    "cobalt", "crimson_editor", "dawn", "dracula", "dreamweaver",
    "eclipse", "github", "gob", "gruvbox", "idle_fingers", "iplastic",
    "katzenmilch", "kr_theme", "kuroir", "merbivore", "merbivore_soft",
    "monokai", "mono_industrial", "pastel_on_dark", "solarized_dark",
    "solarized_light", "sqlserver", "terminal", "textmate", "tomorrow",
    "tomorrow_night", "tomorrow_night_blue", "tomorrow_night_bright",
    "tomorrow_night_eighties", "twilight", "vibrant_ink", "xcode"
];

function Setting({ theme, setTheme, appTheme, setAppTheme }) {
    const root = useContext(RootContext);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const onClose = () => {
        setDeleteConfirm(undefined);
    };

    return (
        <Grid fluid={true}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={2}>
                    <p>Editor Theme</p>
                </Col>
                <Col xs={6}>
                    <SelectPicker
                        block={true}
                        value={theme}
                        onChange={setTheme}
                        data={themes.map(x => ({
                            label: x,
                            value: x,
                        }))}
                    />
                </Col>
            </Row>

            <Row style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
                <Col xs={2}>
                    <p>App Theme</p>
                </Col>
                <Col xs={22}>
                    <RadioGroup
                        inline={true}
                        value={appTheme}
                        onChange={setAppTheme}
                    >
                        <Radio value="light">
                            ☀️ Light
                        </Radio>
                        <Radio value="dark">
                            🌙 Dark
                        </Radio>
                    </RadioGroup>
                    <HelpBlock>Sometimes may not working, refresh should take the changes.</HelpBlock>
                </Col>
            </Row>

            <Row style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
                <Col xs={2}>
                    <p>Actions</p>
                </Col>
                <Col xs={22}>
                    <Button appearance="primary" onClick={() => setDeleteConfirm(true)}>
                        <Icon icon="trash" /> Clear History
                    </Button>
                </Col>
            </Row>


            <Modal backdrop={true} show={deleteConfirm} onHide={onClose} size="xs">
                <Modal.Header closeButton={false}>
                    <Modal.Title>
                        <Icon
                            icon="remind"
                            style={{ color: '#ffb300', marginRight: 10 }}
                        />
                        Clear histories
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Histories once cleared will not be recover anymore.
                    Are you sure want to proceed?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        onClick={async () => {
                            Alert.info('Clearing histories ...');
                            try {
                                await root.db.clearHistory()
                                onClose();
                                Alert.success('Clear histories successfully');
                                root.view.historyController.refresh();
                            } catch (err) {
                                Alert.error("Error when clearing histories: ", err.message);
                            }
                        }}
                    >
                        Ok
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Grid>
    )
}

export default Setting;