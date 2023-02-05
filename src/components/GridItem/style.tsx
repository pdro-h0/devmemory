import styled from "styled-components";

type containerProps = {
  showBackground: boolean;
};

export const Container = styled.div<containerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  border-radius: 2rem;
  background-color: ${(props) => props.showBackground ? "#1550ff" : "#e2e3e3"};
  cursor: pointer;

  transition: all ease .3s;

&:hover{
    transform: scale(1.08);
}
`;

type IconProps={
    opacity?:number
}

export const Icon = styled.img<IconProps>`
    height: 4rem;
    width: 4rem;
    opacity: ${props => props.opacity ? props.opacity : 1};


`;
