'use client';

import { useFormStatus } from 'react-dom';

const Button = ({ label, color, bgColor }) => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            style={{ backgroundColor: `${bgColor}`, color: `${color}` }}
            className={`w-full mx-2 border-2 py-2 px-3 rounded-lg`}
        >
            {pending ? 'Submitting' : label}
        </button>
    );
};

export default Button;