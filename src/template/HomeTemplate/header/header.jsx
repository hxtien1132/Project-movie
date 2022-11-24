import React, { Fragment } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN, USER_LOGIN } from '../../../constant/common';

import { Select } from 'antd';

//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';


const { Option } = Select;

export default function Header() {
    const navigate = useNavigate();
    const { userLogin } = useSelector(state => state.QuanLiNguoiDungReducer);

    const { t, i18n } = useTranslation();


    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }


    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    navigate('/login')
                }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
                <button onClick={() => {
                    navigate('/register')
                }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">{t('register')}</button>

            </Fragment>
        }


        return <Fragment> <button onClick={() => {
            navigate('/profile')
        }} className="self-center px-8 py-3 rounded">Hello ! {userLogin.taiKhoan}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                navigate('/');
                window.location.reload();
            }} className="text-yellow-500 mr-5">Đăng xuất</button>
        </Fragment>
    }
    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-opacity-40 bg-black text-white fixed w-full z-10" >
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo" srcset="" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/" className="flex items-center px-4 -mb-1 border-b-2 border-transparent 
                        text-violet-400 border-violet-400 text-white" activeClassName='border-b-1'>Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center px-4 -mb-1 
                        border-b-2 border-transparent text-white" activeClassName='border-b-1'>Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center px-4 -mb-1 
                        border-b-2 border-transparent text-white" activeClassName='border-b-1'>News</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex ml-5">
                    {renderLogin()}
                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>
                        <Option value="vi">Vi</Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
