import { useEffect, useMemo, useState } from "react";

export function usePagination(querier, dependencies = []) {
    const [loader, setLoader] = useState(true);
    const [end, setEnd] = useState(false);
    const [cursor, setCursor] = useState();
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (!end && loader) {
            (async function () {
                const [data, nextCursor] = await querier(cursor);
                if (cursor) {
                    setResult([...result, ...data]);
                } else {
                    setResult([...data]);
                }

                setCursor(nextCursor);
                if (!nextCursor) {
                    setEnd(true);
                }
                setLoader(false);
            })()
        }
    }, [loader]);

    const controller = {
        refresh: () => {
            setCursor(undefined);
            setEnd(false);
            setLoader(true);
        },
        loadMore: () => setLoader(true),
    }

    return [controller, result];
}