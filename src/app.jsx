import 'rsuite/lib/styles/index.less';
import 'jsoneditor-react/es/editor.min.css';

import React, { useEffect, useRef, useState } from 'react';
import { JsonEditor } from 'jsoneditor-react';
import { SelectPicker } from 'rsuite';
import ace from 'brace';

import 'brace/mode/json';

function App() {
    const [requestRef, responseRef] = [useRef(), useRef()];
    const [theme, setTheme] = useState();
    const [request, setRequest] = useState({});

    useEffect(() => {

        if (theme) {
            import(`./assets/themes/${theme}.js`).then(() => {
                requestRef.current.jsonEditor.aceEditor.setTheme(`ace/theme/${theme}`);
                responseRef.current.jsonEditor.aceEditor.setTheme(`ace/theme/${theme}`);
            });
        }

    }, [theme]);

    return (
        <div>
            <p>Theme :</p>
            <SelectPicker
                value={theme}
                onChange={setTheme}
                data={[
                    {
                        "label": "ambiance",
                        "value": "ambiance",
                    },
                    {
                        "label": "chaos",
                        "value": "chaos",
                    },
                    {
                        "label": "chrome",
                        "value": "chrome",
                    },
                ]}
            />
            <JsonEditor
                ref={requestRef}
                mode="code"
                ace={ace}
                value={request}
                onChange={setRequest}
            />
            <JsonEditor
                ref={responseRef}
                mode="code"
                ace={ace}
                value={request}
                onChange={setRequest}
            />
        </div>
    )
}

export default App;