import styled from 'styled-components'
export const HeaderWrap = styled.div<{height: string}>`
    width: 100%;
    height: ${(props: any) => props.height};
    background-color: rgb(0, 21, 41);
    overflow: hidden;
`
