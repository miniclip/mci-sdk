export declare class CallbackContainer {
    private callbacks;
    add(identifier: string, callback: Function): void;
    hasFor(identifier: string): boolean;
    get(identifier: string): Function[];
    remove(identifier: string, callback: Function): void;
}
export declare class Action {
    private listeners;
    emit(): void;
    listen(callback: () => void): void;
    unlisten(callback: () => void): void;
    clear(): void;
}
export declare class Action1<T> {
    private listeners;
    emit(arg0: T): void;
    listen(callback: (arg0: T) => void): void;
    unlisten(callback: Function): void;
    clear(): void;
}
export declare class Action2<T, K> {
    private listeners;
    emit(arg0: T, arg1: K): void;
    listen(callback: (arg0: T, arg1: K) => void): void;
    unlisten(callback: Function): void;
    clear(): void;
}
