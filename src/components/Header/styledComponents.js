import styled from 'styled-components'

export const LightLogoutButton = styled.button`
  color: blue;
  padding: 7px;
  background-color: transparent;
  border: 1px solid #3b82f6;
  padding-top: 3px;
  padding-bottom: 3px;
`
export const DarkLogoutButton = styled.button`
  color: #ffffff;
  padding: 7px;
  background-color: transparent;
  border: 1px solid #ffffff;
  padding-top: 3px;
  padding-bottom: 3px;
`

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ${props => props.color};
`

export const CompanyImage = styled.img`
  height: 35px;
`
export const Profile = styled.img`
  height: 35px;
  border: 1px solid black;
`
export const Icon = styled.div`
  height: 35px;
  border: 1px solid black;
  background-size: cover;
  width: 35px;
`
