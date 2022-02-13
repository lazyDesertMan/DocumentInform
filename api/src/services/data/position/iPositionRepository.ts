import { Position, Replace } from "../../../models/position";

interface IPositionRepository {
    getUserPosition(userID : number) : Position;
    getUserReplaces(userID : number) : Replace[];
    setPosition(userID : number, posID : number) : void;
    findByID(posID : number) : Position;
    add(position : Position) : void;
    free() : Position[];
}

export default IPositionRepository;
