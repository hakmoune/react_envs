export function randomBetween(min: number, max: number) {
    // Returns a random integer from 0 to * number
    return Math.floor(Math.random() * (max - min + 1) + min)
}