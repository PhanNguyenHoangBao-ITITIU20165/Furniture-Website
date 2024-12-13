import styled from '@emotion/styled';
import { Badge } from 'antd';

export const CustomNavbarBadge = styled(Badge)({
    border: 0,
    ' &:hover': {
        background: 'transparent',
    },
});
