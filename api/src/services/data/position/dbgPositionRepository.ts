import { Position, Replace } from "../../../models/position";
import IPositionRepository from "./iPositionRepository";

class UserPositionData {
    userID : number;
    position : Position;

    public init(userID : number, position : Position) : UserPositionData {
        this.userID = userID;
        this.position = position;
        return this;
    }
}

class ReplaceData {
    positionID : number;
    userID : number;

    public init(positionID : number, userID : number) : ReplaceData {
        this.positionID = positionID;
        this.userID = userID;
        return this;
    }
}

class DbgPositionRepository implements IPositionRepository {
    private static positions : UserPositionData[] = [
        new UserPositionData().init(1, new Position().init(1, "Разнорабочий")),
        new UserPositionData().init(2, new Position().init(2, "Руководитель")),
        new UserPositionData().init(3, new Position().init(3, "Высокопоставленный"))
    ]
    private static id : number = DbgPositionRepository.positions.length + 1;

    private static replaces : ReplaceData[] = [
        new ReplaceData().init(2, 1)
    ]

    getUserPosition(userID: number): Position {
        for (let idx = 0; idx < DbgPositionRepository.positions.length; idx++)
            if (DbgPositionRepository.positions[idx].userID === userID)
                return DbgPositionRepository.positions[idx].position;
        return null;
    }

    getUserReplaces(userID: number): Replace[] {
        const replaces : Replace[] = [];
        for (let idx = 0; idx < DbgPositionRepository.replaces.length; idx++)
            if (DbgPositionRepository.replaces[idx].userID === userID) {
                const pos = this.findByID(DbgPositionRepository.replaces[idx].positionID);
                const startDate = new Date();
                const endDate = new Date();
                startDate.setTime(endDate.getTime() - 100);
                endDate.setTime(endDate.getTime() + 100);
                const curReplace = new Replace().init(pos, startDate, endDate);
                replaces.push(curReplace);
            }
        return replaces;
    }

    setPosition(userID: number, posID: number): void {
        for (let idx = 0; idx < DbgPositionRepository.positions.length; idx++)
            if (DbgPositionRepository.positions[idx].position.id === posID) {
                DbgPositionRepository.positions[idx].userID = userID;
                return;
            }
    }

    findByID(posID: number): Position {
        for (let idx = 0; idx < DbgPositionRepository.positions.length; idx++)
            if (DbgPositionRepository.positions[idx].position.id === posID)
                return DbgPositionRepository.positions[idx].position;
        return null;
    }

    add(position: Position): void {
        position.id = DbgPositionRepository.id++;
        DbgPositionRepository.positions.push(new UserPositionData().init(0, position));
    }

    free() : Position[] {
        const list : Position[] = [];
        for (let idx = 0; idx < DbgPositionRepository.positions.length; idx++)
            if (DbgPositionRepository.positions[idx].userID === 0)
                list.push(DbgPositionRepository.positions[idx].position);
        return list;
    }
}

export default DbgPositionRepository;
