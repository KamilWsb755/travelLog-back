export interface NewTravelEntity extends Omit<TravelEntity, 'id'> {
    id?: string;
}
export interface TravelEntity {
    id: string;
    name: string;
    imgUrl: string;
    description: string;
}
export interface NewCommentEntity extends Omit<CommentEntity, 'id'> {
    id?: string;
}
export interface CommentEntity {
    id: string;
    comment: string;
    travelId: string;
    name: string;
}

export interface CommentListEntity {
    comment: string;
    name: string;
    travelId?: string,
}