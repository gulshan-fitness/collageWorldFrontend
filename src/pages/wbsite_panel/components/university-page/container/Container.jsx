import React from 'react';

const Container = ({fluid , children , extraClass}) => {
    return (
        <div className={` ${fluid === true ? "w-full" : "container"} ${extraClass ?? ""} px-3 mx-auto `} >
            {children}
        </div>
    );
};

export default Container;
