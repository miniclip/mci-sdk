export interface IPostPayload {
    requestID: string;
    okConfirmation: boolean;
}
export interface IPostResponse<P extends IPostPayload = IPostPayload> {
    type: 'post';
    id: string;
    sender_id: string;
    payload: P;
}
export interface IPostRequest<P extends IPostPayload = IPostPayload> {
    type: 'post';
    id: string;
    recipient_id: string;
    payload: P;
}
