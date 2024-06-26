'use client'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

const Home = () => {
    const calcInput = [
        ['C', '%', '⌫', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['00', '0', '.', '=']
    ]

    const whiteColorGang = ['C', '%', '⌫']
    const orangeColorGang = ['/', '*', '-', '+', '=']
    let [number, setNumber] = useState('')

    const generateClassName = (val) => {
        if (orangeColorGang.includes(val)) {
            return 'p-2 bg-orange-400 m-1 w-16 h-16 rounded-xl'
        } else if (whiteColorGang.includes(val)) {
            return 'p-2 bg-white m-1 w-16 h-16 rounded-xl'
        } else {
            return 'p-2 bg-gray-400 m-1 w-16 h-16 rounded-xl'
        }
    }

    const handleClick = (val) => {
        if (val === 'C') {
            setNumber('')
        } else if (val === '⌫') {
            setNumber(number.slice(0, -1))
        } else if (val === '=') {
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            }
            try {
                setNumber(eval(number.replace(/%/g, '/100')).toString())
            } catch {
                setNumber('Error')
            }
        } else if (orangeColorGang.includes(val)) {
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            } else {
                setNumber(number + val)
            }
        } else if (val === '%') {
            if (number === '' || orangeColorGang.includes(number.slice(-1))) {
                return
            } else {
                setNumber(number + val)
            }
        } else {
            setNumber(number + val)
        }
    }

    return (
        <div className='m-auto p-4 flex flex-col items-center border border-black w-[360px] bg-black rounded-lg'>
            <div className='bg-white text-black p-4 text-right text-xl w-full rounded-t-lg'>
                {number || '0'}
            </div>
            {calcInput.map((item, rowIndex) => (
                <div className='flex w-full justify-center' key={rowIndex}>
                    {item.map((val) => (
                        <Button
                            className={generateClassName(val)}
                            onClick={() => handleClick(val)}
                            key={val}
                        >
                            {val}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Home
