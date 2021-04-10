import RootContext from '#/controller';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button, Modal, Input, Form, FormGroup,
    ControlLabel, FormControl, HelpBlock, Schema, Message, Loader
} from 'rsuite';

const { StringType } = Schema.Types

function ServerModal({ open, selectedServerId, onClose }) {
    const ref = useRef();
    const root = useContext(RootContext);
    const [loader, setLoader] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [error, setError] = useState(undefined);

    let serverIdValidator = StringType().
        isRequired('Server id is required');
    if (!selectedServerId) {
        serverIdValidator = serverIdValidator.addRule(async (value) => root.db.checkServerIdValid(value), 'Server id must be unique.');
    }

    const modelValidator = Schema.Model({
        serverId: serverIdValidator,
        name: StringType().
            isRequired('Name is required'),
        connection: StringType().
            isRequired('Connection is required').
            addRule((value) => value.includes('https://') || value.includes('http://'), 'Connection must have protocol HTTP or HTTPS.'),
    });

    useEffect(() => {
        setFormValue({});
        if (selectedServerId) {
            (async function () {
                const server = await root.db.getServerById(selectedServerId);
                setFormValue({
                    serverId: selectedServerId,
                    name: server.name,
                    connection: server.connection,
                    password: server.password,
                });
            })()
        }
    }, [selectedServerId]);

    const onSubmit = async () => {
        const { hasError } = await ref.current.checkAsync();
        if (!hasError) {
            setError(undefined);
            setLoader(true);
            try {
                const endpoints = await root.api.reloadServerEndpoints(formValue.connection, formValue.password);
                if (selectedServerId) {
                    await root.db.modifyServerById(formValue.serverId, formValue.name, formValue.connection, formValue.password, endpoints);
                } else {
                    await root.db.createServer(formValue.serverId, formValue.name, formValue.connection, formValue.password, endpoints);
                }
                onClose();
            } catch (err) {
                setError(err);
            } finally {
                setLoader(false);
            }
        }
    };

    return (
        <Modal show={open} size="xs" onClose={onClose}>
            <Modal.Header closeButton={false}>
                <Modal.Title>{selectedServerId ? "Edit" : "Add"} Server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    ref={ref}
                    fluid={true}
                    model={modelValidator}
                    formValue={formValue}
                    onChange={setFormValue}
                >
                    <FormGroup>
                        <ControlLabel>SID</ControlLabel>
                        <FormControl
                            name="serverId"
                            accepter={Input}
                            disabled={selectedServerId !== undefined}
                        />
                        <HelpBlock>
                            SID is an unique identifier for preset and history to determine server connection configuration.
                            It's will always make sure connection is up to date.
                        </HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            name="name"
                            accepter={Input}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Connection</ControlLabel>
                        <FormControl
                            name="connection"
                            accepter={Input}
                        />
                        <HelpBlock>
                            Example connection: http://localhost:1234
                        </HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            name="password"
                            type="password"
                        />
                        <HelpBlock>
                            Leave it empty if doesn't enabled password authentication
                        </HelpBlock>
                    </FormGroup>
                </Form>
                {
                    error && (
                        <Message type="error" showIcon={true} description={error.message} />
                    )
                }
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {
                    loader ? <Loader style={{ marginRight: 10 }} content={`${selectedServerId ? 'Updating' : 'Creating'} ...`} /> : (
                        <Button appearance="primary" onClick={onSubmit}>
                            Confirm
                        </Button>
                    )
                }
                <Button appearance="subtle" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModal;