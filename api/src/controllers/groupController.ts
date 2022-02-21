import { Position, Replace } from "../models/position";
import { UserData } from "../models/userData";
import DbgPositionRepository from "../services/data/position/dbgPositionRepository";
import IPositionRepository from "../services/data/position/iPositionRepository";

export default class GroupController {
    protected positionRepository : IPositionRepository;

    constructor() {
        this.positionRepository = new DbgPositionRepository();
    }

    public getPosition(userID : number) : Position {
        return this.positionRepository.getUserPosition(userID);
    }

    public getReplaces(userID : number) : Replace[] {
        return this.positionRepository.getUserReplaces(userID);
    }

    public addPosition(name : string) {
        this.positionRepository.add(new Position().init(0, name));
    }

    public setPosition(userID : number, posID : number) {
        this.positionRepository.setPosition(userID, posID);
    }

    public positionList(workers : UserData[]) {
        return (workers.map(worker => this.positionRepository.getUserPosition(worker.id)));
    }
}
