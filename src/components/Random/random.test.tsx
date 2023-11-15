import { randomBetween } from "./random";

const randomSpy = jest.spyOn(Math, "random") // Spy the function Math.random()

describe("Random Between", () => {
    describe("when Math.random() returns = 0", () => {
        beforeEach(() => {
            randomSpy.mockClear().mockReturnValue(0) // Take control over spied function // Prenez le contrôle sur fonction espionnée
        })

        it("Called within min = 3, max = 5 returns 3", () => {
            expect(randomBetween(3, 5)).toBeGreaterThanOrEqual(3)
            expect(Math.random).toHaveBeenCalledTimes(1)
        })
    })
})


//Test using spyOn
// Example class with a method
/*class MathOperations {
    add(a: number, b: number) {
      return a + b;
    }
  }
  
  // Test case using jest.spyOn()
  test('spyOn example', () => {
    const mathInstance = new MathOperations();
    const spyAdd = jest.spyOn(mathInstance, 'add');
  
    // Call the method
    const result = mathInstance.add(2, 3);
  
    // Assertions
    expect(result).toBe(5);
    expect(spyAdd).toHaveBeenCalled();
    expect(spyAdd).toHaveBeenCalledWith(2, 3);
  
    // You can also reset the spy
    spyAdd.mockRestore();
  });*/

