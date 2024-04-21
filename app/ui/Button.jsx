'use client';

import { useFormStatus } from 'react-dom'

const Button = ({ label, color }) => {

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className={`bg-${color}-600  text-gray-800  mx-2 border-2 py-2 px-4 rounded-md hover:bg-${color}-600 focus:outline-none focus:ring focus:border-${color}-300`}
        >
            {pending ? 'submitting': label}
        </button>
    )
}

export default Button
