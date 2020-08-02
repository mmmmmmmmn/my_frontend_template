enum ResetActionType {
    Reset = 'reset',
    ResetAll = 'resetAll',
}

type NestedPureObject = {
    [key: string]: string | NestedPureObject;
};

type GetResetActionTypeDeeply<T> = {
    [K in keyof T]: K extends ResetActionType
        ? T[K]
        : T[K] extends NestedPureObject
        ? GetResetActionTypeDeeply<T[K]>
        : never;
}[keyof T];

const actionTypes = {
    update: 'update parent',
    [ResetActionType.Reset]: 'reset parent',
    child1: {
        update: 'update child1',
        reset: 'reset child1',
        grandChild1: {
            update: 'update grandChild1',
            [ResetActionType.Reset]: 'reset grandChild1',
        },
    },
    child2: {
        update: 'update child2',
        reset: 'reset child2',
        grandChild2: {
            update: 'update grandChild2',
        },
    },
    child3: {
        update: 'update child3',
        grandChild3: {
            update: 'update grandChild3',
            [ResetActionType.Reset]: 'reset grandChild3',
        },
    },
    child4: {
        update: 'update child4',
        grandChild4: {
            update: 'update grandChild4',
        },
    },
    [ResetActionType.ResetAll]: 'reset all',
} as const;

type ResetAction = {
    type: GetResetActionTypeDeeply<typeof actionTypes>;
    payload?: any;
};

const resetAction: ResetAction = {
    type: 'reset grandChild3',
    payload: {
        i: 1234,
    },
};

export default resetAction;
