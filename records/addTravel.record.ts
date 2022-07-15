import { FieldPacket } from "mysql2";
import { TravelEntity, NewTravelEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/error";
import { v4 as uuid } from 'uuid';


type TravelRecordResults = [TravelEntity[], FieldPacket[]];



export class TravelRecord implements TravelEntity {
    public id: string;
    public name: string;
    public imgUrl: string;
    public description: string;

    constructor(obj: NewTravelEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('Nazwa kraju nie może być pusta, ani przekraczać 50 znaków.');
        }
        if (obj.description.length > 1000) {
            throw new ValidationError('Treść opisu nie może przekraczać 1000 znaków.');
        }
        // @TODO: Check if URL is valid!
        if (!obj.imgUrl || obj.imgUrl.length > 100) {
            throw new ValidationError('Link do zdjęcia nie może być pusty, ani przekraczać 100 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.imgUrl = obj.imgUrl;
    }

    static async getOne(id: string): Promise<TravelRecord | null> {
        const [results] = await pool.execute("Select * from `travels` where id = :id", {
            id,
        }) as TravelRecordResults;

        return results.length === 0 ? null : new TravelRecord(results[0]);
    }

    static async getAll(): Promise<TravelRecord[] | null> {
        const [results] = await pool.execute("Select * from `travels`") as TravelRecordResults;

        return results.map(result => new TravelRecord(result))
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted.')
        }

        await pool.execute('INSERT INTO `travels` VALUES(:id, :name, :description, :imgUrl)', this);
    }

} 