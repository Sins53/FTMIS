import React from 'react';
import { Box, FlexBox, Image, Text } from '../../../../../components/core';
// import userImage from '@/assets/image/user.jpg';
import styled from 'styled-components';
import { blue, gray, green } from '@/theme/colors';
import { UnassignedUserData } from '@/core/Protected/RoleManagement/Roles/schema';
import { getTextByLanguage } from '@/i18n/i18n';
// import Layout from '../../../../../components/layout';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import DataUnavailable from '@/components/DataUnavailable/DataUnavailable';
import EmptyStateImage from '@/assets/image/empty-state.png';
import { Dropdown } from 'reactstrap';
import { DropdownItem, DropdownMenu, DropdownToggle } from '@/components/utils';
import Layout from '@/components/layout';

const StyledDropdownWrapper = styled(Dropdown)`
  position: relative;
`;

const Designation = styled(Text)`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  color: ${gray[700]};
  &:before {
    content: ' ';
    display: block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${blue[600]};
  }
`;

const StyledOptionWrapper = styled(DropdownMenu)`
  width: 100%;
  height: 50vh;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.2s;
  margin-top: 5px;
`;

const SelectInputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedText = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  color: #000;
`;

interface Props {
  userData: UnassignedUserData[];
  selectedUser: string[];
  setSelectedUser: (option: string[]) => void;
  showOptions: boolean;
  setShowOptions: (showOption: boolean) => void;
  toggleShowOptions: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const AssignUserDropdown = (props: Props) => {
  const {
    selectedUser,
    setSelectedUser,
    userData,
    showOptions,
    setShowOptions,
    toggleShowOptions,
    searchText,
    setSearchText
  } = props;

  const handleOptionClick = (id: string) => {
    if (selectedUser.includes(id)) {
      const filteredId = selectedUser.filter((userId) => userId !== id);
      setSelectedUser(filteredId);
    } else {
      const newIds = [...selectedUser, id];
      setSelectedUser(newIds);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showOptions) {
      setShowOptions(true);
    }
    setSearchText(e.currentTarget.value);
  };

  return (
    <StyledDropdownWrapper isOpen={showOptions} toggle={toggleShowOptions}>
      <DropdownToggle className="w-100 bg-white border-0 p-0">
        <SelectInputGroup>
          <input
            className="form-control w-100"
            value={searchText}
            onChange={handleInputChange}
            onClick={toggleShowOptions}
            placeholder="Assign User"
          />
          <SelectedText>
            {selectedUser.length > 0 && `${selectedUser.length} Selected`}
          </SelectedText>
        </SelectInputGroup>
      </DropdownToggle>
      <StyledOptionWrapper>
        <Layout.Absolute scrollable className="position-abolute">
          {userData.length > 0 ? (
            userData.map((user: UnassignedUserData) => (
              <DropdownItem key={user.id} toggle={false} className="p-2">
                <div onClick={() => handleOptionClick(`${user.id}`)}>
                  <FlexBox direction="row" justify="space-between" align="center">
                    <FlexBox direction="row">
                      {/* <Image
                        src={userImage}
                        width={'42'}
                        height={'42'}
                        variant="cover"
                        className="rounded-circle"
                      /> */}
                      <Box className="px-3">
                        <h6 className="text-gray-32 fw-bold">{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</h6>
                        <FlexBox>
                          <p className="text-gray-32">{user?.employee_id}</p>
                          <Designation className="text-gray-32">
                            {getTextByLanguage(
                              user?.designation.name_en,
                              user?.designation.name_np
                            )}
                          </Designation>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Box className="mr-3">
                      {selectedUser.includes(`${user.id}`) && (
                        <BsFillCheckCircleFill size={20} color={green[50]} />
                      )}
                    </Box>
                  </FlexBox>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DataUnavailable
              title="No User Found"
              icon={<Image src={EmptyStateImage} alt="No User Found" />}
            />
          )}
        </Layout.Absolute>
      </StyledOptionWrapper>
    </StyledDropdownWrapper>
  );
};

export default AssignUserDropdown;
