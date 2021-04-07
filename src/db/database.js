import Dexie from 'dexie';
import { generateUNIQ } from '#/util/generator';
import moment from 'moment';

const db = new Dexie('geliver');
db.version(1).stores({
    histories: '&id, serverId, endpoint, createdAt',
    presets: '&id, serverId, endpoint, updatedAt',
    servers: '&id, name, connection, updatedAt',
});

const paginator = async (targetDB, cursor = "", orderKey = "id", reversed = true, limit = 10) => {

    if (cursor) {
        targetDB = targetDB.where(orderKey);
        if (reversed) {
            targetDB = targetDB.belowOrEqual(cursor)
        } else {
            targetDB = targetDB.aboveOrEqual(cursor)
        }
    }

    let query = targetDB.limit(limit + 1);
    if (reversed) {
        query = query.reverse();
    }

    const result = await query.sortBy(orderKey);
    let nextCursor = undefined;
    if (result.length === limit + 1) {
        nextCursor = result.pop()[orderKey];
    }
    return [result, nextCursor];
}

class DexieDB {

    checkServerIdValid = async (id) => {
        const value = await db.servers.where("id").equals(id).first();
        return value === undefined;
    }

    getServerById = async (serverId) => {
        return db.servers.where('id').equals(serverId).first();
    }

    getConnectionById = async (serverId) => {
        const server = await db.servers.where('id').equals(serverId).first();
        return server?.connection;
    }

    listConnection = async (search) => {
        let query = db.servers.limit(30);
        if (search) {
            query = query.where('name').startsWithAnyOf(search);
        }
        return query.toArray();
    }

    listEndpoints = async (serverId, search) => {
        if (!serverId) {
            return [];
        }
        const server = await db.servers.where('id').equals(serverId).first();
        let endpoints = server?.endpoints || [];
        if (search) {
            endpoints = endpoints.filter(x => x.endpoint.toLowerCase().includes(search.toLowerCase()));
        }
        return endpoints;
    }

    listPresets = async () => {
        return db.presets.toArray();
    }

    listHistories = async (cursor) => {
        const connectionMapper = {};
        const getConnectionByServerId = async (serverId) => {
            if (connectionMapper[serverId]) {
                return connectionMapper[serverId];
            }
            connectionMapper[serverId] = this.getConnectionById(serverId);
            return connectionMapper[serverId];
        };

        const [result, nextCursor] = await paginator(db.histories, cursor, 'createdAt', true, 8);
        const promiseArray = Promise.all(
            result.map(
                async (history) => Object.assign(history, {
                    connection: await getConnectionByServerId(history.serverId),
                })
            )
        );
        return [await promiseArray, nextCursor];
    }

    modifyServerEndpointsById = async (id, endpoints) => {
        await db.servers.where('id').equals(id).modify({
            name, connection, endpoints,
            updateAt: moment.utc().valueOf(),
        });
    }

    upsertServer = async (id, name, connection, endpoints) => {
        await db.servers.put({
            id, name, connection, endpoints,
            updateAt: moment.utc().valueOf(),
        });
    }

    createHistory = async (serverId, endpoint, request, response, isError) => {
        await db.histories.put({
            id: generateUNIQ(),
            serverId, endpoint, request, response, isError,
            createdAt: moment.utc().valueOf(),
        });
    }

    upsertPreset = async (id, name, serverId, endpoint, request) => {
        if (!id) {
            id = generateUNIQ();
        }
        await db.presets.put({
            id, name, serverId, endpoint, request,
            updateAt: moment.utc().valueOf(),
        });
    }

    deleteHistoryById = async (id) => {
        await db.histories.where('id').equals(id).delete();
    }

    clearHistory = async () => {
        await db.histories.clear();
    }

}

export default DexieDB;