import { Dropdown, Flowbite } from 'flowbite-react';
import { HiLogout, HiViewGrid } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DropdownItemsWithIcon({ handleFunctionLogout, dismissMenu }) {
    const fullname = useSelector((state) => state.users.fullname);
    const email = useSelector((state) => state.users.email);

    return (
        <>
            {
                email ?
                    (
                        <>
                            <Flowbite>
                                <Dropdown label={email} arrowIcon={false} color={"dark"} className='min-w-[200px] p-2 shadow-xl rounded-lg border-neutral-200' placement='bottom-end' trigger='hover'>
                                    <Dropdown.Header>
                                        <span className="block text-lg font-bold">
                                            {fullname}
                                        </span>
                                        <span className="block text-l font-medium">
                                            {email}
                                        </span>
                                    </Dropdown.Header>
                                    <Link to={"/dashboard"} onClick={dismissMenu}>
                                        <Dropdown.Item icon={HiViewGrid}>
                                            Dashboard
                                        </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Item icon={HiLogout} onClick={handleFunctionLogout}>
                                        Sign out
                                    </Dropdown.Item>
                                </Dropdown>
                            </Flowbite>
                        </>

                    )
                    :
                    null
            }
        </>

    )

}


