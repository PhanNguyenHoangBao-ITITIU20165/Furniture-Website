import styled from '@emotion/styled';
import { Button } from 'antd';

export const ButtonWithIcon = styled(Button)({
    width: '40%',
    height: '40px',
    display: 'flex',
    margin: '0 10px 0 10px',
    alignItems: 'center',
    fontSize: '16px',
});

export const CustomButtonFooter = styled(Button)({
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    borderBottom: '1px solid',
    fontWeight: 700,
});

export const CustomNavbarButton = styled(Button)({
    border: '0',
    background: 'transparent',
   ' &:hover': {
        background: 'transparent',
    }
});
