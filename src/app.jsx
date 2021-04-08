import 'rsuite/lib/styles/index.less';
import 'jsoneditor-react/es/editor.min.css';
import './app.css';

import ace from 'brace';
import 'brace/mode/json';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { JsonEditor } from 'jsoneditor-react';
import {
    Grid, Row, Col,
    SelectPicker, Form, FormGroup, ControlLabel,
    IconButton, Panel, Nav, Button, Loader, Message, Icon
} from 'rsuite';
import { useLiveQuery } from 'dexie-react-hooks';

import ServerModal from '#/views/server-modal';
import SettingView from '#/views/setting';
import CollectionView from '#/views/collection';
import HistoryView from '#/views/history';
import RootContext from '#/db';

function Geliver() {
    const root = useContext(RootContext);
    const [serverModal, setServerModal] = useState(false);
    const [requestRef, responseRef] = [useRef(), useRef()];
    const [tab, setTab] = useState('history');
    const [theme, setTheme] = useState(root.storage.getTheme());
    const [appTheme, setAppTheme] = useState(root.storage.getAppTheme());
    const [serverId, setServerId] = useState();
    const [serverSearch, setServerSearch] = useState('');
    const [endpoint, setEndpoint] = useState();
    const [endpointSearch, setEndpointSearch] = useState();
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(undefined);
    const [current, setCurrent] = useState('normal');
    let themeEl = null;

    const servers = useLiveQuery(
        () => root.db.listServers(serverSearch),
        [serverModal, serverSearch]
    );
    const endpoints = useLiveQuery(
        () => root.db.listEndpoints(serverId, endpointSearch),
        [serverId, endpointSearch, reload]
    );

    useEffect(() => {
        responseRef.current.jsonEditor.aceEditor.setOptions({ readOnly: true });

        root.view.request = requestRef.current;
        root.view.response = responseRef.current;
    }, []);

    useEffect(() => {
        if (endpoint && current === "normal") {
            root.view.setRequestJSON(endpoints.find(x => x.endpoint === endpoint).request);
            root.view.setResponseJSON({});
        }
    }, [endpoint]);

    useEffect(() => {
        if (theme) {
            import(`./assets/themes/${theme}.js`).then(() => {
                root.view.setRequestTheme(theme);
                root.view.setResponseTheme(theme);
                root.storage.setTheme(theme);
            });
        }
    }, [theme]);

    useEffect(() => {
        if (themeEl) {
            themeEl.parentNode.removeChild(themeEl);
        }

        themeEl = document.createElement('link');
        themeEl.rel = 'stylesheet';
        themeEl.href = `./${appTheme}.css`;
        themeEl.dataset.theme = appTheme;
        document.head.appendChild(themeEl);
        root.storage.setAppTheme(appTheme);
    }, [appTheme]);

    const onSendRequest = async () => {
        if (!serverId || !endpoint) {
            return;
        }
        setLoader(true);
        setError(undefined);
        try {
            const json = root.view.getRequestJSON();
            const connection = await root.db.getConnectionById(serverId);
            const response = await root.api.sendRequest(connection, endpoint, json);
            const isError = typeof response === 'string';
            await root.db.createHistory(serverId, endpoint, json, response, isError);
            root.view.setResponseJSON(response);
            root.view.historyController.refresh();
        } catch (err) {
            setError(err);
        } finally {
            setLoader(false);
        }
    }

    const views = {
        setting: (
            <SettingView
                theme={theme}
                setTheme={setTheme}
                appTheme={appTheme}
                setAppTheme={setAppTheme}
            />
        ),
        preset: (
            <CollectionView
                setCurrent={setCurrent}
                setServerId={setServerId}
                setEndpoint={setEndpoint}
            />
        ),
        history: (
            <HistoryView
                setCurrent={setCurrent}
                setServerId={setServerId}
                setEndpoint={setEndpoint}
            />
        ),
    };

    return (
        <div>
            <ServerModal selectedServerId={serverId} open={serverModal} onClose={() => setServerModal(false)} />
            <Panel style={{ marginLeft: 40, marginRight: 40 }}>
                <Nav appearance="tabs" activeKey={tab} onSelect={setTab}>
                    <Nav.Item eventKey="history" icon={<Icon icon="history" />}>
                        History
                    </Nav.Item>
                    <Nav.Item eventKey="preset" icon={<Icon icon="list" />}>
                        Collection
                    </Nav.Item>
                    <Nav.Item eventKey="setting" icon={<Icon icon="setting" />}>
                        Setting
                    </Nav.Item>
                </Nav>
                <Panel>{views[tab]}</Panel>
            </Panel>

            <Grid fluid={true} style={{ marginTop: 'calc(3vh)', marginBottom: 'calc(3vh)', marginLeft: '20px', marginRight: '20px', height: 'calc(94vh)' }}>
                <Row style={{ height: '100%' }}>
                    <Col style={{ height: '100%' }} xs={10} xsPush={1}>
                        <Row style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                            <Form fluid={true}>
                                <FormGroup>
                                    <ControlLabel>Server</ControlLabel>
                                    <div style={{ display: 'flex' }}>
                                        <SelectPicker
                                            style={{ flex: 1 }}
                                            block={true}
                                            placeholder="Please select server ..."
                                            value={serverId}
                                            onChange={setServerId}
                                            onSearch={setServerSearch}
                                            data={servers?.map(({ name, id }) => ({
                                                label: name,
                                                value: id,
                                            }))}
                                        />
                                        <IconButton
                                            appearances="primary"
                                            style={{ marginLeft: 10 }}
                                            icon={<Icon icon={serverId ? "edit2" : "plus"} />}
                                            onClick={() => setServerModal(true)}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Endpoint</ControlLabel>
                                    <div style={{ display: 'flex' }}>
                                        <SelectPicker
                                            style={{ flex: 1 }}
                                            block={true}
                                            placeholder="Please select endpoint ..."
                                            value={endpoint}
                                            onChange={(value) => {
                                                setCurrent('normal');
                                                setEndpoint(value);
                                            }}
                                            onSearch={setEndpointSearch}
                                            data={endpoints?.map(({ endpoint }) => ({
                                                label: endpoint,
                                                value: endpoint,
                                            }))}
                                        />
                                        <IconButton
                                            appearance="primary"
                                            style={{ marginLeft: 10 }}
                                            icon={<Icon icon="reload" />}
                                            onClick={async () => {
                                                if (serverId) {
                                                    setError(undefined);
                                                    try {
                                                        const connection = await root.db.getConnectionById(serverId);
                                                        const endpoints = await root.api.reloadServerEndpoints(connection);
                                                        await root.db.modifyServerEndpointsById(serverId, endpoints);
                                                        setReload(!reload);
                                                    } catch (err) {
                                                        setError(err);
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </FormGroup>
                            </Form>
                            <JsonEditor
                                htmlElementProps={{ style: { flex: 1, marginBottom: 20 } }}
                                ref={requestRef}
                                mode="code"
                                ace={ace}
                                value={{}}
                            />
                            {
                                loader ? <Loader style={{ textAlign: 'center' }} content="Sending Request ..." /> : (
                                    <Button style={{ width: '100%' }} appearance="primary" onClick={onSendRequest}>
                                        <Icon icon="send" /> Send Request
                                    </Button>
                                )
                            }
                        </Row>
                    </Col>
                    <Col xs={10} xsPush={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {
                            error && (
                                <Message style={{ marginBottom: 20 }} type="error" showIcon={true} description={error.message} />
                            )
                        }
                        <JsonEditor
                            htmlElementProps={{ style: { flex: 1 } }}
                            ref={responseRef}
                            mode="code"
                            ace={ace}
                            value={{}}
                        />
                    </Col>
                </Row>
            </Grid>

        </div>
    )
}

export default Geliver;