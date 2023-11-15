import React, { useState } from "react";

export interface CounterProps {
    description: string,
    defaultCount: number
}

export const Counter: React.FC<CounterProps> = ({ description, defaultCount }) => {
    const [counter, setCounter] = useState<number>(defaultCount)
    const [incrementer, setIncrementer] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = parseInt(e.target.value, 10)
        setIncrementer(inputValue || 0)
    }

    const handleIncrementClick = (): void => {
        setLoading(true)
        setTimeout(() => {
            setCounter(counter + incrementer)
            setLoading(false)
        }, 1000);
    }

    const handleDecrementClick = (): void => {
        setLoading(true)
        setTimeout(() => {
            setCounter(counter - incrementer)
            setLoading(false)
        }, 1000);
    }

    return (
        <div>
            <h2>Desc: {description} - DC: {defaultCount}</h2>
            {loading && <span>Loading...</span>}
            <div>
                <input
                    type="text"
                    value={incrementer}
                    onChange={onHandleChange}
                    onFocus={(e) => e.target.select()}
                    placeholder="incrementor"
                />
            </div>
            <button aria-label="increment" onClick={handleIncrementClick}>+</button>
            <span>Current Count: {counter}</span>
            <button aria-label="decrement" onClick={handleDecrementClick}>-</button>
        </div >
    );
}

