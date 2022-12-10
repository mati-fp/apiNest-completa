export function add (x: number, y: number){
    return x + y;
}

describe('Inital Test', () => {
    test('add function', () => {   // it or test
        expect(add(1,2)).toEqual(3);
    });
});