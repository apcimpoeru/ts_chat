import { useEffect, useState } from 'react'
import HeaderJSON from '../../data/header.json'

const Header = () => {

    const [menuItemsHTML, setMenuItemsHTML] = useState(<></>);
    
    useEffect(() => {

        let menuItems = <></>;
        //loop through HeaderJSON.loggedIn and create a href for each item
        for (let i = 0; i < HeaderJSON.loggedIn.length; i++) {
            let element = <a href={HeaderJSON.loggedIn[i].url}>
                            {HeaderJSON.loggedIn[i].title}
                        </a>
            // append the element to the menuItems variable
            menuItems = <>{menuItems}{element}</>
        }
        setMenuItemsHTML(menuItems);

    }, []);

    return (

        <div className="h-[8vh] flex bg-blue-500 items-center justify-center p-[25px]">
            <div className='w-[1240px] flex justify-between items-center'>
                <div className='text-2xl'>
                    {HeaderJSON.logo}
                </div>
                <div className='text-xl gap-[20px] flex justify-end'>
                    {menuItemsHTML}
                </div>
            </div>
        </div>

    )
}

export default Header
