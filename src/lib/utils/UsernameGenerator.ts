import fs from 'fs';
import { Random } from '$lib/utils/Random';

export class UsernameGenerator {
    public static generate() {
        const text = fs.readFileSync('demo/usernames.txt', 'utf8');
        const usernames = text.toString().split('\n');
        const index = Random.numberBetween(0, usernames.length - 1);
        return usernames[index];
    }
}