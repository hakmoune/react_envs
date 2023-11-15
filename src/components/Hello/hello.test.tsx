import { render, screen } from "@testing-library/react";
import { Hello } from "./hello";

it("should render Hello Word !", () => {
    render(<Hello />);

    const div = screen.getByText("Hello World !") // grab element from the screen of the render <Hello />
    expect(div.textContent).toBe("Hello World !")
});