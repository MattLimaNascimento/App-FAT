import React from 'react';
const FormGeneric = ({ID, act, children, onsubmit }) => {
    return ( 
        <form id={ID} onSubmit={onsubmit} action={act}>
            {children}
        </form>
    );
}
export default FormGeneric;