import * as crypto from 'crypto';

class hashedValue {
    public readonly value : string;
    public readonly salt : string;

    public constructor (val : string, slt : string) {
        this.value = val;
        this.salt = slt;
    }

    public toString() : string {
        return this.value + this.salt;
    }
}

class passwordManager {

    protected static readonly Key : string = 'secreting';

    protected static makeHash(str : string, salt : string) {
        const hashGenerator = crypto.createHmac('sha256', passwordManager.Key);
        return hashGenerator.update(str + salt).digest('hex');
    }

    public static hash(str : string) : hashedValue {
        const salt = crypto.randomBytes(16).toString('hex');
        return new hashedValue(passwordManager.makeHash(str, salt), salt);
    }

    public static isEqual(val : string, salt : string, etalon : string) {
        const hash = passwordManager.makeHash(val, salt);
        return hash === etalon;
    }
}

export default passwordManager;

export {
    hashedValue
}
