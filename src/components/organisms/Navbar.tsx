import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  OfficeBuildingIcon,
  UserIcon,
  UsersIcon,
  ClipboardListIcon,
  DocumentAddIcon,
  FolderOpenIcon,
  CakeIcon,
} from '@heroicons/react/outline';
import { useAuth0 } from '@auth0/auth0-react';
import { FocusOutlineButton } from '../atoms/Button';
import { Sheet } from '../molecules/Sheet';
import { Theme } from '../atoms/theme';
import { ModalWithTwoButtons } from '../molecules/Modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo';

const NavWrapper = styled.div`
  background: ${({ theme }) => theme.colors.neutrals_500};
  box-shadow: ${({ theme }) => theme.shadows.dropshadow_m};
  padding: 1rem;
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FlexStartContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const LinkWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const LinkSpacing = styled.div`
  margin-right: 2.5rem;
`;
const DisplayFlex = styled.div`
  display: flex;
`;
const RelativeWrapper = styled.div`
  position: relative;
`;
const AbsoluteWrapper = styled.div`
  position: absolute;
  right: 0;
  margin-top: 4px;
  z-index: 99;
`;

const adminLinks = [
  {
    icon: ClipboardListIcon,
    text: 'requests',
    path: '/admin/requests',
  },
  {
    icon: OfficeBuildingIcon,
    text: 'law firms',
    path: '/admin/law-firms',
  },
  {
    icon: UserIcon,
    text: 'patients',
    path: '/admin/patients',
  },
];

const clientLinks = (firmId) => {
  return [
    {
      icon: ClipboardListIcon,
      text: 'Requests',
      path: `/client/${firmId}/requests`,
    },
    {
      icon: UsersIcon,
      text: 'Users',
      path: `/client/${firmId}/users`,
    },
  ];
};

export const NavBar = () => {
  let dropOptions = [
    {
      text: 'Cerrar sesión',
      action: () => {
        setIsOpen(true);
        setOpenDrop(false);
      },
    },
  ];
  const [openDrop, setOpenDrop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { logout: auth0Logout } = useAuth0();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = () => {
    auth0Logout({ returnTo: window.location.origin });
  };

  // const adminOptions = [
  //   {
  //     text: "admins",
  //     action: () => {
  //       navigate("/admin/settings");
  //       setOpenDrop(false);
  //     },
  //   },
  //   {
  //     text: "logout",
  //     action: () => {
  //       setIsOpen(true);
  //       setOpenDrop(false);
  //     },
  //   },
  // ];

  // const clientOptions = [
  //   {
  //     text: "Feedback/Questions",
  //     action: () => {
  //       window.open("https://raynacorp.com/contact-us/");
  //       setOpenDrop(false);
  //     },
  //   },
  //   {
  //     text: "logout",
  //     action: () => {
  //       setIsOpen(true);
  //       setOpenDrop(false);
  //     },
  //   },
  // ];

  const navList = [
    {
      text: 'Dashboard',
      path: '/',
      icon: ClipboardListIcon,
    },
    {
      text: 'Alimentos',
      path: '/alimentos',
      icon: FolderOpenIcon,
    },
    {
      text: 'Informes médicos',
      path: '/informes-medicos',
      icon: DocumentAddIcon,
    },
    {
      text: 'Planes de comidas',
      path: '/planes-de-comidas',
      icon: CakeIcon,
    },
  ];

  return (
    <>
      {isOpen && (
        <ModalWithTwoButtons
          title="Cerrar sesión"
          content={`Estás seguro que quieres cerrar sesión?`}
          button1Text="Sí, cerrar sesión"
          button2Text="Cancelar"
          onClick1={() => {
            setIsOpen(false);
            logout();
          }}
          onClick2={() => setIsOpen(false)}
        />
      )}
      <NavWrapper>
        <Nav>
          <FlexStartContentContainer>
            <Link to="/">
              <Logo width={40} height={40} />
            </Link>
            <div style={{ marginRight: '2rem' }} />
            <DisplayFlex>
              {navList?.map((nav, index) => {
                return (
                  <LinkWrapper to={nav.path} key={index}>
                    {({ isActive = false }) => {
                      return (
                        <DisplayFlex>
                          <FocusOutlineButton
                            icon={true}
                            color={Theme.colors.primaries_000}
                            hoverColor={Theme.colors.primaries_neg100}
                            noText={true}
                            img={<nav.icon width={18} />}
                            buttonText={nav.text}
                            key={index}
                            active={isActive}
                          />
                          <LinkSpacing />
                        </DisplayFlex>
                      );
                    }}
                  </LinkWrapper>
                );
              })}
            </DisplayFlex>
          </FlexStartContentContainer>
          <RelativeWrapper>
            <div
              onClick={() => setOpenDrop(!openDrop)}
              onBlur={(e) => {
                if (!e.relatedTarget?.id?.includes(`option_`))
                  setOpenDrop(false);
              }}
              tabIndex={0}
              className="focus:outline-none h-8 w-8 rounded-full bg-white cursor-pointer justify-center items-center flex border border-primary-100 hover:border-primary-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            {openDrop ? (
              <AbsoluteWrapper>
                <Sheet options={dropOptions} />
              </AbsoluteWrapper>
            ) : null}
          </RelativeWrapper>
        </Nav>
      </NavWrapper>
    </>
  );
};
