import { Skill } from './skill';
import { Level } from './level';

export class Role {
    _id: string;
    skill: Skill;
    level: Level;
}