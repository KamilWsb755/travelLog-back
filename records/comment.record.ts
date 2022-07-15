import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/error";
import { v4 as uuid } from 'uuid';
import { CommentEntity, NewCommentEntity } from "../types";


type CommentRecordResult = [CommentEntity[], FieldPacket[]];



export class CommentRecord implements CommentEntity {
    public id: string;
    public comment: string;
    public travelId: string;
    public name: string;

    constructor(obj: NewCommentEntity) {
        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError('Imię nie może być puste, ani przekraczać 30 znaków.');
        }
        if (obj.comment.length > 300) {
            throw new ValidationError('Treść komentarza nie może przekraczać 300 znaków.');
        }

        this.id = obj.id;
        this.comment = obj.comment;
        this.travelId = obj.travelId;
        this.name = obj.name;
    }

    static async getOne(id: string): Promise<CommentEntity | null> {
        const [results] = await pool.execute("Select * from `travels` where id = :id", {
            id,
        }) as CommentRecordResult;

        return results.length === 0 ? null : new CommentRecord(results[0]);
    }

    static async getAll(): Promise<CommentEntity[] | null> {
        const [results] = await pool.execute("SELECT `comments`.`comment`, `comments`.name, `comments`.travelId FROM `comments` JOIN `travels` ON `comments`.`travelId` = `travels`.`id`;") as CommentRecordResult;

        return results.map(result => new CommentRecord(result))
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted.')
        }

        await pool.execute('INSERT INTO `comments` (`comment`, `name`, `travelId`) VALUES(:comment, :name, :travelId);', this);
    }

} 