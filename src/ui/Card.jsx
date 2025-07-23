import React from 'react'
import clsx from 'clsx'

export default function Card({ title, icon, value, color }) {
    const gradients = {
        blue: 'from-blue-300 to-blue-500',
        red: 'from-red-300 to-red-500',
        green: 'from-green-300 to-green-500',
        yellow: 'from-yellow-300 to-yellow-500',
    }

    const gradient = gradients[color] || gradients.blue

    const backgroundIcons = [
        { top: '5%', left: '10%', rotate: 'rotate-12', size: 32 },
        { top: '20%', left: '70%', rotate: '-rotate-6', size: 28 },
        { top: '50%', left: '20%', rotate: 'rotate-45', size: 36 },
        { top: '65%', left: '80%', rotate: '-rotate-45', size: 24 },
        { top: '80%', left: '40%', rotate: 'rotate-3', size: 30 },
        { top: '35%', left: '50%', rotate: '-rotate-12', size: 26 },
    ]

    return (
        <div
            className={clsx(
                'relative overflow-hidden rounded-2xl p-2 shadow-lg text-white',
                `bg-gradient-to-br ${gradient}`
            )}
        >
            {/* Background Icons */}
            {backgroundIcons.map((pos, i) => (
                <div
                    key={i}
                    className={clsx(
                        'absolute text-white opacity-10',
                        pos.rotate
                    )}
                    style={{
                        top: pos.top,
                        left: pos.left,
                        fontSize: `${pos.size}px`,
                    }}
                >
                    {icon}
                </div>
            ))}

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col justify-between p-3 text-white font-semibold">
                <div className="mb-5">{icon}</div>
                <div className="flex flex-row justify-between gap-4 items-end">
                    <h1 className='text-md'>{title}</h1>
                    <h1 className='text-3xl'>{value}</h1>
                </div>
            </div>
        </div>
    )
}
