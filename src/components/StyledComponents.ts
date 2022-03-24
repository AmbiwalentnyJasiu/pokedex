import styled from "styled-components"

export const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const PokemonData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export const PokemonName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-transform: capitalize;
`;

export const PokemonTypes = styled.div`
  font-size: 1.5rem;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 2rem;
  border: 1px solid #888;
  width: fit-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  border: none;
  border-radius: 2px;
  color: #ffffff;
  font-size: 20px;
  background: #17679c;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #228bcc;
    text-decoration: none;
  }
`;

export const AppContainer = styled.div`
  padding-top: 10rem;
  padding-bottom: 3rem;
`;

export const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 1000;
  font-size: 3rem;
  color: white;
`;

export const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const LoadMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  background-color: #333333;
  height: 50px;
  cursor: pointer;
  color: white;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #222222;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  border-bottom: 1px solid black;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
