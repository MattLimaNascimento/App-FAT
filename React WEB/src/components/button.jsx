import React from 'react';

const Button_p = ({Ref, action, nome, children, ID, Type, Style }) => {
    return (
        <button ref={Ref} style={Style} type={Type} id={ID} onClick={action} className={nome}>
            {children}
        </button>
    );
}

export default Button_p;