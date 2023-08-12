import { Dropdown, Flowbite } from 'flowbite-react';
import { HiLogout, HiViewGrid } from 'react-icons/hi';
import { useSelector } from 'react-redux';

export default function DropdownItemsWithIcon({ handleFunctionLogout }) {
    const fullname = useSelector((state) => state.users.fullname);
    const email = useSelector((state) => state.users.email);

    return (
        <>
            {
                fullname ?
                    (
                        <>
                            <Flowbite>
                                <Dropdown label={email} arrowIcon={false} color={"dark"} className='w-[200px] p-2 shadow-xl border-2 rounded-lg border-neutral-200' placement='bottom-end' trigger='hover'>
                                    <Dropdown.Header>
                                        <span className="block text-lg font-bold">
                                            {fullname}
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item icon={HiViewGrid}>
                                        Dashboard
                                    </Dropdown.Item>
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


