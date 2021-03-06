import { createContext } from 'react';
import API from './api';
import Storage from './storage';
import DexieDB from './database';
import ViewAPI from './view';

class RootAPI {

    constructor() {
        this.api = new API(this);
        this.view = new ViewAPI(this);
        this.storage = new Storage(this);
        this.db = new DexieDB(this);
    }
}

const RootInstance = new RootAPI();
const RootContext = createContext(RootInstance);
export { RootAPI, RootInstance };
export default RootContext;