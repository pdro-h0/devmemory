import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    width: 20rem;
    height: 5rem;
    background-color: #1550ff;
    border-radius: 1rem;
    cursor: pointer;
    transition: all ease .3s;

    &:hover{
        opacity: .8;
    }
`

export const IconArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, .2);
    height: inherit;
    padding: 0 1.5rem;
`

export const Icon = styled.img`
    height: 2rem;
`

export const Label = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 2rem;
    color: white;
    height: white;
`