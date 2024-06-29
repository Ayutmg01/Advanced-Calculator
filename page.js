'use client'  // This comment is part of the Next.js app structure

import { Button } from '@nextui-org/react'  // Importing Button component from @nextui-org/react
import React, { useState } from 'react'  // Importing React and useState hook

const Home = () => {
    // Array representing the layout of the calculator buttons
    const calcInput = [
        ['C', '%', '⌫', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['00', '0', '.', '=']
    ]

    // Arrays to define button color classes
    const whiteColorGang = ['C', '%', '⌫']
    const orangeColorGang = ['/', '*', '-', '+', '=']

    // useState hook to manage the calculator display number
    let [number, setNumber] = useState('')

    // Function to generate the appropriate class name based on the button value
    const generateClassName = (val) => {
        if (orangeColorGang.includes(val)) {
            return 'p-2 bg-orange-400 m-1 w-16 h-16 rounded-xl'
        } else if (whiteColorGang.includes(val)) {
            return 'p-2 bg-white m-1 w-16 h-16 rounded-xl'
        } else {
            return 'p-2 bg-gray-400 m-1 w-16 h-16 rounded-xl'
        }
    }

    // Function to handle button click events
    const handleClick = (val) => {
        if (val === 'C') {  // Clear button
            setNumber('')
        } else if (val === '⌫') {  // Backspace button
            setNumber(number.slice(0, -1))
        } else if (val === '=') {  // Equals button
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            }
            try {
                // Evaluate the expression and update the display number
                setNumber(eval(number.replace(/%/g, '/100')).toString())
            } catch {
                setNumber('Error')
            }
        } else if (orangeColorGang.includes(val)) {  // Operator buttons
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            } else {
                setNumber(number + val)
            }
        } else if (val === '%') {  // Percentage button
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            } else {
                setNumber(number + val)
            }
        } else {  // Number buttons
            setNumber(number + val)
        }
    }

    // JSX to render the calculator
    return (
        <div className='m-auto p-4 flex flex-col items-center border border-black w-[360px] bg-black rounded-lg'>
            <div className='bg-white text-black p-4 text-right text-xl w-full rounded-t-lg'>
                {number || '0'}  // Display the current number or 0 if empty
            </div>
            {calcInput.map((item, rowIndex) => (
                <div className='flex w-full justify-center' key={rowIndex}>
                    {item.map((val) => (
                        <Button
                            className={generateClassName(val)}  // Generate class name for styling
                            onClick={() => handleClick(val)}  // Set up click handler
                            key={val}
                        >
                            {val}  // Display button value
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Home  // Exporting the Home component
