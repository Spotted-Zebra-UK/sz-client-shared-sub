import './Navbar.scss';
import { CmAccessType, User, useUserQuery } from 'generated/graphql';
import { ReactComponent as Logo } from 'libs/sz-client-shared-sub/icons/SpottedZebraLogo.svg';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import IC_MENU from '../../../icons/hamburger_menu.svg';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ModuleSelector from './ModuleSelector/ModuleSelector';

interface INavbar {
  selectedModule?: CmAccessType;
  fromCompany?: boolean;
  changeSelectedModule?: (module: CmAccessType) => void;
}

const Navbar: FC<INavbar> = ({
  selectedModule,
  fromCompany,
  changeSelectedModule,
}) => {
  const history = useHistory();
  const [profileMenuShow, setProfileMenuShow] = useState<boolean>(false);
  const getUserResponse = useUserQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });
  const user = getUserResponse?.data?.User;
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('mousedown', e => handleClick(e));
    return () => {
      document.removeEventListener('mousedown', e => handleClick(e));
    };

    //eslint-disable-next-line
  }, [profileMenuShow]);
  const handleClick = (e: MouseEvent) => {
    if (componentRef && componentRef.current) {
      const ref = componentRef.current;
      if (profileMenuShow && ref && !ref.contains(e.target as HTMLElement)) {
        setProfileMenuShow(false);
      }
    }
  };
  if (user)
    return (
      <div className="container">
        <div className="sub-container">
          <Logo
            style={{
              width: '123px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={() => history.push('/')}
          />
          <div className="second-div">
            <ModuleSelector
              selectedModule={selectedModule}
              fromCompany={fromCompany}
              changeSelectedModule={changeSelectedModule}
            />
            <div
              className="profile-div"
              ref={componentRef}
              onClick={() => {
                setProfileMenuShow(!profileMenuShow);
              }}
            >
              <img src={IC_MENU} className="ham-icon" alt="ham-icon" />

              {profileMenuShow && <ProfileMenu user={user as User} />}
            </div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default Navbar;
