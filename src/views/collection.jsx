import RootContext from '#/db';
import { PaginateEmptyPromise, usePagination } from '#/util/hooks';
import React, { useContext, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Button, Dropdown, Icon, IconButton, Panel, Popover, Tag, Whisper } from 'rsuite';
import CollectionModal from '#/views/collection-modal';
import PresetModal from './preset-modal';

function Collection({setCurrent, setServerId, setEndpoint}) {
    const root = useContext(RootContext);
    const [editCollection, setEditCollection] = useState(undefined);
    const [selectedCollection, setSelectedCollection] = useState(undefined);
    const [editPreset, setEditPreset] = useState(undefined);
    const [selectedPreset, setSelectedPreset] = useState(undefined);
    const [collectionController, collections] = usePagination(root.db.listCollections);
    const [presetController, presets] = usePagination(
        (cursor) => {
            if (!selectedCollection) {
                return PaginateEmptyPromise;
            }
            return root.db.listPresetsByCollectionId(cursor, selectedCollection);
        },
    );

    let ScrollMenuComponent = ScrollMenu;
    if (import.meta.env.PROD) {
        ScrollMenuComponent = ScrollMenu.default
    }

    const onClickCollection = (collection) => {
        setSelectedCollection(collection.id);
        presetController.refresh();
    };

    const onClickPreset = (preset) => {
        setCurrent('preset');
        setServerId(preset.serverId);
        setEndpoint(preset.endpoint);
        root.view.setRequestJSON(preset.request);
    };

    const onCreateCollection = () => {
        setEditCollection(true);
        setSelectedCollection(undefined);
    }

    const onEditCollection = (collection) => {
        setEditCollection(true);
        setSelectedCollection(collection.id); 
    }

    const onCreatePreset = () => {
        setEditPreset(true);
        setSelectedPreset(undefined);
    }

    const onEditPreset = (preset) => {
        setEditPreset(true);
        setSelectedPreset(preset.id); 
    }

    return (
        <>
            <CollectionModal
                open={editCollection} 
                selectedCollectionId={selectedCollection} 
                onClose={() => {
                    setEditCollection(undefined);
                    collectionController.refresh();
                }}
            />
            <PresetModal
                open={editPreset}
                selectedPresetId={selectedPreset}
                onClose={() => {
                    setEditPreset(undefined);
                    presetController.refresh();
                }}
            />
            <Button appearance="primary" onClick={onCreateCollection}>
                <Icon icon="plus" /> Create Collection
            </Button>
            <Button style={{ marginLeft: 15 }} appearance="primary" onClick={onCreatePreset}>
                <Icon icon="plus" /> Create Preset
            </Button>
            <div style={{ marginTop: 10, marginBottom: 10}}>
            {
                collections?.length > 0 ?(
                    <ScrollMenuComponent
                        onLastItemVisible={collectionController?.loadMore}
                        alignCenter={false}
                        itemStyle={{ outline: 'none' }}
                        data={collections.map(collection => (
                            <div key={collection.id} style={{ margin: 10 }}>
                                <Panel
                                    style={selectedCollection === collection.id ? { border: '1px solid #4BB543'}: {}}
                                    className="folder-panel" 
                                    onClick={() => onClickCollection(collection)} 
                                    bordered={true}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems:'baseline' }}>
                                        {selectedCollection === collection.id ? <Icon icon="folder-open" /> : <Icon icon="folder" />}
                                        <p style={{ marginLeft: 10 }}>
                                            {collection.name} {collection.tag && <Tag style={{ marginLeft: 5 }}>{collection.tag}</Tag>}
                                        </p>
                                        <Whisper
                                            trigger="click"
                                            placement="bottom"
                                            speaker={(
                                                <Popover full={true}>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item 
                                                            icon={<Icon icon="edit" />}
                                                            onSelect={() => onEditCollection(collection)}
                                                        >
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            icon={<Icon icon="trash" />}
                                                            onSelect={() => {}}
                                                        >
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Popover>
                                            )}
                                        >
                                            <Icon style={{ marginLeft: 15}} icon="ellipsis-h" />
                                        </Whisper>
                                    </div>
                                </Panel>
                            </div>
                        ))}
                    />
                ): (
                    <h4 style={{ textAlign: 'center' }}>You don't have any collection yet. Create your first collection now!</h4>
                )
            }
            </div>
            {
                selectedCollection && (
                    presets?.length > 0 ?(
                        <ScrollMenuComponent
                            onLastItemVisible={presetController?.loadMore}
                            alignCenter={false}
                            itemStyle={{ outline: 'none' }}
                            data={presets.map(preset => (
                                <div key={preset.id} style={{ margin: 10 }}>
                                    <Panel className="preset-panel" onClick={() => onClickPreset(preset)} bordered={true}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <p style={{ marginLeft: 5 }}>
                                                ( {preset.endpoint} ) {preset.name}
                                            </p>
                                            <Whisper
                                                trigger="click"
                                                placement="bottom"
                                                speaker={(
                                                    <Popover full={true}>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item 
                                                                icon={<Icon icon="edit" />}
                                                                onSelect={() => onEditPreset(preset)}
                                                            >
                                                                Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                icon={<Icon icon="trash" />}
                                                                onSelect={() => {}}
                                                            >
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Popover>
                                                )}
                                            >
                                                <Icon style={{ marginLeft: 15}} icon="ellipsis-h" />
                                            </Whisper>
                                        </div>
                                    </Panel>
                                </div>
                            ))}
                        />
                    ): (
                        <h4 style={{ textAlign: 'center' }}>You don't have any preset yet. Create your first preset now!</h4>
                    )
                )
            }
        </>
    )
}

export default Collection;